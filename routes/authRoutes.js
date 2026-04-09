const router = require('express').Router();
const {
  register, login, getMe, updateProfile, changePassword, logout,
  sendOtp, verifyOtp, forgotPassword, resetPassword
} = require('../controllers/authController');
const { protect } = require('../middleware/auth');

router.post('/register',              register);
router.post('/login',                 login);
router.post('/logout',                protect, logout);
router.get('/me',                     protect, getMe);
router.put('/update',                 protect, updateProfile);
router.put('/change-password',        protect, changePassword);
router.post('/send-otp',              sendOtp);
router.post('/verify-otp',            verifyOtp);
router.post('/forgot-password',       forgotPassword);
router.put('/reset-password/:token',  resetPassword);

module.exports = router;