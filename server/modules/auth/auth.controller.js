const asyncHandler = require('express-async-handler');
const AppError = require('../../utils/AppError.js');
const userService = require('../user/user.service.js');
const tokenHelper = require('../../utils/tokenHelper.js');
const sendResponse = require('../../utils/sendResponse.js');


// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exists
  const userExist = await userService.findUserByEmail(email);
  if (userExist) {
    throw new AppError("User already exists", 400);
  }

  // create new user
  const newUser = await userService.createUser(name, email, password);
  if (!newUser) {
    throw new AppError("Something went wrong. Please try again later", 500);
  }

  // generate token
  const token = tokenHelper.generateAccessToken(newUser);

  // user details to client
  const userDetails = {
    id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role
  };

  return sendResponse(res, "User registered successfully", 201, { userDetails, token }, "user");
});


// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await userService.findUserByEmail(email, { includePassword: true });
  if (!user) {
    throw new AppError("Invalid credentials", 400);
  }

  // verify password
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new AppError("Invalid credentials", 400);
  }

  // generate token
  const token = tokenHelper.generateAccessToken(user);

  const userDetails = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role
  };

  return sendResponse(res, "User login successful", 200, { userDetails, token }, "user");
});


// Get current user info
const check_me = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.user.id);
  if (!user) {
    throw new AppError("User not found", 404);
  }
  return sendResponse(res, "User details", 200, user, "user");
});


module.exports = {
  registerUser,
  loginUser,
  check_me
};
