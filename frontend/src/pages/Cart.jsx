import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Trash2, ShoppingBag } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, removeFromCart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <Card className="p-12 text-center">
            <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-6">
              Explora nuestros eventos y agrega tickets a tu carrito
            </p>
            <Button onClick={() => navigate('/')} className="bg-blue-600 hover:bg-blue-700">
              Ver Eventos
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      toast({
        title: 'Inicia sesión',
        description: 'Debes iniciar sesión para continuar',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Carrito de Compras</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <Card key={item.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.eventName}</h3>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{item.venue}, {item.location}</p>
                      <p>
                        {new Date(item.date).toLocaleDateString('es-CO', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        {' '}- {item.time}
                      </p>
                      <p className="font-semibold capitalize">
                        {item.quantity}x Entrada {item.ticketType === 'general' ? 'General' : 
                         item.ticketType === 'vip' ? 'VIP' :
                         item.ticketType === 'palco' ? 'Palco' :
                         item.ticketType === 'preferencial' ? 'Preferencial' : item.ticketType}
                      </p>
                    </div>
                    <div className="mt-4">
                      <p className="text-2xl font-bold text-blue-600">
                        ${item.total.toLocaleString('es-CO')}
                      </p>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      removeFromCart(item.id);
                      toast({
                        title: 'Eliminado',
                        description: 'Ticket eliminado del carrito'
                      });
                    }}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            ))}

            <Button
              variant="outline"
              onClick={() => {
                clearCart();
                toast({
                  title: 'Carrito vaciado',
                  description: 'Todos los items han sido eliminados'
                });
              }}
              className="w-full"
            >
              Vaciar Carrito
            </Button>
          </div>

          {/* Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-2xl font-bold mb-6">Resumen del Pedido</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold">
                    ${getCartTotal().toLocaleString('es-CO')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Cargo por servicio</span>
                  <span className="font-semibold">$0</span>
                </div>
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${getCartTotal().toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6 mb-4"
              >
                Proceder al Pago
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate('/')}
                className="w-full"
              >
                Seguir Comprando
              </Button>

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                <p className="mb-2">✔️ Pago 100% seguro</p>
                <p className="mb-2">✔️ Entrega instantánea</p>
                <p>✔️ Garantía de compra</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;