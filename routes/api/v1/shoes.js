const express = require('express');
const router = express.Router();
const shoeController = require('../../../controllers/api/v1/shoeController');

// GET all shoe orders
router.get('/', shoeController.getShoeOrders);

// POST a new shoe order
router.post('/', shoeController.createShoeOrder);

// GET a shoe order by id
router.get('/:id', shoeController.getShoeById);

// DELETE a shoe order by id (admin access required)
router.delete('/:id', shoeController.deleteShoeOrder);

module.exports = router;
