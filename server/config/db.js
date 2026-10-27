const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/techcart', {
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ MongoDB Connected successfully: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    console.warn(`
⚠️  Troubleshooting MongoDB Connection:
1. Ensure MongoDB Compass or local MongoDB service is running (default: mongodb://127.0.0.1:27017).
2. Or use MongoDB Atlas cloud URI in your .env file:
   MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/techcart?retryWrites=true&w=majority
    `);
    // Do not terminate process immediately in development so health check and other APIs remain inspectable
  }
};

module.exports = connectDB;
