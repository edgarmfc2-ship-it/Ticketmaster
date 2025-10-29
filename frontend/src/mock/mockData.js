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
    description: 'Shakira en concierto con su nuevo tour mundial - Las Mujeres Ya No Lloran. 1 de noviembre de 2025, Bogotá - Vive Claro',
    prices: {
      preferencial: 360000,
      platino125_132: 480000,
      oro117_123: 600000,
      oro118_124: 600000,
      loc110_116: 721000,
      loc109_115: 721000,
      vipnorte: 961000,
      vipsur: 961000,
      palco102_108: 1081000,
      palco101_107: 1081000
    },
    availableTickets: {
      preferencial: 200,
      platino125_132: 100,
      oro117_123: 80,
      oro118_124: 80,
      loc110_116: 60,
      loc109_115: 60,
      vipnorte: 40,
      vipsur: 40,
      palco102_108: 20,
      palco101_107: 20
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
  },
  {
    id: 'evt011',
    name: 'My Chemical Romance',
    artist: 'My Chemical Romance',
    category: 'concerts',
    venue: 'VIVE CLARO',
    location: 'Bogotá',
    date: '2026-03-15',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
    description: 'My Chemical Romance regresa a Colombia con su gira mundial',
    prices: {
      general: 380000,
      preferencial: 580000,
      vip: 980000,
      palco: 1500000
    },
    availableTickets: {
      general: 200,
      preferencial: 100,
      vip: 50,
      palco: 20
    }
  },
  {
    id: 'evt012',
    name: 'Bad Bunny - Most Wanted Tour',
    artist: 'Bad Bunny',
    category: 'concerts',
    venue: 'Estadio Atanasio Girardot',
    location: 'Medellín',
    date: '2026-02-28',
    time: '21:00',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    description: 'Bad Bunny en el Estadio Atanasio Girardot de Medellín',
    prices: {
      general: 320000,
      preferencial: 520000,
      vip: 880000,
      palco: 1350000
    },
    availableTickets: {
      general: 250,
      preferencial: 120,
      vip: 60,
      palco: 25
    }
  },
  {
    id: 'evt013',
    name: 'Dua Lipa - Radical Optimism Tour',
    artist: 'Dua Lipa',
    category: 'concerts',
    venue: 'Estadio El Campín',
    location: 'Bogotá',
    date: '2026-04-20',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    description: 'Dua Lipa trae su Radical Optimism Tour a Colombia',
    prices: {
      general: 350000,
      preferencial: 550000,
      vip: 950000,
      palco: 1400000
    },
    availableTickets: {
      general: 300,
      preferencial: 150,
      vip: 70,
      palco: 30
    }
  },
  {
    id: 'evt014',
    name: 'Festival Estéreo Picnic 2026',
    artist: 'Festival Multi-Artista',
    category: 'festival',
    venue: 'Parque Simón Bolívar',
    location: 'Bogotá',
    date: '2026-03-27',
    time: '12:00',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80',
    description: 'El festival más grande de Colombia con artistas internacionales',
    prices: {
      general1dia: 450000,
      general3dias: 1200000,
      vip3dias: 1850000,
      camping: 2200000
    },
    availableTickets: {
      general1dia: 500,
      general3dias: 800,
      vip3dias: 200,
      camping: 100
    }
  },
  {
    id: 'evt015',
    name: 'Pierce The Veil',
    artist: 'Pierce The Veil',
    category: 'concerts',
    venue: 'Royal Center',
    location: 'Bogotá',
    date: '2025-12-10',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&q=80',
    description: 'Pierce The Veil en concierto en Bogotá',
    prices: {
      general: 220000,
      preferencial: 350000,
      vip: 580000
    },
    availableTickets: {
      general: 100,
      preferencial: 60,
      vip: 30
    }
  },
  {
    id: 'evt016',
    name: 'Rüfüs Du Sol',
    artist: 'Rüfüs Du Sol',
    category: 'concerts',
    venue: 'Estadio Cincuentenario',
    location: 'Medellín',
    date: '2025-12-05',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1470229538611-16a28b4fa6ec?w=800&q=80',
    description: 'El trío australiano de electrónica en Medellín',
    prices: {
      general: 280000,
      preferencial: 450000,
      vip: 750000
    },
    availableTickets: {
      general: 150,
      preferencial: 80,
      vip: 40
    }
  },
  {
    id: 'evt017',
    name: 'Megaland Music Fest 2025',
    artist: 'Festival Electrónica',
    category: 'festival',
    venue: 'Estadio El Campín',
    location: 'Bogotá',
    date: '2025-11-28',
    time: '14:00',
    image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&q=80',
    description: 'Festival de música electrónica con los mejores DJs del mundo',
    prices: {
      general: 380000,
      vip: 680000,
      premium: 950000
    },
    availableTickets: {
      general: 400,
      vip: 150,
      premium: 50
    }
  },
  {
    id: 'evt018',
    name: 'Julieta Venegas',
    artist: 'Julieta Venegas',
    category: 'concerts',
    venue: 'Teatro Metropolitano',
    location: 'Medellín',
    date: '2026-01-25',
    time: '20:00',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
    description: 'Julieta Venegas en concierto íntimo',
    prices: {
      general: 180000,
      preferencial: 280000,
      vip: 450000
    },
    availableTickets: {
      general: 120,
      preferencial: 70,
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