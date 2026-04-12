const Order = require('./order.model');

const createOrder = (userId, orderItems, totalPrice) => {
  return Order.create({
    user: userId,
    orderItems,
    totalPrice,
  });
};

const getOrderById = (orderId) => {
  return Order.findById(orderId).populate('user', 'name email');
};

const getOrdersByUser = (userId) => {
  return Order.find({ user: userId });
};

const getAllOrders = () => {
  return Order.find().populate('user', 'name email');
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersByUser,
  getAllOrders,
};
