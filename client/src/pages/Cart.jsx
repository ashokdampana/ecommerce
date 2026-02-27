import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext.jsx';
import api from '../services/api.js';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const checkout = async () => {
    try {
      const orderData = {
        orderItems: cartItems.map(({ _id, name, image, price, qty }) => ({
          product: _id,
          name,
          image,
          price,
          qty,
        })),
        totalPrice,
      };
      const res = await api.post('/api/orders', orderData);
      console.log('order created', res.data.order);
      clearCart();
      navigate(`/orders/${res.data.order._id}`);
    } catch (err) {
      console.error(err);
      alert('Checkout failed');
    }
  };

  if (cartItems.length === 0) return <p className="text-center mt-8">Your cart is empty</p>;

  return (
    <div className='max-w-xl mx-auto p-4'>
      <h2 className='text-2xl mb-4 text-center'>Cart Items</h2>
      <ul>
        {cartItems.map(item => (
          <li key={item._id} className='mb-2 flex items-center border rounded p-2'>
            <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
            <span className='mx-2 flex-1'>
              {item.name} - {item.qty} x ${item.price}
            </span>
            <button
              className='ml-auto bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <h3 className='text-xl mt-4 text-right'>Total: ${totalPrice.toFixed(2)}</h3>
      <button
        className='mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
        onClick={checkout}
      >
        Checkout
      </button>
    </div>
  );
}

export default Cart
