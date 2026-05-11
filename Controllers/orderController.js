const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { sendSMS } = require('../utils/sms');

exports.placeOrder = async (req, res) => {
    try {
        const { cart, upiId } = req.body;
        if (!cart || cart.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // Pre-check for stock availability
        for (const item of cart) {
            const product = await Product.findById(item._id);
            if (!product) {
                return res.status(404).json({ message: `Product ${item.name} not found` });
            }
            if (product.quantity < item.cartQty) {
                return res.status(400).json({ message: `Not enough stock for ${item.name}. Available: ${product.quantity}` });
            }
        }

        const createdOrders = [];
        let cartSummary = "";

        for (const item of cart) {
            const farmerId = item.farmer._id ? item.farmer._id : item.farmer;
            const farmer = await User.findById(farmerId);
            
            // Deduct from stock and increment salesCount
            const product = await Product.findById(item._id);
            product.quantity -= item.cartQty;
            product.salesCount = (product.salesCount || 0) + item.cartQty;
            await product.save();

            const newOrder = await Order.create({
                buyer: req.user._id,
                farmer: farmerId,
                product: item._id,
                quantity: item.cartQty,
                pricePerUnit: item.price,
                totalAmount: item.cartQty * item.price,
                payment: {
                    method: 'UPI',
                    status: 'Paid',
                    razorpayOrderId: upiId
                }
            });
            createdOrders.push(newOrder);
            cartSummary += `${item.cartQty}x ${item.name}, `;

            // Notify Individual Farmer (Real SMS)
            if (farmer && farmer.phone) {
                sendSMS(farmer.phone, process.env.MSG91_TEMPLATE_ID_FARMER || 'default_farmer_tpl', {
                    farmer_name: farmer.name,
                    product_name: item.name,
                    quantity: item.cartQty,
                    buyer_name: req.user.name
                });
            }
        }

        // Single SMS to Buyer (Real SMS)
        sendSMS(req.user.phone, process.env.MSG91_TEMPLATE_ID_BUYER || 'default_buyer_tpl', {
            buyer_name: req.user.name,
            order_summary: cartSummary.slice(0, -2),
            order_total: createdOrders.reduce((sum, o) => sum + o.totalAmount, 0)
        });

        res.status(201).json({ status: 'success', data: { orders: createdOrders } });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({ buyer: req.user._id }).populate('product').populate('farmer', 'name phone');
        res.status(200).json({ success: true, results: orders.length, data: { orders } });
    } catch (err) {
        res.status(404).json({ success: false, message: 'No orders found' });
    }
};

exports.getIncomingOrders = async (req, res) => {
    try {
        const orders = await Order.find({ farmer: req.user._id }).populate('product').populate('buyer', 'name phone');
        res.status(200).json({ success: true, results: orders.length, data: { orders } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.updateStatus = async (req, res) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, order });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.getOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id).populate('product').populate('buyer').populate('farmer');
        if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
        res.json({ success: true, data: { order } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

exports.rateOrder = async (req, res) => {
    try {
        const { score, review } = req.body;
        const order = await Order.findByIdAndUpdate(req.params.id, { 
            rating: { score, review, ratedAt: new Date() } 
        }, { new: true });
        res.json({ success: true, data: { order } });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};