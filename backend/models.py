from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List, Dict
from datetime import datetime
import uuid

# User Models
class UserBase(BaseModel):
    email: EmailStr
    name: str

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(UserBase):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    hashed_password: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}

class UserResponse(UserBase):
    id: str
    created_at: datetime

# Event Models
class Event(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    artist: str
    category: str
    venue: str
    location: str
    date: str
    time: str
    image: str
    description: str
    prices: Dict[str, float]
    available_tickets: Dict[str, int]
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}

# Order Models
class OrderItem(BaseModel):
    event_id: str
    event_name: str
    ticket_type: str
    quantity: int
    price: float
    total: float

class OrderCreate(BaseModel):
    items: List[OrderItem]
    buyer_name: str
    buyer_email: EmailStr
    buyer_phone: str
    buyer_id_number: str

class Order(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    user_id: str
    items: List[OrderItem]
    buyer_name: str
    buyer_email: EmailStr
    buyer_phone: str
    buyer_id_number: str
    total_amount: float
    payment_status: str = "pending"  # pending, approved, rejected
    payment_id: Optional[str] = None
    payment_link: Optional[str] = None
    mercadopago_preference_id: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow)
    updated_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}

# Ticket Models
class Ticket(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    order_id: str
    user_id: str
    event_id: str
    event_name: str
    ticket_type: str
    quantity: int
    qr_code: Optional[str] = None
    status: str = "active"  # active, used, cancelled
    created_at: datetime = Field(default_factory=datetime.utcnow)

    class Config:
        json_encoders = {datetime: lambda v: v.isoformat()}

# Payment Link Response
class PaymentLinkResponse(BaseModel):
    order_id: str
    payment_link: str
    preference_id: str
    total_amount: float
    created_at: datetime

# Token Response
class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse