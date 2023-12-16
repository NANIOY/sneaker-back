const express = require('express');
const router = express.Router();
const shoeController = require('../../../controllers/api/v1/shoeController');
const authenticate = require('../../../middlewares/authenticate');
const { createShoeLimiter } = require('../../../middlewares/rateLimiters');

// GET all shoe orders
router.get('/', shoeController.getShoeOrders);

// POST a new shoe order (rate limited)
router.post('/', /*createShoeLimiter,*/ shoeController.createShoeOrder);

// GET a shoe order by id
router.get('/:id', shoeController.getShoeById);

// DELETE a shoe order by id (admin access required)
router.delete('/:id', authenticate, shoeController.deleteShoeOrder);

// PUT/PATCH a shoe order by id (admin access required)
router.put('/:id', /*authenticate,*/ shoeController.updateShoeOrder);
router.patch('/:id', /*authenticate,*/ shoeController.updateShoeOrder);

module.exports = router;
