const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log("URI Length:", process.env.MONGO_URI ? process.env.MONGO_URI.length : "UNDEFINED");
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('=> DB Connected...');
  } catch (error) {
    console.error(`Error DB: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
