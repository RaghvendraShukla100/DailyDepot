import mongoose from "mongoose";
import logger from "../utils/logger.js";

const connectDB = async () => {
  try {
    logger.info("⏳ Attempting MongoDB connection...");
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true, // Ensure indexes are built on startup
    });
    console.clear();
    logger.info(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
