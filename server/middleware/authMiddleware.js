const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const sendError = require("../utils/sendError");


const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new sendError("Not authorized", 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
  req.user = decoded;
  next();
});

module.exports = protect
