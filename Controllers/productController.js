const Product = require('../models/Product');

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ results: products.length, data: { products } });
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({ data: { product: newProduct } });
    } catch (err) {
        res.status(400).json({ message: 'Invalid data sent' });
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