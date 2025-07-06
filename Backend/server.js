// /backend/server.js

import dotenv from "dotenv";
dotenv.config(); // Load .env immediately

import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./utils/logger.js";

// Get environment variables
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Start server only after DB connects
const startServer = async () => {
  try {
    await connectDB();

    const server = app.listen(PORT, () => {
      logger.info(`🚀 Server running in ${NODE_ENV} mode on port ${PORT}`);
    });

    // Graceful shutdown on unhandled promise rejections
    process.on("unhandledRejection", (err) => {
      logger.error(`❌ Unhandled Rejection: ${err.message}`);
      server.close(() => process.exit(1));
    });

    // Graceful shutdown on SIGTERM
    process.on("SIGTERM", () => {
      logger.info("👋 SIGTERM received, shutting down gracefully.");
      server.close(() => {
        logger.info("💤 Process terminated.");
      });
    });
  } catch (error) {
    logger.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
