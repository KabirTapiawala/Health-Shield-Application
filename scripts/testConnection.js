// scripts/testConnection.js
const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/healthShieldDB';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('✅ Successfully connected to MongoDB');
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
  }
};

connectDB();
