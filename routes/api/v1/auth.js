const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/api/v1/authController');
const { loginLimiter } = require('../../../middlewares/rateLimiters');

// handle user login (rate limited)
router.post('/login', loginLimiter, authController.login);

// handle user logout
router.post('/logout', authController.logout);

module.exports = router;