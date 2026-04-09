const router = require('express').Router();
const {
  placeOrder, getMyOrders, getIncomingOrders,
  getOrder, updateStatus, rateOrder,
} = require('../controllers/orderController');
const { protect, authorize } = require('../middleware/auth');

router.post('/',               protect, authorize('buyer'),           placeOrder);
router.get('/my',              protect, authorize('buyer'),           getMyOrders);
router.get('/incoming',        protect, authorize('farmer'),          getIncomingOrders);
router.get('/:id',             protect,                               getOrder);
router.patch('/:id/status',    protect, authorize('farmer','admin'),  updateStatus);
router.post('/:id/rate',       protect, authorize('buyer'),           rateOrder);

module.exports = router;
