const express = require('express');
const router = express.Router();
const userController = require('../../../controllers/api/v1/userController');

router.post('/', userController.createUser);
router.get('/', userController.getAllUsers);

module.exports = router;
