const asyncHandler = require('express-async-handler');
const sendError = require('../../utils/sendError.js');
const userService = require('../user/user.service.js');
const tokenHelper = require('../../utils/tokenHelper.js');
const sendResponse = require('../../utils/sendResponse.js');


// Register a new user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  // check if user exists
  const userExist = await userService.findUserByEmail(email);
  if (userExist) {
    throw new sendError("User already exists", 400);
  }

  // create new user
  const newUser = await userService.createUser({name, email, password});
  if (!newUser) {
    throw new sendError("Something went wrong. Please try again later", 500);
  }

  // generate token
  const token = tokenHelper.generateAccessToken(newUser);

  // user details to client

  sendResponse(res, "User Registered Successfully", 201, { 
    name: newUser.name, 
    email: newUser.email, 
    role: newUser.role, 
    token 
  }, "user");
});


// Login user
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // check if user exists
  const user = await userService.findUserByEmail(email, { includePassword: true });
  if (!user) {
    throw new sendError("Invalid credentials", 400);
  }

  // verify password - check user schema matchPassword()
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    throw new sendError("Invalid credentials", 400);
  }

  // generate token
  const token = tokenHelper.generateAccessToken(user);

  sendResponse(res, "User Login Successfully", 200, { 
    name: user.name, 
    email: user.email, 
    role: user.role, 
    token 
  }, "user");
});


// Get current user info
const check_me = asyncHandler(async (req, res) => {
  const user = await userService.findUserById(req.user.id);
  if (!user) {
    throw new sendError("User not found", 404);
  }
  return sendResponse(res, "User details", 200, user, "user");
});


module.exports = {
  registerUser,
  loginUser,
  check_me
};
