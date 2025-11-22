const Product = require('../models/Product');
const mongoose = require('mongoose');

// @desc    Get all products with filtering, sorting, and pagination
// @route   GET /api/products
const getProducts = async (req, res) => {
    try {
        const { search, category, sortBy, order = 'asc' } = req.query;

        let query = {};

        if (search) {
            query.name = { $regex: search, $options: 'i' };
        }

        if (category && category !== 'All') {
            query.category = category;
        }

        let sortOption = {};
        if (sortBy) {
            sortOption[sortBy] = order === 'desc' ? -1 : 1;
        } else {
            sortOption.createdAt = -1; // Default sort
        }

        const products = await Product.find(query).sort(sortOption);
        
        res.status(200).json({ success: true, count: products.length, data: products });

    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Create a new product
// @route   POST /api/products
const createProduct = async (req, res) => {
    try {
        const { name, price, category, imageUrl, inStock } = req.body;

        const product = await Product.create({
            name,
            price,
            category,
            imageUrl,
            inStock,
        });

        res.status(201).json({ success: true, data: product });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(' ') });
        }
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Update a product
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        const product = await Product.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, data: product });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(' ') });
        }
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};

// @desc    Delete a product
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: 'Invalid product ID' });
        }

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ success: false, message: 'Product not found' });
        }

        res.status(200).json({ success: true, message: 'Product removed' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server Error', error: error.message });
    }
};


module.exports = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
};
