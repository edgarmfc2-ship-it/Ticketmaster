import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">ticketmaster</h3>
            <p className="text-sm mb-4">
              La plataforma líder en venta de boletos para eventos en Colombia.
            </p>
            <div className="flex gap-4">
              <a href="#" className="hover:text-white transition">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-white transition">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/eventos" className="hover:text-white transition">Eventos</Link></li>
              <li><Link to="/conciertos" className="hover:text-white transition">Conciertos</Link></li>
              <li><Link to="/deportes" className="hover:text-white transition">Deportes</Link></li>
              <li><Link to="/teatro" className="hover:text-white transition">Teatro</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Soporte</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ayuda" className="hover:text-white transition">Centro de Ayuda</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition">Contáctanos</Link></li>
              <li><Link to="/devoluciones" className="hover:text-white transition">Devoluciones</Link></li>
              <li><Link to="/terminos" className="hover:text-white transition">Términos y Condiciones</Link></li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-white font-semibold mb-4">Mi Cuenta</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/login" className="hover:text-white transition">Iniciar Sesión</Link></li>
              <li><Link to="/register" className="hover:text-white transition">Registrarse</Link></li>
              <li><Link to="/mis-tickets" className="hover:text-white transition">Mis Tickets</Link></li>
              <li><Link to="/mi-cuenta" className="hover:text-white transition">Configuración</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; 2025 TicketHub Colombia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;