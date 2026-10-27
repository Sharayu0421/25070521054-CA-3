const Product = require('../models/Product');

// @desc    Fetch all products with search, filter, sort & pagination
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.max(1, parseInt(req.query.limit) || 12);
    const skip = (page - 1) * limit;

    const query = {};

    // 1. Search by Keyword (Name, Brand, Description)
    if (req.query.keyword) {
      const keywordRegex = { $regex: req.query.keyword.trim(), $options: 'i' };
      query.$or = [
        { name: keywordRegex },
        { brand: keywordRegex },
        { description: keywordRegex },
      ];
    }

    // 2. Filter by Category
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }

    // 3. Filter by Brand
    if (req.query.brand && req.query.brand !== 'All') {
      query.brand = req.query.brand;
    }

    // 4. Filter by Offers / Discounts
    if (req.query.offers === 'true' || req.query.offers === true) {
      query.$or = [
        { isOffer: true },
        { discountPercentage: { $gt: 0 } },
      ];
    }

    // 5. Filter by Featured
    if (req.query.featured === 'true' || req.query.featured === true) {
      query.isFeatured = true;
    }

    // 6. Price Range
    if (req.query.minPrice || req.query.maxPrice) {
      query.price = {};
      if (req.query.minPrice) query.price.$gte = Number(req.query.minPrice);
      if (req.query.maxPrice) query.price.$lte = Number(req.query.maxPrice);
    }

    // 7. Rating filter
    if (req.query.minRating) {
      query.rating = { $gte: Number(req.query.minRating) };
    }

    // 8. Sorting
    let sortOptions = { createdAt: -1 }; // default: newest
    if (req.query.sortBy === 'price-asc') {
      sortOptions = { price: 1 };
    } else if (req.query.sortBy === 'price-desc') {
      sortOptions = { price: -1 };
    } else if (req.query.sortBy === 'rating') {
      sortOptions = { rating: -1, numReviews: -1 };
    } else if (req.query.sortBy === 'discount') {
      sortOptions = { discountPercentage: -1 };
    }

    const totalProducts = await Product.countDocuments(query);
    const products = await Product.find(query)
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);

    res.json({
      success: true,
      count: products.length,
      total: totalProducts,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page,
      products,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Fetch single product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found.',
      });
    }

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all distinct categories and brands for filtering
// @route   GET /api/products/meta/filters
// @access  Public
const getProductFilters = async (req, res, next) => {
  try {
    const categories = await Product.distinct('category');
    const brands = await Product.distinct('brand');
    const maxPriceProduct = await Product.findOne().sort({ price: -1 });

    res.json({
      success: true,
      categories,
      brands,
      maxPrice: maxPriceProduct ? maxPriceProduct.price : 2000,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create new product (Admin)
// @route   POST /api/products
// @access  Private/Admin
const createProduct = async (req, res, next) => {
  try {
    const {
      name,
      price,
      originalPrice,
      discountPercentage,
      description,
      image,
      category,
      brand,
      countInStock,
      isFeatured,
      isOffer,
      specs,
      features,
    } = req.body;

    const product = new Product({
      name,
      price,
      originalPrice: originalPrice || price,
      discountPercentage: discountPercentage || 0,
      description,
      image,
      category,
      brand,
      countInStock: countInStock || 10,
      isFeatured: Boolean(isFeatured),
      isOffer: Boolean(isOffer),
      specs: specs || [],
      features: features || [],
    });

    const createdProduct = await product.save();
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: createdProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    Object.assign(product, req.body);
    const updatedProduct = await product.save();

    res.json({
      success: true,
      message: 'Product updated successfully',
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getProducts,
  getProductById,
  getProductFilters,
  createProduct,
  updateProduct,
  deleteProduct,
};
