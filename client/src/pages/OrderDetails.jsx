import React from 'react';
import { useParams } from 'react-router-dom';
import useTanQuery from '../hooks/useTanQuery.js';

const OrderDetails = () => {
  const { id } = useParams();

  // 1. Using your custom useTanQuery hook
  const { data, isLoading, isError } = useTanQuery(
    `/api/orders/${id}`, 
    ['orders', id]
  );

  // 2. Consistent loading and error states using your CSS
  if (isLoading) return <div className="page-center"><h2>Loading Order...</h2></div>;
  
  if (isError || !data?.order) {
    return (
      <div className="page-center">
        <h2 className="text-red-600">Order not found</h2>
        <p>We couldn't retrieve the details for this order ID.</p>
      </div>
    );
  }

  const { order } = data;

  return (
    <div className="p-4 flex flex-col items-center">
      {/* 3. Using your .card component style */}
      <div className="card max-w-2xl">
        <h2>Order Summary</h2>
        <p className="text-sm text-gray-500 mb-4 italic">ID: {order._id}</p>
        
        <div className="space-y-2 mb-6">
          <p>
            Status: 
            <span className={order.isPaid 
              ? 'text-green-600 font-bold ml-2' 
              : 'text-red-600 font-bold ml-2'}
            >
              {order.isPaid ? '● Paid' : '○ Not Paid'}
            </span>
          </p>
          <p className="text-xl font-extrabold">Total: ${order.totalPrice}</p>
        </div>

        <hr className="my-4 border-gray-100" />

        <ul className="divide-y divide-gray-100">
          {order.orderItems.map((item) => (
            <li key={item.product} className="py-3 flex justify-between items-center">
              <div>
                <span className="font-medium text-gray-800">{item.name}</span>
                <p className="text-xs text-gray-500">Quantity: {item.qty}</p>
              </div>
              <span className="font-mono">${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>
        
        {/* Optional Action Button */}
        {!order.isPaid && (
          <button className="btn-primary mt-6">
            Pay Now
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;