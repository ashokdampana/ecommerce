const asyncHandler = require('express-async-handler');
const AppError = require('../utils/AppError');

const admin = asyncHandler((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    throw new AppError('Admin privileges required', 403);
  }
  next();
});

module.exports = admin;
