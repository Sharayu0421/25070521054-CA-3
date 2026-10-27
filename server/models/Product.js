const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
      trim: true,
      maxlength: [150, 'Product name cannot exceed 150 characters'],
    },
    slug: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide product price'],
      min: [0, 'Price must be positive'],
    },
    originalPrice: {
      type: Number,
      default: 0,
    },
    discountPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    category: {
      type: String,
      required: [true, 'Please select a category'],
      enum: [
        'Smartphones',
        'Laptops',
        'Headphones',
        'Accessories',
        'Smartwatches',
        'Audio',
        'Gaming',
      ],
    },
    brand: {
      type: String,
      required: [true, 'Please provide product brand'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Please provide a primary product image URL'],
    },
    images: {
      type: [String],
      default: [],
    },
    countInStock: {
      type: Number,
      required: [true, 'Please specify stock quantity'],
      min: [0, 'Stock cannot be negative'],
      default: 15,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isOffer: {
      type: Boolean,
      default: false,
    },
    specs: [
      {
        key: { type: String, required: true },
        value: { type: String, required: true },
      },
    ],
    features: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Create text index for search
productSchema.index({ name: 'text', description: 'text', brand: 'text' });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
