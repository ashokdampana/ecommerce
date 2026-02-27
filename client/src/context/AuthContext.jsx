import React, { createContext, useState, useEffect } from 'react';
import api from '../services/api.js';

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const token = localStorage.getItem('token');

  // 🔥 If token exists but user missing → verify with backend
  useEffect(() => {
    const checkAuth = async () => {
      const res = await api.get('/api/auth/check_me');
      setUser(res.data.user);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    };

    if (token && !user) {
      checkAuth().catch(() => {}); // axios interceptors handle 401 error
    }
  }, [token, user]);

  const login = async (email, password) => {
    const res = await api.post('/api/auth/login', { email, password });

    setUser(res.data.user);
    localStorage.setItem('user', JSON.stringify(res.data.user));
    localStorage.setItem('token', res.data.token);

    return res;
  };

  const register = async (name, email, password) => {
    return await api.post('/api/auth/register', {name, email, password });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};