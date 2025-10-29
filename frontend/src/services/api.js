import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const api = axios.create({
  baseURL: API,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const user = localStorage.getItem('user');
  if (user) {
    const userData = JSON.parse(user);
    if (userData.token) {
      config.headers.Authorization = `Bearer ${userData.token}`;
    }
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (name, email, password) => 
    api.post('/auth/register', { name, email, password }),
  
  login: (email, password) => 
    api.post('/auth/login', { email, password }),
  
  getMe: () => 
    api.get('/auth/me'),
};

// Event APIs
export const eventAPI = {
  getEvents: (category = null, location = null) => {
    const params = {};
    if (category) params.category = category;
    if (location) params.location = location;
    return api.get('/events', { params });
  },
  
  getEvent: (eventId) => 
    api.get(`/events/${eventId}`),
  
  searchEvents: (query) => 
    api.get(`/events/search/${query}`),
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData) => 
    api.post('/orders', orderData),
  
  getOrders: () => 
    api.get('/orders'),
  
  getOrder: (orderId) => 
    api.get(`/orders/${orderId}`),
};

// Ticket APIs
export const ticketAPI = {
  getTickets: () => 
    api.get('/tickets'),
};

export default api;
