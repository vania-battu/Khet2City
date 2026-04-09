const router = require('express').Router();
const { getWeather, getForecast } = require('../controllers/weatherController');

router.get('/',         getWeather);
router.get('/forecast', getForecast);

module.exports = router;
