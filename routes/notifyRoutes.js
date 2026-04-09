const router = require('express').Router();
const { sendPush, sendSms, priceAlert } = require('../controllers/notifyController');
const { protect } = require('../middleware/auth');

router.post('/push',         protect, sendPush);
router.post('/sms',          protect, sendSms);
router.post('/price-alert',  protect, priceAlert);

module.exports = router;