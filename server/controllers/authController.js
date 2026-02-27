// Placeholder authentication controller
const asyncHandler = require('express-async-handler');
const User = require('../models/User.js');
const AppError = require('../utils/AppError.js');
const jwt = require('jsonwebtoken');


exports.registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User Already Exists", 400);
  }
  // create new user
  const newUser = new User({ name, email, password, isAdmin: false });
  await newUser.save();
  if (!newUser) {
    throw new AppError("Something went wrong. Please try again later", 400);
  }
  res.status(201).json({ success: true, message: "User registered" });
});


exports.loginUser = asyncHandler(async (req, res) => {
  // TODO: implement login logic
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
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

exports.check_me = asyncHandler(async(req, res) => {
  const userInfo = req.user;
  // console.log('userInfo from check_me : ', userInfo);
  return res.json({message: 'Userinfo', user : userInfo})
})