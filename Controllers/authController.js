const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });
};

// ================= AUTH =================

// Register
exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = signToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user
        });
    } catch (err) {
        console.error(err);
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = signToken(user._id);

        res.status(200).json({
            success: true,
            token,
            user
        });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Logout (simple version)
exports.logout = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Logged out successfully'
    });
};

// ================= USER =================

// Get current user
exports.getMe = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Update profile
exports.updateProfile = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.user._id, req.body, {
            new: true,
            runValidators: true
        });

        res.status(200).json({ status: 'success', data: user });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

// Change password (basic version)
exports.changePassword = async (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Change password feature (implement logic here)'
    });
};

// ================= OTP / PASSWORD =================

// Send OTP
exports.sendOtp = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'OTP sent (mock)'
    });
};

// Verify OTP
exports.verifyOtp = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'OTP verified (mock)'
    });
};

// Forgot password
exports.forgotPassword = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Password reset link sent (mock)'
    });
};

// Reset password
exports.resetPassword = (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Password reset successful (mock)'
    });
};