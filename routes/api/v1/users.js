const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/userController');
const authenticate = require('../../../middlewares/authenticate');
const { createUserLimiter } = require('../../../middlewares/rateLimiters');

// POST new user (rate limited)
router.post('/', /*createUserLimiter,*/ userController.createUser);

// GET all users
router.get('/', userController.getAllUsers);

// DELETE user (admin only)
router.delete('/:userId', authenticate, userController.deleteUser);

// PUT/PATCH user password
router.patch('/password', authenticate, userController.updatePassword);
router.put('/password', authenticate, userController.updatePassword);

// PUT/PATCH user details
router.patch('/info', authenticate, userController.updateUser);
router.put('/info', authenticate, userController.updateUser);

// GET user details
router.get('/profile', authenticate, userController.getUser);

module.exports = router;
