const express = require('express');
const router = express.Router();
const shoeController = require('../../../controllers/api/v1/shoeController');

router.get('/', shoeController.getShoeOrders);

module.exports = router;