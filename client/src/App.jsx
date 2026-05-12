import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import api from './services/api.js';
import { useAuthStore } from './stores/useAuthStore.js';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

import Navbar from './components/Navbar';
import Footer from './components/Footer'

import HomePage from './pages/HomePage';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import OrderDetails from './pages/OrderDetails';
import ProtectedRoute from './components/ProtectedRoutes';

function App() {
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const logout = useAuthStore((state) => state.logout);
  const accessToken = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    const verifyUserSession = async () => {
      if (!accessToken) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        await api.get('/api/auth/check_me');
      } catch (error) {
        if (error.response && error.response.status === 401) {
          logout();
        }
      } finally {
        setIsCheckingAuth(false);
      }
    };

    verifyUserSession();
  }, [logout]);

  if (isCheckingAuth) {
    return <div className="page-center"><h2>Loading...</h2></div>;
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
        </Route>


        <Route path="*" element={<h2 className="page-center">Page Not Found</h2>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;