import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  return (
    <nav className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between py-2 text-sm border-b border-blue-500">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-yellow-400 text-blue-900 rounded-full text-xs font-semibold">CO</span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/ayuda" className="hover:underline">Ayuda</Link>
            <Link to="/puntos-venta" className="hover:underline">Puntos de venta</Link>
          </div>
        </div>

        {/* Main navbar */}
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold italic">TicketHub</span>
          </Link>

          {/* Desktop Search */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Buscar Artista o Evento"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition"
              >
                Buscar
              </button>
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <Link to="/soporte" className="hover:underline">Soporte</Link>
            
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-white hover:bg-blue-700">
                    <User className="w-5 h-5 mr-2" />
                    {user.name}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-48">
                  <DropdownMenuItem onClick={() => navigate('/mi-cuenta')}>
                    Mi Cuenta
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/mis-tickets')}>
                    Mis Tickets
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout}>
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                variant="ghost"
                className="text-white hover:bg-blue-700"
              >
                Ingresar / Registrarse
              </Button>
            )}

            <Link to="/carrito" className="relative">
              <Button variant="ghost" className="text-white hover:bg-blue-700">
                <ShoppingCart className="w-5 h-5" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <Input
                type="text"
                placeholder="Buscar Artista o Evento"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-12 py-2 rounded-lg text-gray-900"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Search className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-blue-700 border-t border-blue-500">
          <div className="container mx-auto px-4 py-4 space-y-3">
            <Link
              to="/soporte"
              className="block py-2 hover:bg-blue-600 px-2 rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              Soporte
            </Link>
            {user ? (
              <>
                <Link
                  to="/mi-cuenta"
                  className="block py-2 hover:bg-blue-600 px-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mi Cuenta
                </Link>
                <Link
                  to="/mis-tickets"
                  className="block py-2 hover:bg-blue-600 px-2 rounded"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Mis Tickets
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 hover:bg-blue-600 px-2 rounded"
                >
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block py-2 hover:bg-blue-600 px-2 rounded"
                onClick={() => setMobileMenuOpen(false)}
              >
                Ingresar / Registrarse
              </Link>
            )}
            <Link
              to="/carrito"
              className="block py-2 hover:bg-blue-600 px-2 rounded flex items-center justify-between"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span>Carrito</span>
              {getCartCount() > 0 && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1">
                  {getCartCount()}
                </span>
              )}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;