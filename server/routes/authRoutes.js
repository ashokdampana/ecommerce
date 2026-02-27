const express = require('express');
const router = express.Router();
const { registerUser, loginUser, check_me } = require('../controllers/authController');
const { registerValid, loginValid } = require('../validations/validate');
const protect = require('../middleware/authMiddleware');

router.post('/register', registerValid, registerUser);
router.post('/login', loginValid, loginUser);
router.get('/check_me', protect, check_me);

module.exports = router;
