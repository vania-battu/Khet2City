const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
    try {
        // req.user.id comes from your auth middleware
        const newOrder = await Order.create({
            user: req.user.id,
            items: req.body.items,
            totalPrice: req.body.totalPrice
        });

        res.status(201).json({ status: 'success', data: { order: newOrder } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user.id });
        res.status(200).json({ results: orders.length, data: { orders } });
    } catch (err) {
        res.status(404).json({ message: 'No orders found' });
    }
};