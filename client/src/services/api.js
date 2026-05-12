import axios from 'axios';
import { useAuthStore } from '../stores/useAuthStore';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ important
});

// Attach access token
api.interceptors.request.use(config => {
  const token = useAuthStore.getState().accessToken;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Refresh logic
api.interceptors.response.use(
  res => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const res = await axios.post(
          `${API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true } // cookie sent automatically
        );

        const newToken = res.data.data.accessToken;

        // update Zustand
        useAuthStore.getState().refreshToken(newToken);

        original.headers.Authorization = `Bearer ${newToken}`;
        return api(original);

      } catch (err) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export default api;