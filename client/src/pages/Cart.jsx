import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext.jsx';
import useTanMutation from '../hooks/useTanMutation.js';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();


  const { mutate, isPending } = useTanMutation('POST', '/api/orders', ['orders']);

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleCheckout = () => {
    const orderData = {
      orderItems: cartItems.map(({ _id, name, image, price, qty }) => ({
        product: _id, name, image, price, qty,
      })),
      totalPrice,
    };


    mutate({ body: orderData }, {
      onSuccess: (data) => {
        clearCart();
        navigate(`/orders/${data.order._id}`);
      }
    });
  };

  if (cartItems.length === 0) {
    return <div className="flex justify-center mt-20 text-gray-500">Your cart is empty</div>;
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6 text-center">Your Cart</h2>
      
      <ul className="space-y-3">
        {cartItems.map(item => (
          <li key={item._id} className="flex items-center gap-4 border p-3 rounded-lg bg-white shadow-sm">
            <img src={item.image} alt={item.name} className="w-16 h-16 object-contain rounded" />
            
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">{item.qty} x ${item.price}</p>
            </div>

            <button
              className="text-red-500 text-sm font-bold hover:underline"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt-8 border-t pt-4">
        <div className="flex justify-between text-xl font-bold">
          <span>Total:</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>

        <button
          className="btn-primary mt-6"
          disabled={isPending}
          onClick={handleCheckout}
        >
          {isPending ? 'Processing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Cart;