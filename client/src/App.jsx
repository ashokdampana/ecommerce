import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import ProductsList from './pages/ProductsList';
import ProductDetails from './pages/ProductDetails';
import Profile from './pages/Profile';
import Cart from './pages/Cart';
import OrderDetails from './pages/OrderDetails';
import ProtectedRoute from './components/ProtectedRoutes';


function App() {
    return (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <ProtectedRoute>
              <Route path='/' element={<HomePage />} />
              <Route path='/products' element={<ProductsList />} />
              <Route path='/products/:id' element={<ProductDetails />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/cart' element={<Cart />} />
              <Route path='/orders/:id' element={<OrderDetails />} />
              <Routes path='*' element={<h2>Page Not Found</h2>} />
            </ProtectedRoute>
          </Routes>
        </Router>
    );
}

export default App;
