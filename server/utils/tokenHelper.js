const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
  const payload = { id: user._id, role: user.role };

  return jwt.sign(payload, process.env.JWT_ACCESS_KEY, {
    expiresIn: "15m",
    issuer: "mern-ecommerce"
  });
}


const generateRefreshToken = (user) => {
  const payload = { id: user._id, role: user.role };

  return jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
    expiresIn: "7d",
    issuer: "mern-ecommerce"
  });
}


const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_ACCESS_KEY);
}

module.exports = { 
  generateAccessToken, verifyToken
};