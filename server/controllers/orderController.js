// Order controller with full CRUD logic
const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const AppError = require('../utils/AppError');

// create an order for authenticated user
exports.createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new AppError('No order items provided', 400);
  }

  const items = orderItems.map((item) => ({
    name: item.name,
    qty: item.qty,
    image: item.image,
    price: item.price,
    product: item.product,
  }));

  const order = await Order.create({
    user: req.user.id || req.user._id,
    orderItems: items,
    totalPrice: totalPrice || items.reduce((sum, i) => sum + i.price * i.qty, 0),
  });

  res.status(201).json({ success: true, order });
});

// get order by id, only owner or admin
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    throw new AppError('Order not found', 404);
  }

  const isOwner = order.user._id.toString() === (req.user.id || req.user._id).toString();
  if (!isOwner && !req.user.isAdmin) {
    throw new AppError('Not authorized to view this order', 403);
  }

  res.json({ success: true, order });
});

// get orders for the current user
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id || req.user._id });
  res.json({ success: true, orders });
});

// admin only: list all orders
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email');
  res.json({ success: true, orders });
});

