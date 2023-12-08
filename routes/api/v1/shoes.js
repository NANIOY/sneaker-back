const express = require('express');
const router = express.Router();
const shoeController = require('../../../controllers/api/v1/shoeController');

router.post('/', shoeController.addShoeOrder);
router.delete('/:id', shoeController.deleteShoeOrder);
router.put('/:id', shoeController.updateShoeOrder);
router.get('/:id', shoeController.getShoeDetails);
router.get('/', shoeController.getAllShoeOrders);

module.exports = router;
