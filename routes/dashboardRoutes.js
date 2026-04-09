const router = require('express').Router();
const { getFarmerDashboard, getBuyerDashboard, getAdminDashboard } = require('../controllers/dashboardController');
const { protect, authorize } = require('../middleware/auth');

router.get('/farmer', protect, authorize('farmer'),        getFarmerDashboard);
router.get('/buyer',  protect, authorize('buyer'),         getBuyerDashboard);
router.get('/admin',  protect, authorize('admin'),         getAdminDashboard);

module.exports = router;