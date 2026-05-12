const jwt = require('jsonwebtoken');

// Email purpose
const generateEmailToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_EMAIL_TOKEN_SECRET, { expiresIn: '15m' });
};

// Authentication purpose
const generateAccessToken = (user) => {
  console.log("Generating Access Token");
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_ACCESS_TOKEN_SECRET,
    { expiresIn: '15m' }
  );
};

// Refresh token purpose
const generateRefreshToken = (user) => {
  const refreshToken = jwt.sign(
    { id: user._id },
    process.env.JWT_REFRESH_TOKEN_SECRET,
    { expiresIn: '7d' }
  );

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // true in prod
    sameSite: 'strict',
    path: '/api/auth/refresh-token',
  };

  return { refreshToken, cookieOptions };
};

const verifyEmailToken = (token) => {
  return jwt.verify(token, process.env.JWT_EMAIL_TOKEN_SECRET);
}

const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.JWT_REFRESH_TOKEN_SECRET);
};

module.exports = {
  generateEmailToken,
  generateAccessToken,
  generateRefreshToken,
  verifyEmailToken,
  verifyRefreshToken,
};