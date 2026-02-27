import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await api.get(`/api/orders/${id}`);
        setOrder(res.data.order);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!order) return <p className="text-center mt-8">Order not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-2">Order {order._id}</h2>
      <p className="mb-1">Status: <span className={order.isPaid ? 'text-green-600' : 'text-red-600'}>{order.isPaid ? 'Paid' : 'Not paid'}</span></p>
      <p className="mb-4 font-semibold">Total: ${order.totalPrice}</p>
      <ul className="divide-y">
        {order.orderItems.map((item) => (
          <li key={item.product} className="py-2 flex justify-between">
            <span>{item.name} x {item.qty}</span>
            <span>${(item.price * item.qty).toFixed(2)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderDetails;
