# Ticketmaster Clone - Deployment Guide

## ✅ Deployment Readiness Status: READY

### Application Summary
- **Frontend**: React app with Tailwind CSS + shadcn/ui
- **Backend**: FastAPI + MongoDB
- **Payment**: Mercado Pago integration
- **Authentication**: JWT-based authentication

---

## Environment Variables Configuration

### Frontend (.env)
```env
REACT_APP_BACKEND_URL=https://your-app-name.emergent.host
```

### Backend (.env)
```env
MONGO_URL=mongodb://localhost:27017
DB_NAME=ticketmaster
JWT_SECRET=your-strong-secret-key-here-minimum-32-characters
MP_ACCESS_TOKEN=APP_USR-8649546348029777-102913-792c50add09928ff215932be419162d9-233060240
BASE_URL=https://your-app-name.emergent.host
FRONTEND_URL=https://your-app-name.emergent.host
CORS_ORIGINS=*
```

**⚠️ IMPORTANT:** 
- Replace `your-app-name` with your actual Emergent app name
- Generate a strong JWT_SECRET (minimum 32 characters) for production
- Update BASE_URL and FRONTEND_URL to your production domain

---

## Pre-Deployment Checklist

### ✅ Completed
- [x] All hardcoded URLs removed (using environment variables)
- [x] MongoDB integration configured
- [x] Mercado Pago Access Token integrated
- [x] JWT authentication implemented
- [x] CORS properly configured
- [x] Payment webhooks configured
- [x] Frontend-Backend API integration working
- [x] Event database seeded with 10+ events

### ⚠️ Before Production Deploy
- [ ] Generate strong JWT_SECRET (use: `openssl rand -hex 32`)
- [ ] Update FRONTEND_URL and BASE_URL to production domain
- [ ] Test Mercado Pago webhooks in production environment
- [ ] Verify MongoDB connection in production
- [ ] Test payment flow end-to-end

---

## Database Setup

The application requires MongoDB with the following collections:
- `events` - Event listings (already seeded)
- `users` - User accounts
- `orders` - Purchase orders
- `tickets` - Generated tickets

**Seeding Events:**
```bash
cd /app/backend
python seed_events.py
```

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Events
- `GET /api/events` - List all events (with optional filters)
- `GET /api/events/{event_id}` - Get event details
- `GET /api/events/search/{query}` - Search events

### Orders
- `POST /api/orders` - Create order and generate payment link
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{order_id}` - Get specific order

### Tickets
- `GET /api/tickets` - Get user's tickets

### Webhooks
- `POST /api/webhooks/mercadopago` - Mercado Pago payment notifications

---

## Mercado Pago Integration

### Payment Flow
1. User selects tickets and proceeds to checkout
2. Backend creates order in database
3. Backend calls Mercado Pago API to generate payment preference
4. User is redirected to Mercado Pago checkout page
5. After payment, Mercado Pago sends webhook notification
6. Backend processes webhook and issues tickets

### Webhook Configuration
The webhook URL for Mercado Pago is:
```
https://your-app-name.emergent.host/api/webhooks/mercadopago
```

**Note:** You need to configure this in your Mercado Pago dashboard under:
Applications → Your Application → Webhooks

---

## Testing Checklist

### Frontend Testing
- [ ] User registration works
- [ ] User login works
- [ ] Event listing displays correctly
- [ ] Event details page shows all information
- [ ] Add to cart functionality works
- [ ] Checkout form submits correctly

### Backend Testing
- [ ] Authentication endpoints return valid JWT tokens
- [ ] Events API returns all events from database
- [ ] Order creation generates Mercado Pago payment link
- [ ] Webhooks process payment notifications correctly

### Payment Testing
- [ ] Payment link redirects to Mercado Pago correctly
- [ ] Payment success redirects to frontend with order_id
- [ ] Tickets are generated after successful payment
- [ ] User can view their tickets after purchase

---

## Deployment Steps

1. **Deploy to Emergent:**
   - Ensure all environment variables are set correctly
   - Deploy using Emergent dashboard or CLI

2. **Verify Services:**
   ```bash
   # Check backend is running
   curl https://your-app-name.emergent.host/api/events
   
   # Check frontend is accessible
   curl https://your-app-name.emergent.host
   ```

3. **Seed Database:**
   ```bash
   cd /app/backend
   python seed_events.py
   ```

4. **Configure Mercado Pago Webhook:**
   - Go to Mercado Pago Developer Portal
   - Add webhook URL: `https://your-app-name.emergent.host/api/webhooks/mercadopago`

5. **Test End-to-End:**
   - Register new user
   - Select event and add tickets to cart
   - Complete checkout process
   - Verify payment link generation
   - Test payment in Mercado Pago (use test cards in sandbox mode)

---

## Security Notes

1. **JWT Secret**: Use a strong, randomly generated secret for production
2. **CORS**: Currently set to allow all origins (*). Consider restricting in production if needed
3. **API Keys**: Mercado Pago Access Token is stored in environment variables (secure)
4. **HTTPS**: Emergent automatically provides HTTPS for deployed apps

---

## Monitoring & Logs

### Backend Logs
```bash
sudo supervisorctl tail -f backend
```

### Frontend Logs
```bash
sudo supervisorctl tail -f frontend
```

### Check Service Status
```bash
sudo supervisorctl status
```

---

## Support & Troubleshooting

### Common Issues

**Issue**: Payment link generation fails
**Solution**: Verify MP_ACCESS_TOKEN is correct and has proper permissions

**Issue**: Webhook not receiving notifications
**Solution**: Check webhook URL is configured in Mercado Pago dashboard

**Issue**: Frontend can't connect to backend
**Solution**: Verify REACT_APP_BACKEND_URL is set correctly

**Issue**: JWT token invalid
**Solution**: Ensure JWT_SECRET matches between token generation and validation

---

## Production Recommendations

1. **Database Backups**: Set up regular MongoDB backups
2. **Monitoring**: Implement application monitoring (logs, errors, performance)
3. **Rate Limiting**: Add rate limiting to prevent API abuse
4. **Email Notifications**: Implement email confirmations for purchases
5. **PDF Tickets**: Generate PDF tickets with QR codes
6. **Admin Panel**: Create admin interface for event management

---

## Contact & Support

For deployment assistance or issues, contact Emergent support or refer to the Emergent documentation.

**Application Version**: 1.0.0
**Last Updated**: October 29, 2025
