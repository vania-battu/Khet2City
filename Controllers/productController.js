const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('farmer');
        res.status(200).json({ results: products.length, data: products });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        req.body.farmer = req.user._id;
        const newProduct = await Product.create(req.body);
        res.status(201).json({ data: newProduct });
    } catch (err) {
        console.error('Create Product Error:', err);
        res.status(400).json({ message: 'Invalid data sent', error: err.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({ data: { product } });
    } catch (err) {
        res.status(404).json({ message: 'Product not found' });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        let product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });
        
        // Ensure farmer owns product
        if (product.farmer.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to edit this product' });
        }
        
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        res.status(200).json({ success: true, data: product });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Invalid edit data' });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: 'Product not found' });

        if (product.farmer.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            return res.status(401).json({ message: 'Not authorized to delete this product' });
        }

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } catch (err) {
        res.status(400).json({ success: false, message: 'Failed to delete' });
    }
};