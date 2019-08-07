const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/check-auth');

const ordersController = require('../controllers/orders');

router.get('/', checkAuth, ordersController.get_all_orders);

router.post('/', checkAuth, ordersController.create_order);

router.get('/:id', checkAuth, ordersController.get_order_by_id);

router.delete('/:id', checkAuth, ordersController.delete_order);

module.exports = router;