import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL
console.log('api backend url: ', API_URL);

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
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;