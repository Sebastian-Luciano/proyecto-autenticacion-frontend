/* import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
 */


// api.js

import axios from 'axios';

const BASE_URL = 'http://localhost:3000'; // Ajusta esto según tu configuración

const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Función para obtener la URL completa de una imagen
api.getImageUrl = (imagePath) => {
  return `${BASE_URL}/uploads/${imagePath}`;
};

export default api;