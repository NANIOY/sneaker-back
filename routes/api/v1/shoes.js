const express = require('express');
const router = express.Router();
const shoeController = require('../../../controllers/api/v1/shoeController');

router.get('/', shoeController.getShoeOrders);
router.post('/', shoeController.createShoeOrder);

module.exports = router;