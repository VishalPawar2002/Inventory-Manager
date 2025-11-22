const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter product name'],
    trim: true,
  },
  price: {
    type: Number,
    required: [true, 'Please enter product price'],
    min: [0, 'Price must be a positive number'],
  },
  category: {
    type: String,
    required: [true, 'Please enter product category'],
    trim: true,
  },
  imageUrl: {
    type: String,
    required: [true, 'Please enter product image URL'],
    match: [/^https?:\/\/.+\..+/, 'Please enter a valid URL']
  },
  inStock: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);
