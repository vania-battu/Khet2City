const User = require('../models/User');
const jwt = require('jsonwebtoken');

const signToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '24h' });

exports.register = async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = signToken(user._id);
        res.status(201).json({ status: 'success', token, data: { user } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        
        if (!user || !(await user.correctPassword(password, user.password))) {
            return res.status(401).json({ message: 'Incorrect email or password' });
        }

        const token = signToken(user._id);
        res.status(200).json({ status: 'success', token });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};