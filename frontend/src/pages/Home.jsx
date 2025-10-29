import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { mockEvents, categories } from '../mock/mockData';
import { Calendar, MapPin, ChevronRight, ChevronLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const featuredEvents = mockEvents.slice(0, 3);
  const filteredEvents = selectedCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.category === selectedCategory);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredEvents.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredEvents.length) % featuredEvents.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel */}
      <div className="relative h-[500px] bg-gradient-to-br from-pink-500 to-pink-600 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={featuredEvents[currentSlide].image}
            alt={featuredEvents[currentSlide].name}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-4">
              {featuredEvents[currentSlide].name}
            </h1>
            <p className="text-xl md:text-2xl mb-2">
              {new Date(featuredEvents[currentSlide].date).toLocaleDateString('es-CO', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
            <p className="text-lg md:text-xl mb-6">
              {featuredEvents[currentSlide].venue} - {featuredEvents[currentSlide].location}
            </p>
            <Link to={`/evento/${featuredEvents[currentSlide].id}`}>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 font-semibold">
                Comprar Entradas
              </Button>
            </Link>
          </div>
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        >
          <ChevronLeft className="w-6 h-6 text-gray-900" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-3 rounded-full transition"
        >
          <ChevronRight className="w-6 h-6 text-gray-900" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {featuredEvents.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* App Download Banner */}
      <div className="bg-blue-600 py-8">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6 text-white">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold mb-2">
              DESCARGA <span className="text-green-400">Quentro</span>
            </h2>
            <p className="text-lg">¡TUS ENTRADAS DISPONIBLES AL INSTANTE!</p>
          </div>
          <div className="flex gap-4">
            <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
              <span>🍎</span> App Store
            </a>
            <a href="#" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center gap-2">
              <span>📱</span> Play Store
            </a>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              variant={selectedCategory === category.id ? 'default' : 'outline'}
              className="whitespace-nowrap"
            >
              {category.name}
            </Button>
          ))}
        </div>
      </div>

      {/* Events Grid */}
      <div className="container mx-auto px-4 pb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold">
            {selectedCategory === 'all' ? 'PRÓXIMOS EVENTOS' : categories.find(c => c.id === selectedCategory)?.name.toUpperCase()}
          </h2>
          <Link to="/eventos" className="text-blue-600 hover:underline flex items-center gap-1">
            Conoce más <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredEvents.map((event) => (
            <Link key={event.id} to={`/evento/${event.id}`}>
              <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-semibold">
                    +{Math.floor(Math.random() * 20)}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition">
                    {event.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-1">{event.venue}</p>
                  <p className="text-sm text-gray-600 mb-3 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {event.location}
                  </p>
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    Comprar
                  </Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recommended Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">RECOMENDADOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockEvents.slice(2, 5).map((event) => (
              <Link key={event.id} to={`/evento/${event.id}`}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group">
                  <div className="relative h-64">
                    <img
                      src={event.image}
                      alt={event.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 text-white">
                      <h3 className="font-bold text-xl mb-1">{event.name}</h3>
                      <p className="text-sm">{event.venue}</p>
                      <p className="text-sm flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {event.location}
                      </p>
                    </div>
                  </div>
                  <div className="p-4">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {event.id === 'evt004' ? 'Redimir' : 'Comprar'}
                    </Button>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;