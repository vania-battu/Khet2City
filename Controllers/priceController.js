const Product = require('../models/Product');

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