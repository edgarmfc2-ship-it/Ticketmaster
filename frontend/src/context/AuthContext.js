import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - in production this would call your backend
    const mockUser = {
      id: '1',
      name: 'Usuario Demo',
      email: email,
      token: 'mock-jwt-token'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const register = (name, email, password) => {
    // Mock register
    const mockUser = {
      id: '2',
      name: name,
      email: email,
      token: 'mock-jwt-token'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};