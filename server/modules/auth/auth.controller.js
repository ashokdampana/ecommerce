// Placeholder authentication controller
const asyncHandler = require('express-async-handler');
const User = require('../user/user.model.js');
const AppError = require('../../utils/AppError.js');
const jwt = require('jsonwebtoken');
const userService = require('../user/user.service.js')

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // check if user exists
  const existingUser = await userService.findUserByEmail(email);
  if (existingUser) {
    throw new AppError("User Already Exists", 400);
  }
  // create new user
  const newUser = new User({ name, email, password, isAdmin: false });
  await newUser.save();
  if (!newUser) {
    throw new AppError("Something went wrong. Please try again later", 400);
  }

  // generate token and return same shape as login (simplifies frontend flow)
  const userDetails = { name: newUser.name, email: newUser.email, isAdmin: newUser.isAdmin };
  const token = jwt.sign(userDetails, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.status(201).json({ success: true, message: "User registered", user: userDetails, token });
});


const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await userService.findUserByEmail(email, {
    includePassword: true
  })
  if ( !user) {
    throw new AppError('Invalid Credentials', 400);
  }
  const isMatch = await user.matchPassword(password);
  if ( !isMatch ) {
    throw new AppError('Invalid Credentials', 400);
  }

  const userDetails = { name: user.name, email: user.email, isAdmin: user.isAdmin}
  const token = jwt.sign(userDetails, process.env.JWT_SECRET, {expiresIn: '1h'})
  if ( !token) {
    throw new AppError('Something went wrong. Please try again later', 400)
  }

  res.json({ success: true, message: 'User Logged In', token , user: userDetails});
})


const check_me = asyncHandler(async(req, res) => {
  const userInfo = req.user;
  return res.json({message: 'Userinfo', user : userInfo})
})

module.exports = {
  registerUser, loginUser, check_me
}