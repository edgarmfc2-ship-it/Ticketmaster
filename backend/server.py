from fastapi import FastAPI, APIRouter, Depends, HTTPException, status, Request
from fastapi.responses import RedirectResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from typing import List, Optional
from datetime import datetime, timedelta

from models import (
    User, UserCreate, UserLogin, UserResponse, TokenResponse,
    Event, Order, OrderCreate, Ticket, PaymentLinkResponse
)
from auth import (
    get_password_hash, verify_password, create_access_token, get_current_user
)
from mercadopago_service import MercadoPagoService

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="Ticketmaster Clone API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize Mercado Pago Service
mp_service = MercadoPagoService()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ============== AUTH ENDPOINTS ==============

@api_router.post("/auth/register", response_model=TokenResponse)
async def register(user_data: UserCreate):
    # Check if user exists
    existing_user = await db.users.find_one({"email": user_data.email})
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Create user
    user = User(
        email=user_data.email,
        name=user_data.name,
        hashed_password=get_password_hash(user_data.password)
    )
    
    await db.users.insert_one(user.dict())
    
    # Create access token
    access_token = create_access_token(data={"sub": user.email, "user_id": user.id})
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(id=user.id, email=user.email, name=user.name, created_at=user.created_at)
    )

@api_router.post("/auth/login", response_model=TokenResponse)
async def login(credentials: UserLogin):
    user_doc = await db.users.find_one({"email": credentials.email})
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    user = User(**user_doc)
    if not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password"
        )
    
    access_token = create_access_token(data={"sub": user.email, "user_id": user.id})
    
    return TokenResponse(
        access_token=access_token,
        user=UserResponse(id=user.id, email=user.email, name=user.name, created_at=user.created_at)
    )

@api_router.get("/auth/me", response_model=UserResponse)
async def get_me(current_user: dict = Depends(get_current_user)):
    user_doc = await db.users.find_one({"email": current_user["sub"]})
    if not user_doc:
        raise HTTPException(status_code=404, detail="User not found")
    
    user = User(**user_doc)
    return UserResponse(id=user.id, email=user.email, name=user.name, created_at=user.created_at)


# ============== EVENT ENDPOINTS ==============

@api_router.get("/events", response_model=List[Event])
async def get_events(category: Optional[str] = None, location: Optional[str] = None):
    query = {}
    if category and category != "all":
        query["category"] = category
    if location and location != "Todas las ciudades":
        query["location"] = location
    
    events = await db.events.find(query).to_list(100)
    return [Event(**event) for event in events]

@api_router.get("/events/{event_id}", response_model=Event)
async def get_event(event_id: str):
    event = await db.events.find_one({"id": event_id})
    if not event:
        raise HTTPException(status_code=404, detail="Event not found")
    return Event(**event)

@api_router.get("/events/search/{query}")
async def search_events(query: str):
    events = await db.events.find({
        "$or": [
            {"name": {"$regex": query, "$options": "i"}},
            {"artist": {"$regex": query, "$options": "i"}},
            {"location": {"$regex": query, "$options": "i"}}
        ]
    }).to_list(50)
    return [Event(**event) for event in events]


# ============== ORDER & PAYMENT ENDPOINTS ==============

@api_router.post("/orders", response_model=PaymentLinkResponse)
async def create_order(order_data: OrderCreate, current_user: dict = Depends(get_current_user)):
    # Calculate total
    total_amount = sum(item.total for item in order_data.items)
    
    # Create order
    order = Order(
        user_id=current_user["user_id"],
        items=[item.dict() for item in order_data.items],
        buyer_name=order_data.buyer_name,
        buyer_email=order_data.buyer_email,
        buyer_phone=order_data.buyer_phone,
        buyer_id_number=order_data.buyer_id_number,
        total_amount=total_amount
    )
    
    # Save order to database
    await db.orders.insert_one(order.dict())
    
    # Create payment link with Mercado Pago
    mp_data = {
        "order_id": order.id,
        "items": [item.dict() for item in order_data.items],
        "buyer_name": order_data.buyer_name,
        "buyer_email": order_data.buyer_email,
        "buyer_phone": order_data.buyer_phone,
        "buyer_id_number": order_data.buyer_id_number
    }
    
    preference = mp_service.create_payment_preference(mp_data)
    
    if not preference:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to create payment link"
        )
    
    # Update order with payment info
    await db.orders.update_one(
        {"id": order.id},
        {"$set": {
            "payment_link": preference["init_point"],
            "mercadopago_preference_id": preference["preference_id"],
            "updated_at": datetime.utcnow()
        }}
    )
    
    return PaymentLinkResponse(
        order_id=order.id,
        payment_link=preference["init_point"],
        preference_id=preference["preference_id"],
        total_amount=total_amount,
        created_at=order.created_at
    )

@api_router.get("/orders", response_model=List[Order])
async def get_user_orders(current_user: dict = Depends(get_current_user)):
    orders = await db.orders.find({"user_id": current_user["user_id"]}).to_list(100)
    return [Order(**order) for order in orders]

@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str, current_user: dict = Depends(get_current_user)):
    order = await db.orders.find_one({"id": order_id, "user_id": current_user["user_id"]})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    return Order(**order)


# ============== WEBHOOK ENDPOINT ==============

@api_router.post("/webhooks/mercadopago")
async def mercadopago_webhook(request: Request):
    try:
        body = await request.json()
        logger.info(f"Received Mercado Pago webhook: {body}")
        
        # Handle payment notification
        if body.get("type") == "payment":
            payment_id = body.get("data", {}).get("id")
            
            if payment_id:
                payment_info = mp_service.get_payment_info(str(payment_id))
                
                if payment_info:
                    order_id = payment_info.get("external_reference")
                    payment_status = payment_info.get("status")
                    
                    # Update order status
                    await db.orders.update_one(
                        {"id": order_id},
                        {"$set": {
                            "payment_status": payment_status,
                            "payment_id": str(payment_id),
                            "updated_at": datetime.utcnow()
                        }}
                    )
                    
                    # If payment approved, create tickets
                    if payment_status == "approved":
                        order = await db.orders.find_one({"id": order_id})
                        if order:
                            for item in order["items"]:
                                ticket = Ticket(
                                    order_id=order_id,
                                    user_id=order["user_id"],
                                    event_id=item["event_id"],
                                    event_name=item["event_name"],
                                    ticket_type=item["ticket_type"],
                                    quantity=item["quantity"]
                                )
                                await db.tickets.insert_one(ticket.dict())
                            
                            logger.info(f"Tickets created for order {order_id}")
        
        return {"status": "received"}
    
    except Exception as e:
        logger.error(f"Error processing webhook: {str(e)}")
        return {"status": "error", "message": str(e)}


# ============== TICKET ENDPOINTS ==============

@api_router.get("/tickets", response_model=List[Ticket])
async def get_user_tickets(current_user: dict = Depends(get_current_user)):
    tickets = await db.tickets.find({"user_id": current_user["user_id"]}).to_list(100)
    return [Ticket(**ticket) for ticket in tickets]


# ============== PAYMENT REDIRECT PAGES ==============

@app.get("/payment/success")
async def payment_success(order_id: str):
    return RedirectResponse(url=f"http://localhost:3000/?payment=success&order_id={order_id}")

@app.get("/payment/failure")
async def payment_failure(order_id: str):
    return RedirectResponse(url=f"http://localhost:3000/?payment=failure&order_id={order_id}")

@app.get("/payment/pending")
async def payment_pending(order_id: str):
    return RedirectResponse(url=f"http://localhost:3000/?payment=pending&order_id={order_id}")


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()