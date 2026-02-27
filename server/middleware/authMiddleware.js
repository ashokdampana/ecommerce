const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");


const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new AppError("Not authorized", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
});

module.exports = protect
