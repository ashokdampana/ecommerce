const asyncHandler = require('express-async-handler');
const SendError = require('../../utils/sendError.js');
const userService = require('../user/user.service.js');
const tokenHelper = require('../../utils/tokenHelper.js');
const sendResponse = require('../../utils/sendResponse.js');
const emailService = require('../email/email.service.js');


// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await userService.findUserByEmail(email);
  if (userExist) {
    throw new SendError("User already exists", 400);
  }

  const newUser = await userService.createUser({ name, email, password });
  if (!newUser) {
    throw new SendError("Something went wrong. Please try again later", 500);
  }

  // send email verification if not verified
  if (!newUser.isEmailVerified) {
    await emailService.sendVerifyEmail(newUser);
  }

  sendResponse(res, "User Registered Successfully", 201);
});


// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await userService.findUserByEmail(email, { includePassword: true });
  if (!user) {
    throw new SendError("Invalid credentials", 400);
  }

  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new SendError("Invalid credentials", 400);
  }

  // Generate tokens
  const accessToken = tokenHelper.generateAccessToken(user);
  const { refreshToken, cookieOptions } = tokenHelper.generateRefreshToken(user);

  // Save new refresh token in DB
  user.refreshToken = refreshToken;
  await user.save();

  // send email verification if not verified
  if (!user.isEmailVerified) {
    await emailService.sendVerifyEmail(user);
  }

  // Clear old refreshToken cookie if exists
  res.clearCookie('refreshToken');

  // Set new refresh token in cookie
  res.cookie('refreshToken', refreshToken, cookieOptions);



  sendResponse(res, "User Login Successfully", 200, {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    accessToken,
  }, "user");
});


// Get current user info
const checkMe = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.user.id);
  if (!user) {
    throw new SendError("User not found", 404);
  }
  return sendResponse(res, "User details", 200, user, "user");
});


// Refresh token
const refreshTokenHandler = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;

  if (!oldRefreshToken) {
    throw new SendError("No refresh token provided", 401);
  }

  const user = await userService.findUserByRefreshToken(oldRefreshToken);
  if (!user) {
    throw new SendError("Invalid refresh token", 401);
  }

  let payload;
  try {
    payload = tokenHelper.verifyRefreshToken(oldRefreshToken);
  } catch {
    throw new SendError("Invalid or expired refresh token", 401);
  }

  if (payload.id !== user._id.toString()) {
    throw new SendError("Token mismatch", 401);
  }

  // 🔥 ROTATION
  const newAccessToken = tokenHelper.generateAccessToken(user);
  const { refreshToken, cookieOptions } = tokenHelper.generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save();

  res.cookie('refreshToken', refreshToken, cookieOptions);

  return sendResponse(res, "Token refreshed", 200, {
    accessToken: newAccessToken
  });
});


// Logout user
const logoutUser = asyncHandler(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;

  if (oldRefreshToken) {
    const user = await userService.findUserByRefreshToken(oldRefreshToken);
    if (user) {
      user.refreshToken = null;
      await user.save();
    }
  }

  res.clearCookie('refreshToken');
  return sendResponse(res, "User logged out successfully", 200);
});

module.exports = {
  registerUser,
  loginUser,
  checkMe,
  refreshToken: refreshTokenHandler,
  logoutUser,
}
