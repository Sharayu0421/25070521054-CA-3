const Order = require('../models/Order');
const Product = require('../models/Product');

// Helper to generate unique human-readable Order ID: TC-2026-XXXXXX
const generateOrderId = () => {
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  return `TC-${new Date().getFullYear()}-${randomNum}`;
};

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res, next) => {
  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No order items found in checkout request.',
      });
    }

    if (!shippingAddress || !shippingAddress.fullName || !shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode || !shippingAddress.phone) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required shipping address fields (Full Name, Address, City, Postal Code, Phone).',
      });
    }

    // SERVER-SIDE VALIDATION of product prices, stock, and item names
    let verifiedItems = [];
    let calculatedItemsPrice = 0;

    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product with ID ${item.product} could not be found.`,
        });
      }

      if (product.countInStock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for "${product.name}". Only ${product.countInStock} available.`,
        });
      }

      const verifiedPrice = product.price;
      calculatedItemsPrice += verifiedPrice * item.quantity;

      verifiedItems.push({
        product: product._id,
        name: product.name,
        image: product.image,
        price: verifiedPrice,
        quantity: item.quantity,
      });

      // Decrement stock
      product.countInStock -= item.quantity;
      await product.save();
    }

    // Standard business logic:
    // Free shipping if subtotal >= $100 / ₹1000, else $10 / ₹99
    const shippingPrice = calculatedItemsPrice >= 100 ? 0 : 10;
    // Standard 5% tax
    const taxPrice = Number((0.05 * calculatedItemsPrice).toFixed(2));
    const totalPrice = Number((calculatedItemsPrice + shippingPrice + taxPrice).toFixed(2));

    let uniqueId = generateOrderId();
    // Ensure uniqueness
    while (await Order.findOne({ orderId: uniqueId })) {
      uniqueId = generateOrderId();
    }

    const isPaid = paymentMethod !== 'Cash on Delivery (Demo)';

    const order = new Order({
      orderId: uniqueId,
      user: req.user._id,
      orderItems: verifiedItems,
      shippingAddress,
      paymentMethod: paymentMethod || 'Cash on Delivery (Demo)',
      paymentResult: isPaid
        ? {
            id: `PAY-DEMO-${Date.now()}`,
            status: 'Completed (Demo Gateway)',
            updateTime: new Date().toISOString(),
          }
        : {
            id: `COD-PENDING`,
            status: 'Due on Delivery',
            updateTime: new Date().toISOString(),
          },
      itemsPrice: Number(calculatedItemsPrice.toFixed(2)),
      shippingPrice,
      taxPrice,
      totalPrice,
      isPaid,
      paidAt: isPaid ? new Date() : null,
      orderStatus: 'Placed',
    });

    const createdOrder = await order.save();

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      order: createdOrder,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate('user', 'name email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    // Check ownership unless admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order.',
      });
    }

    res.json({
      success: true,
      order,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'id name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
// @access  Private/Admin
const updateOrderStatus = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found.',
      });
    }

    const { status, isPaid, isDelivered } = req.body;

    if (status) order.orderStatus = status;
    if (isPaid !== undefined) {
      order.isPaid = isPaid;
      if (isPaid && !order.paidAt) order.paidAt = new Date();
    }
    if (isDelivered !== undefined) {
      order.orderStatus = isDelivered ? 'Delivered' : order.orderStatus;
      if (isDelivered && !order.deliveredAt) order.deliveredAt = new Date();
    }

    const updatedOrder = await order.save();

    res.json({
      success: true,
      message: 'Order status updated successfully.',
      order: updatedOrder,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
};
