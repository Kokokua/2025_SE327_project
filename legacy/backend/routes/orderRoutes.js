const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Create new order
router.post('/', orderController.createOrder);

// delete order 
router.delete('/:orderId', orderController.deleteOrder);

router.get('/stats', orderController.getOrderStats);
router.get('/report/stats', orderController.getReportStats);
router.get('/:userId', orderController.getUserOrders);
router.get('/', orderController.getAllOrders);

module.exports = router;