// import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <CartProvider>
        <App />
        <ToastContainer />
    </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
)
