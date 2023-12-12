const express = require('express');
const router = express.Router();
const authController = require('../../../controllers/api/v1/authController');

// handle user login
router.post('/login', authController.login);

// handle user logout
router.post('/logout', authController.logout);

module.exports = router;
