import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockEvents } from '../mock/mockData';
import { Calendar, MapPin, Clock, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from '../hooks/use-toast';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { user } = useAuth();
  const event = mockEvents.find(e => e.id === id);

  const [selectedTickets, setSelectedTickets] = useState({});

  if (!event) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Evento no encontrado</h1>
        <Button onClick={() => navigate('/')}>Volver al inicio</Button>
      </div>
    );
  }

  const handleQuantityChange = (ticketType, change) => {
    setSelectedTickets(prev => {
      const current = prev[ticketType] || 0;
      const newQuantity = Math.max(0, Math.min(10, current + change));
      return { ...prev, [ticketType]: newQuantity };
    });
  };

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: 'Inicia sesión',
        description: 'Debes iniciar sesión para comprar tickets',
        variant: 'destructive'
      });
      navigate('/login');
      return;
    }

    let added = false;
    Object.entries(selectedTickets).forEach(([ticketType, quantity]) => {
      if (quantity > 0) {
        addToCart(event, ticketType, quantity, event.prices[ticketType]);
        added = true;
      }
    });

    if (added) {
      toast({
        title: '¡Agregado al carrito!',
        description: 'Tickets agregados exitosamente'
      });
      setSelectedTickets({});
    } else {
      toast({
        title: 'Selecciona tickets',
        description: 'Debes seleccionar al menos un ticket',
        variant: 'destructive'
      });
    }
  };

  const getTotalSelected = () => {
    return Object.entries(selectedTickets).reduce((total, [ticketType, quantity]) => {
      return total + (event.prices[ticketType] * quantity);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Button>
        </div>
      </div>

      {/* Event Header */}
      <div className="relative h-96 bg-gradient-to-br from-blue-600 to-purple-600">
        <img
          src={event.image}
          alt={event.name}
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {event.name}
            </h1>
            <div className="flex flex-wrap gap-4 text-white text-lg">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {new Date(event.date).toLocaleDateString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>{event.venue}, {event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-6">
              <h2 className="text-2xl font-bold mb-4">Descripción del Evento</h2>
              <p className="text-gray-700 mb-4">{event.description}</p>
              
              <div className="border-t pt-4 mt-4">
                <h3 className="font-semibold mb-2">Información del Lugar</h3>
                <p className="text-gray-600">{event.venue}</p>
                <p className="text-gray-600">{event.location}, Colombia</p>
              </div>
            </Card>

            {/* Ticket Selection */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Selecciona tus Entradas</h2>
              <div className="space-y-4">
                {Object.entries(event.prices).map(([ticketType, price]) => (
                  <div
                    key={ticketType}
                    className="border rounded-lg p-4 flex items-center justify-between hover:border-blue-500 transition"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {ticketType === 'general' ? 'General' : 
                         ticketType === 'vip' ? 'VIP' :
                         ticketType === 'palco' ? 'Palco' :
                         ticketType === 'preferencial' ? 'Preferencial (+18 años)' :
                         ticketType === 'platino' ? 'Platino' :
                         ticketType === 'platino125_132' ? 'Platino 125-132 (+18 años)' :
                         ticketType === 'oro' ? 'Oro' :
                         ticketType === 'oro117_123' ? 'Oro 117, 119, 121, 123 (Menores +7 años)' :
                         ticketType === 'oro118_124' ? 'Oro 118, 120, 122, 124 (+18 años)' :
                         ticketType === 'loc110_116' ? 'Localidad 110, 112, 114, 116 (+18 años)' :
                         ticketType === 'loc109_115' ? 'Localidad 109, 111, 113, 115 (Menores +7 años)' :
                         ticketType === 'vipnorte' ? 'VIP Norte (Menores +7 años)' :
                         ticketType === 'vipsur' ? 'VIP Sur (+18 años)' :
                         ticketType === 'palco102_108' ? 'Palco 102, 104, 106, 108 (+18 años)' :
                         ticketType === 'palco101_107' ? 'Palco 101, 103, 105, 107 (Menores +7 años)' : ticketType}
                      </h3>
                      <p className="text-2xl font-bold text-blue-600">
                        ${price.toLocaleString('es-CO')}
                      </p>
                      <p className="text-sm text-gray-500">
                        {event.availableTickets[ticketType]} disponibles
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(ticketType, -1)}
                        disabled={!selectedTickets[ticketType]}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="text-xl font-semibold w-8 text-center">
                        {selectedTickets[ticketType] || 0}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleQuantityChange(ticketType, 1)}
                        disabled={selectedTickets[ticketType] >= event.availableTickets[ticketType]}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Purchase Summary */}
          <div>
            <Card className="p-6 sticky top-4">
              <h3 className="text-xl font-bold mb-4">Resumen de Compra</h3>
              
              {Object.entries(selectedTickets).filter(([, qty]) => qty > 0).length > 0 ? (
                <>
                  <div className="space-y-3 mb-4">
                    {Object.entries(selectedTickets)
                      .filter(([, quantity]) => quantity > 0)
                      .map(([ticketType, quantity]) => (
                        <div key={ticketType} className="flex justify-between text-sm">
                          <span className="capitalize">
                            {quantity}x {ticketType === 'general' ? 'General' : 
                             ticketType === 'vip' ? 'VIP' :
                             ticketType === 'palco' ? 'Palco' :
                             ticketType === 'preferencial' ? 'Preferencial' :
                             ticketType === 'platino' ? 'Platino' :
                             ticketType === 'oro' ? 'Oro' :
                             ticketType === 'vipnorte' ? 'VIP Norte' :
                             ticketType === 'vipsur' ? 'VIP Sur' : ticketType}
                          </span>
                          <span className="font-semibold">
                            ${(event.prices[ticketType] * quantity).toLocaleString('es-CO')}
                          </span>
                        </div>
                      ))}
                  </div>

                  <div className="border-t pt-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-semibold">Total:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ${getTotalSelected().toLocaleString('es-CO')}
                      </span>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddToCart}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-lg py-6"
                  >
                    Agregar al Carrito
                  </Button>
                </>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>Selecciona tus entradas para continuar</p>
                </div>
              )}

              <div className="mt-6 pt-6 border-t text-sm text-gray-600">
                <p className="mb-2">✔️ Entrega instantánea</p>
                <p className="mb-2">✔️ Pago seguro con Mercado Pago</p>
                <p>✔️ Garantía de compra</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;