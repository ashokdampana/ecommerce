const express = require('express');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const admin = require('../../middleware/adminMiddleware');
const orderController = require('./order.controller');

// create order (logged in users)
router.post('/', protect, orderController.createOrder);

// get specific order (owner or admin)
router.get('/:id', protect, orderController.getOrderById);

// get current user's orders
router.get('/myorders', protect, orderController.getMyOrders);

// admin can view all orders
router.get('/', protect, admin, orderController.getOrders);

module.exports = router;
