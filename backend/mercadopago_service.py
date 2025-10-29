import mercadopago
import os
import logging
from typing import Optional, Dict, Any
import uuid

logger = logging.getLogger(__name__)

class MercadoPagoService:
    def __init__(self):
        access_token = os.getenv("MP_ACCESS_TOKEN")
        if not access_token:
            raise ValueError("MP_ACCESS_TOKEN not found in environment")
        self.sdk = mercadopago.SDK(access_token)
        self.base_url = os.getenv("BASE_URL", "http://localhost:8001")

    def create_payment_preference(self, order_data: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        """
        Create a payment preference in Mercado Pago and return payment link
        """
        try:
            external_reference = order_data.get("order_id")
            items = []
            
            for item in order_data.get("items", []):
                items.append({
                    "id": item["event_id"],
                    "title": f"{item['event_name']} - {item['ticket_type'].upper()}",
                    "description": f"Entrada {item['ticket_type']} para {item['event_name']}",
                    "category_id": "tickets",
                    "quantity": item["quantity"],
                    "unit_price": float(item["price"]),
                    "currency_id": "COP"
                })

            # Build payer data - only include fields if they have values
            payer_data = {
                "email": order_data.get("buyer_email")
            }
            
            if order_data.get("buyer_name"):
                payer_data["name"] = order_data.get("buyer_name")
            
            if order_data.get("buyer_phone"):
                payer_data["phone"] = {
                    "number": order_data.get("buyer_phone")
                }
            
            if order_data.get("buyer_id_number"):
                payer_data["identification"] = {
                    "type": "CC",
                    "number": order_data.get("buyer_id_number")
                }
            
            preference_data = {
                "items": items,
                "payer": payer_data,
                "back_urls": {
                    "success": f"{self.base_url}/payment/success?order_id={external_reference}",
                    "failure": f"{self.base_url}/payment/failure?order_id={external_reference}",
                    "pending": f"{self.base_url}/payment/pending?order_id={external_reference}"
                },
                "auto_return": "approved",
                "external_reference": external_reference,
                "notification_url": f"{self.base_url}/api/webhooks/mercadopago",
                "statement_descriptor": "TICKETMASTER"
            }

            logger.info(f"Creating Mercado Pago preference for order {external_reference}")
            result = self.sdk.preference().create(preference_data)

            if result["status"] == 201:
                response = result["response"]
                logger.info(f"Preference created successfully: {response.get('id')}")
                return {
                    "preference_id": response.get("id"),
                    "init_point": response.get("init_point"),
                    "sandbox_init_point": response.get("sandbox_init_point")
                }
            else:
                logger.error(f"Failed to create preference. Status: {result['status']}")
                return None

        except Exception as e:
            logger.error(f"Error creating Mercado Pago preference: {str(e)}")
            return None

    def get_payment_info(self, payment_id: str) -> Optional[Dict[str, Any]]:
        """
        Get payment information from Mercado Pago
        """
        try:
            result = self.sdk.payment().get(payment_id)
            
            if result["status"] == 200:
                payment = result["response"]
                return {
                    "payment_id": payment.get("id"),
                    "status": payment.get("status"),
                    "status_detail": payment.get("status_detail"),
                    "amount": payment.get("transaction_amount"),
                    "payer_email": payment.get("payer", {}).get("email"),
                    "external_reference": payment.get("external_reference"),
                    "date_created": payment.get("date_created")
                }
            else:
                logger.error(f"Failed to get payment info. Status: {result['status']}")
                return None

        except Exception as e:
            logger.error(f"Error getting payment info: {str(e)}")
            return None