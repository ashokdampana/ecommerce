import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext.jsx';


const Navbar = () => {
  const { user } = useContext(AuthContext);
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link to="/" className="text-lg font-semibold">Clothes</Link>
      <div className='flex gap-4'>
        <Link to='/?category=men' className='hover:text-gray-300'>Men</Link>
        <Link to='/?category=women' className='hover:text-gray-300'>Women</Link>
        <Link to='/?category=kids' className='hover:text-gray-300'>Kids</Link>
      </div>
      <div className="space-x-4">
        {user ? <SelectOptions/> : <AuthLinks />}
      </div>
    </nav>
  );
};

const AuthLinks = () => (
  <>
    <Link to="/login" className="hover:underline">Login</Link>
    <Link to="/register" className="hover:underline">Register</Link>
  </>
);

const SelectOptions = () => {
  const navigate = useNavigate();
  const { cartItems } = useContext(CartContext);
  const itemCount = cartItems.reduce((sum, i) => sum + i.qty, 0);

  return (
    <div className="flex items-center gap-4">
      <Link to="/profile" className="hover:text-gray-300">Profile</Link>
      <Link to="/cart" className="hover:text-gray-300">
        Cart {itemCount > 0 && `(${itemCount})`}
      </Link>
      {/* For logout, you'll eventually want a button, but Link works for now */}
      <button className="text-red-400 hover:text-red-300" 
        onClick={() => { 
          localStorage.clear('user');
          localStorage.clear('token')
          navigate('/login');
        }}
      >Logout</button>
    </div>
  );
};

export default Navbar;  
