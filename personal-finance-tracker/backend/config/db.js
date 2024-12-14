require('dotenv').config(); 
const mongoose = require('mongoose');
console.log("test")

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI; 
    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in environment variables');
    }
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully to Atlas');
  } catch (err) {
    console.error('Error connecting to MongoDB Atlas:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;