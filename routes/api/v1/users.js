const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/userController');
const authenticate = require('../../../middlewares/authenticate');

// create new user
router.post('/', userController.createUser);

// get all users
router.get('/', userController.getAllUsers);

// delete user (admin only)
router.delete('/:userId', authenticate, userController.deleteUser);

module.exports = router;
