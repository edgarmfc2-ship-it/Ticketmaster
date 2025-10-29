// Mock data for events
export const mockEvents = [
  {
    id: 'evt001',
    name: 'Ed Sheeran - Loop Tour',
    artist: 'Ed Sheeran',
    category: 'concerts',
    venue: 'VIVE CLARO',
    location: 'Bogotá',
    date: '2026-05-16',
    time: '20:00',
    image: '/ed-sheeran.jpg',
    description: 'Ed Sheeran regresa a Colombia con su Loop Tour 2026',
    prices: {
      general: 180000,
      vip: 450000,
      palco: 850000
    },
    availableTickets: {
      general: 50,
      vip: 20,
      palco: 5
    }
  },
  {
    id: 'evt002',
    name: 'Shakira - Las Mujeres Ya No Lloran World Tour',
    artist: 'Shakira',
    category: 'concerts',
    venue: 'VIVE CLARO',
    location: 'Bogotá',
    date: '2025-11-01',
    time: '21:00',
    image: '/estoy-aqui.png',
    description: 'Shakira en concierto con su nuevo tour mundial - Las Mujeres Ya No Lloran',
    prices: {
      preferencial: 360000,
      platino: 480000,
      oro: 600000,
      vipnorte: 961000,
      vipsur: 961000,
      palco: 1081000
    },
    availableTickets: {
      preferencial: 150,
      platino: 80,
      oro: 100,
      vipnorte: 40,
      vipsur: 40,
      palco: 20
    }
  },
  {
    id: 'evt003',
    name: 'Concierto de Feria',
    artist: 'Silvestre Dangond, Carlos Vives, Blessd',
    category: 'concerts',
    venue: 'Estadio Palogrande',
    location: 'Manizales',
    date: '2026-01-10',
    time: '18:00',
    image: '/concierto-feria.jpeg',
    description: 'Gran concierto de feria con los mejores artistas colombianos',
    prices: {
      general: 120000,
      vip: 350000
    },
    availableTickets: {
      general: 200,
      vip: 50
    }
  },
  {
    id: 'evt004',
    name: 'Moneycon 2026',
    artist: 'Conferencia Financiera',
    category: 'conference',
    venue: 'Universidad de los Andes',
    location: 'Bogotá',
    date: '2026-01-17',
    time: '09:00',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80',
    description: 'Conferencia sobre finanzas e inversiones',
    prices: {
      general: 150000,
      vip: 300000
    },
    availableTickets: {
      general: 500,
      vip: 100
    }
  },
  {
    id: 'evt005',
    name: 'Soulstice Dance 2025',
    artist: 'Festival de Música Electrónica',
    category: 'festival',
    venue: 'Playa Soulstice',
    location: 'Santa Marta',
    date: '2025-12-20',
    time: '14:00',
    image: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=800&q=80',
    description: 'Festival de música electrónica en la playa',
    prices: {
      general: 200000,
      vip: 450000
    },
    availableTickets: {
      general: 1000,
      vip: 200
    }
  },
  {
    id: 'evt006',
    name: 'Blessd en Concierto',
    artist: 'Blessd',
    category: 'concerts',
    venue: 'VIVE CLARO',
    location: 'Bogotá',
    date: '2025-11-22',
    time: '20:30',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    description: 'Blessd presenta su nuevo álbum en vivo',
    prices: {
      general: 150000,
      vip: 380000
    },
    availableTickets: {
      general: 80,
      vip: 25
    }
  },
  {
    id: 'evt007',
    name: "L'Impératrice",
    artist: "L'Impératrice",
    category: 'concerts',
    venue: 'Royal Center',
    location: 'Bogotá',
    date: '2025-10-20',
    time: '21:00',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    description: 'La banda francesa de funk y disco en Colombia',
    prices: {
      general: 180000,
      vip: 420000
    },
    availableTickets: {
      general: 60,
      vip: 20
    }
  },
  {
    id: 'evt008',
    name: 'Alejandro Fernández - De Rey a Rey',
    artist: 'Alejandro Fernández',
    category: 'concerts',
    venue: 'Plaza de Toros',
    location: 'Bucaramanga',
    date: '2025-10-30',
    time: '19:00',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    description: 'Alejandro Fernández rinde homenaje a Vicente Fernández',
    prices: {
      general: 200000,
      vip: 500000,
      palco: 900000
    },
    availableTickets: {
      general: 150,
      vip: 40,
      palco: 15
    }
  },
  {
    id: 'evt009',
    name: 'América vs Millonarios',
    artist: 'Fútbol Profesional Colombiano',
    category: 'sports',
    venue: 'Estadio Pascual Guerrero',
    location: 'Cali',
    date: '2025-11-15',
    time: '18:00',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    description: 'Clásico del fútbol colombiano',
    prices: {
      general: 45000,
      preferencial: 85000,
      palco: 250000
    },
    availableTickets: {
      general: 500,
      preferencial: 200,
      palco: 20
    }
  },
  {
    id: 'evt010',
    name: 'Bloc Party',
    artist: 'Bloc Party',
    category: 'concerts',
    venue: 'Teatro Colón',
    location: 'Bogotá',
    date: '2025-11-18',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?w=800&q=80',
    description: 'La banda británica de indie rock en Bogotá',
    prices: {
      general: 160000,
      vip: 380000
    },
    availableTickets: {
      general: 70,
      vip: 30
    }
  }
];

export const categories = [
  { id: 'all', name: 'Todos', icon: 'grid' },
  { id: 'concerts', name: 'Conciertos', icon: 'music' },
  { id: 'sports', name: 'Deportes', icon: 'trophy' },
  { id: 'theater', name: 'Teatro', icon: 'drama' },
  { id: 'festival', name: 'Festivales', icon: 'sparkles' },
  { id: 'conference', name: 'Conferencias', icon: 'briefcase' }
];

export const cities = [
  'Todas las ciudades',
  'Bogotá',
  'Medellín',
  'Cali',
  'Barranquilla',
  'Cartagena',
  'Santa Marta',
  'Manizales',
  'Bucaramanga'
];