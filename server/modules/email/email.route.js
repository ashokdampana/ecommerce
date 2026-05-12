const express = require('express');
const router = express.Router();
const emailService = require('./email.service.js');

router.get('/email-verify', emailService.verifyEmail);

module.exports = router;
