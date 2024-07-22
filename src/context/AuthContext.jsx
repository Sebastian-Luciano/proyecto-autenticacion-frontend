import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      const response = await api.get('/api/user/profile');
      setUser(response.data);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await api.post('/api/auth/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token.trim());
      await fetchUser();
      navigate('/profile'); // Redirección a la página de perfil
    } catch (error) {
      throw error;
    }
  };

  const register = async (email, password) => {
    try {
      const response = await api.post('/api/auth/register', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token.trim());
      await fetchUser();
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Redirección a la página de inicio de sesión
  };

  const updateUser = async (userData) => {
    try {
      const response = await api.put('/api/user/profile', userData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      console.error('Error en updateUser:', error);
      throw error;
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', JSON.stringify(newMode));
      return newMode;
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  // Inicializa darkMode
  const savedDarkMode = JSON.parse(localStorage.getItem('darkMode')) || false;
  setDarkMode(savedDarkMode);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser, darkMode, toggleDarkMode }}>
      {children}
    </AuthContext.Provider>
  );
};