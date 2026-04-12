/* eslint-disable no-unused-vars */
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/useAuthStore.js';
import { useCartStore } from '../stores/useCartStore.js';

const Navbar = () => {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.token);
  const isAuthenticated = Boolean(user && token);

  return (
    <nav className="flex items-center justify-between p-4 bg-gray-900 text-white shadow-md">
      {/* Brand Logo */}
      <Link to="/" className="text-xl font-bold tracking-tight text-blue-400">
        CLOTHES
      </Link>

      {/* Categories */}
      <div className="hidden md:flex gap-6">
        <Link to="/?category=men" className="hover:text-blue-400 transition-colors">Men</Link>
        <Link to="/?category=women" className="hover:text-blue-400 transition-colors">Women</Link>
        <Link to="/?category=kids" className="hover:text-blue-400 transition-colors">Kids</Link>
      </div>

      {/* Auth & Cart Actions */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? <UserActions /> : <AuthLinks />}
      </div>
    </nav>
  );
};

const AuthLinks = () => (
  <div className="flex gap-4 items-center text-sm font-medium">
    <Link to="/login" className="hover:text-blue-400 transition-colors">Login</Link>
    <Link to="/register" className="bg-blue-600 px-4 py-1 rounded hover:bg-blue-700 transition-colors">
      Register
    </Link>
  </div>
);

const UserActions = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  const cartItems = useCartStore((state) => state.cartItems);

  // Calculate total items in cart
  const itemCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  const handleLogout = () => {
    logout(); // 1. Updates auth store state
    navigate('/login'); // 2. Redirects
  };

  return (
    <div className="flex items-center gap-5 text-sm font-medium">
      {/* Cart with Badge */}
      <Link to="/cart" className="relative hover:text-blue-400 transition-colors">
        Cart
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-3 bg-red-500 text-[10px] text-white px-1.5 rounded-full">
            {itemCount}
          </span>
        )}
      </Link>

      <Link to="/profile" className="hover:text-blue-400 transition-colors">
        {user?.username || 'Profile'}
      </Link>

      <button 
        onClick={handleLogout}
        className="text-red-400 hover:text-red-500 font-bold cursor-pointer"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;