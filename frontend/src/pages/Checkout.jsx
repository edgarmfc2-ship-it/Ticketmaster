import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { CreditCard } from 'lucide-react';
import { toast } from '../hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);

  const [billingInfo, setBillingInfo] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    idNumber: ''
  });

  const handleChange = (e) => {
    setBillingInfo({
      ...billingInfo,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Mock: Generate payment link for Mercado Pago
      // In production, this would call your backend API
      const mockPaymentLink = 'https://link.mercadopago.com.co/wwwtiquetesbaratos';
      
      toast({
        title: 'Redirigiendo a Mercado Pago',
        description: 'Serás redirigido para completar el pago'
      });

      // Redirect to payment link
      window.location.href = mockPaymentLink;
      
      // Clear cart after redirect
      setTimeout(() => {
        clearCart();
      }, 1000);
    }, 2000);
  };

  if (cart.length === 0) {
    navigate('/carrito');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold">Finalizar Compra</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Billing Form */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6">Información de Facturación</h2>
              <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Nombre Completo</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={billingInfo.fullName}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={billingInfo.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={billingInfo.phone}
                    onChange={handleChange}
                    placeholder="+57 300 123 4567"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="idNumber">Número de Documento</Label>
                  <Input
                    id="idNumber"
                    name="idNumber"
                    value={billingInfo.idNumber}
                    onChange={handleChange}
                    placeholder="CC o NIT"
                    required
                  />
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <div className="flex items-start gap-3">
                    <CreditCard className="w-6 h-6 text-blue-600 mt-1" />
                    <div>
                      <h3 className="font-semibold text-blue-900 mb-1">
                        Pago Seguro con Mercado Pago
                      </h3>
                      <p className="text-sm text-blue-800">
                        Serás redirigido a Mercado Pago para completar tu pago de forma segura.
                        Acepta tarjetas de crédito, débito, PSE y más.
                      </p>
                    </div>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  disabled={processing}
                >
                  {processing ? 'Procesando...' : 'Ir a Mercado Pago'}
                </Button>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4">Resumen de Compra</h2>

              <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
                {cart.map((item) => (
                  <div key={item.id} className="text-sm border-b pb-2">
                    <p className="font-semibold">{item.eventName}</p>
                    <p className="text-gray-600">
                      {item.quantity}x {item.ticketType} - ${item.total.toLocaleString('es-CO')}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
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

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">Total</span>
                  <span className="text-2xl font-bold text-blue-600">
                    ${getCartTotal().toLocaleString('es-CO')}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                <p className="mb-2">✔️ Compra segura</p>
                <p className="mb-2">✔️ Entrega instantánea por email</p>
                <p>✔️ Soporte 24/7</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;