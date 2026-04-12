const asyncHandler = require('express-async-handler');
const sendError = require('../utils/sendError');

const admin = asyncHandler((req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    throw new sendError('Admin privileges required', 403);
  }
  next();
});

module.exports = admin;
