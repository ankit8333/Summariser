// config/db.js
// Connects to MongoDB using Mongoose.
// Call connectDB() once in server.js to establish the connection.

const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Error: ${error.message}`);
    process.exit(1); 
  }
};
module.exports = connectDB;
