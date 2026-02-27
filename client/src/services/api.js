import axios from 'axios';
import AppError from '../utils/AppError.js';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 10000,
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      localStorage.clear('user');
      localStorage.clear('token');
      window.location.href = '/login';
      throw new AppError('Unauthorized. Please log in again.', 401);
    }

    if (status >= 500) {
      throw new AppError('Server error. Try again later.', status);
    }

    throw new AppError(error.message || 'API Error', status || 500);
  }
);

export default api;
