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

// update user password
router.patch('/password', authenticate, userController.updatePassword);
router.put('/password', authenticate, userController.updatePassword);

// update user details
router.patch('/info', authenticate, userController.updateUser);
router.put('/info', authenticate, userController.updateUser);

module.exports = router;
