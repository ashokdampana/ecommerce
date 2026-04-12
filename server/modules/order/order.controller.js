// Order controller with full CRUD logic
const asyncHandler = require('express-async-handler');
const sendError = require('../../utils/sendError');
const orderService = require('./order.service');

// create an order for authenticated user
exports.createOrder = asyncHandler(async (req, res) => {
  const { orderItems, totalPrice } = req.body;

  if (!orderItems || orderItems.length === 0) {
    throw new sendError('No order items provided', 400);
  }

  const items = orderItems.map((item) => ({
    name: item.name,
    qty: item.qty,
    image: item.image,
    price: item.price,
    product: item.product,
  }));

  const order = await orderService.createOrder(
    req.user.id || req.user._id,
    items,
    totalPrice || items.reduce((sum, i) => sum + i.price * i.qty, 0)
  );

  res.status(201).json({ success: true, order });
});

// get order by id, only owner or admin
exports.getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  if (!order) {
    throw new sendError('Order not found', 404);
  }

  const isOwner = order.user._id.toString() === (req.user.id || req.user._id).toString();
  if (!isOwner && !req.user.isAdmin) {
    throw new sendError('Not authorized to view this order', 403);
  }

  res.json({ success: true, order });
});

// get orders for the current user
exports.getMyOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getOrdersByUser(req.user.id || req.user._id);
  res.json({ success: true, orders });
});

// admin only: list all orders
exports.getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json({ success: true, orders });
});

