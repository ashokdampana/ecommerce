const express = require('express');
const router = express.Router();
const authController = require('./auth.controller');
const authValidation = require('./auth.validation');
const protect = require('../../middleware/authMiddleware');

router.post('/register', authValidation.registerValid, authController.registerUser);
router.post('/login', authValidation.loginValid, authController.loginUser);
router.post('/refresh', protect, authController.refreshToken);
router.post('/logout', protect, authController.logoutUser);
router.get('/check_me', protect, authController.checkMe);

module.exports = router;
