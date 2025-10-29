# 🎫 Ticketmaster Clone - Plataforma de Venta de Boletos

![Ticketmaster](frontend/public/tickethub-logo.jpg)

Una plataforma completa de venta de boletos para eventos en Colombia, construida con React, FastAPI y MongoDB, con integración de pagos mediante Mercado Pago.

---

## 🌐 Demo en Vivo

**URL:** https://tickethub-31.preview.emergentagent.com/

---

## ✨ Características

### 🎪 Funcionalidades Principales
- ✅ **Catálogo de Eventos** - Conciertos, deportes, teatro, festivales y conferencias
- ✅ **Búsqueda y Filtros** - Por categoría, ubicación y nombre de evento
- ✅ **Autenticación** - Sistema completo de login/registro con JWT
- ✅ **Carrito de Compras** - Agregar múltiples tickets y gestionar compras
- ✅ **Sistema de Checkout** - Proceso completo de compra
- ✅ **Integración Mercado Pago** - Pagos seguros con links dinámicos
- ✅ **Webhooks** - Confirmación automática de pagos
- ✅ **Generación de Tickets** - Creación automática después del pago
- ✅ **Diseño Responsive** - Optimizado para móvil, tablet y desktop

### 🎨 Eventos Destacados
1. **Shakira** - Las Mujeres Ya No Lloran World Tour (6 categorías de tickets)
2. **Ed Sheeran** - Loop Tour 2026
3. **Concierto de Feria** - Manizales (Silvestre, Carlos Vives, Blessd)

---

## 🛠️ Stack Tecnológico

**Frontend:** React 19, Tailwind CSS, shadcn/ui  
**Backend:** FastAPI, MongoDB, JWT  
**Pagos:** Mercado Pago SDK  
**Hosting:** Emergent Platform

---

## 📦 Instalación Rápida

```bash
# Backend
cd backend
pip install -r requirements.txt
python seed_events.py
uvicorn server:app --reload

# Frontend
cd frontend
yarn install
yarn start
```

Ver documentación completa en [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 👨‍💻 Desarrollado Por

**Edgar MFC**  
GitHub: [@edgarmfc2-ship-it](https://github.com/edgarmfc2-ship-it)

---

**Versión:** 1.0.0 | **Estado:** ✅ Production Ready
