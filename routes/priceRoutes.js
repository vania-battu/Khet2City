const router = require('express').Router();
const { getCropPrices } = require('../controllers/priceController');

router.get('/', getCropPrices);

module.exports = router;