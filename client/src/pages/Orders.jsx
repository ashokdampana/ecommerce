
import React from 'react'
import api from '../services/api.js';
import { useEffect } from 'react';

const fetchOrders = async () => {
    const res = await api.get('/api/orders');
    return res.data.order;
}

const Orders = () => {
    const [orders, setOrders] = React.useState([]);

    useEffect(() => {
        fetchOrders().then(orders => setOrders(orders));
    }, [])
  return (
    <div>
        <h1>Orders Page</h1>
        {orders.length === 0 ? ( <p>No orders found.</p> ) : (
            <div></div>
         )}
    </div>
  )
}

export default Orders;
