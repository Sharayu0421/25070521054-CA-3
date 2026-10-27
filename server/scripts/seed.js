const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const sampleProducts = require('../data/products');

const seedData = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techcart';
  console.log(`Connecting to MongoDB at: ${uri}...`);

  try {
    await mongoose.connect(uri);
    console.log(' Connected to MongoDB for seeding.');

    // Clear existing data
    console.log(' Cleaning old records...');
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    // Create Admin and Test User
    console.log(' Creating demo accounts...');
    const adminUser = await User.create({
      name: 'TechCart Admin',
      email: 'admin@techcart.com',
      password: 'adminpassword123',
      role: 'admin',
      phone: '+1 (555) 019-2834',
      shippingAddress: {
        street: '100 Silicon Way, Suite 400',
        city: 'San Jose',
        state: 'California',
        postalCode: '95113',
        country: 'United States',
      },
    });

    const demoUser = await User.create({
      name: 'Alex Johnson',
      email: 'alex@example.com',
      password: 'userpassword123',
      role: 'user',
      phone: '+1 (555) 749-3820',
      shippingAddress: {
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'Oregon',
        postalCode: '97477',
        country: 'United States',
      },
    });

    console.log(' Seeding electronic products catalogue...');
    const createdProducts = await Product.insertMany(sampleProducts);
    console.log(` Inserted ${createdProducts.length} high-quality electronic products.`);

    // Create a sample demo order for Alex Johnson
    const sampleProduct1 = createdProducts[0]; // iPhone 16 Pro Max
    const sampleProduct2 = createdProducts[8]; // Sony WH-1000XM5

    const subtotal = sampleProduct1.price + sampleProduct2.price;
    const tax = Number((0.05 * subtotal).toFixed(2));
    const total = subtotal + tax;

    await Order.create({
      orderId: `TC-${new Date().getFullYear()}-827419`,
      user: demoUser._id,
      orderItems: [
        {
          product: sampleProduct1._id,
          name: sampleProduct1.name,
          image: sampleProduct1.image,
          price: sampleProduct1.price,
          quantity: 1,
        },
        {
          product: sampleProduct2._id,
          name: sampleProduct2.name,
          image: sampleProduct2.image,
          price: sampleProduct2.price,
          quantity: 1,
        },
      ],
      shippingAddress: {
        fullName: demoUser.name,
        phone: demoUser.phone,
        street: demoUser.shippingAddress.street,
        city: demoUser.shippingAddress.city,
        state: demoUser.shippingAddress.state,
        postalCode: demoUser.shippingAddress.postalCode,
        country: 'United States',
      },
      paymentMethod: 'Credit / Debit Card (Demo)',
      paymentResult: {
        id: 'PAY-DEMO-SAMPLE-INIT',
        status: 'Completed (Demo Gateway)',
        updateTime: new Date().toISOString(),
      },
      itemsPrice: subtotal,
      shippingPrice: 0,
      taxPrice: tax,
      totalPrice: total,
      isPaid: true,
      paidAt: new Date(),
      orderStatus: 'Shipped',
    });

    console.log(' Sample demo order created for test user.');
    console.log('\n=============================================');
    console.log('🎉 SEEDING COMPLETED SUCCESSFULLY!');
    console.log('=============================================');
    console.log('Default Credentials:');
    console.log('  Admin: admin@techcart.com / adminpassword123');
    console.log('  User:  alex@example.com   / userpassword123');
    console.log('=============================================\n');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
