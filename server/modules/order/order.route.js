const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const { createOrder, getOrderById, getMyOrders, getOrders } = require('../controllers/orderController');

// create order (logged in users)
router.post('/', protect, createOrder);

// get specific order (owner or admin)
router.get('/:id', protect, getOrderById);

// get current user's orders
router.get('/myorders', protect, getMyOrders);

// admin can view all orders
router.get('/', protect, admin, getOrders);

module.exports = router;
