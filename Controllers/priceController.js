const Product = require('../models/Product');

// Adding getCropPrices to fulfill the route requirement and mock Agmarknet data
exports.getCropPrices = async (req, res) => {
    try {
        const mockPrices = [
            { commodity: "Wheat", price: 2150, change: "+1.2%", status: "up" },
            { commodity: "Rice", price: 3200, change: "-0.5%", status: "down" },
            { commodity: "Tomato", price: 1500, change: "+5.0%", status: "up" },
            { commodity: "Onion", price: 1800, change: "+2.1%", status: "up" },
            { commodity: "Potato", price: 1200, change: "-1.0%", status: "down" }
        ];
        res.status(200).json({ status: 'success', data: mockPrices });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching prices', error: error.message });
    }
};

exports.calculateBulkPrice = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const product = await Product.findById(productId);

        if (!product) return res.status(404).json({ message: 'Product not found' });

        let finalPrice = product.price * quantity;

        // Example Logic: 10% discount for more than 10 items
        if (quantity >= 10) {
            finalPrice *= 0.9;
        }

        res.status(200).json({
            status: 'success',
            data: {
                originalPrice: product.price,
                quantity,
                totalAmount: finalPrice.toFixed(2)
            }
        });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};