const router = require('express').Router();
const { createPaymentOrder, verifyPayment } = require('../controllers/paymentController');
const { protect, authorize } = require('../middleware/auth');

router.post('/create-order', protect, authorize('buyer'), createPaymentOrder);
router.post('/verify',       protect, authorize('buyer'), verifyPayment);

module.exports = router;
