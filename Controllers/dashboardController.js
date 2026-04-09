const Product = require('../models/Product');
const Order = require('../models/Order');
const User = require('../models/User');

exports.getFarmerDashboard = async (req, res) => {
    try {
        // 1. Get total stock listed by this farmer
        const totalStock = await Product.aggregate([
            { $match: { farmer: req.user.id } },
            { $group: { _id: null, total: { $sum: "$quantity" } } }
        ]);

        // 2. Get recent SMS-triggered updates (Sorted by date)
        const recentUpdates = await Product.find({ farmer: req.user.id })
            .sort('-updatedAt')
            .limit(5);

        // 3. Get latest Market Prices (Simulating Agmarknet data)
        const marketTrends = {
            Rice: "₹2400/quintal",
            Wheat: "₹2100/quintal",
            Cotton: "₹7200/quintal",
            status: "Rising"
        };

        res.status(200).json({
            status: 'success',
            data: {
                summary: totalStock[0] || { total: 0 },
                inventory: recentUpdates,
                marketTrends
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getBuyerDashboard = async (req, res) => {
    try {
        // Find fresh arrivals from nearby farmers
        const freshArrivals = await Product.find().sort('-createdAt').limit(6);
        
        res.status(200).json({
            status: 'success',
            data: { freshArrivals }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};