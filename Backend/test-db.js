import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";

(async () => {
  try {
    console.log("✅ Attempting DB connection...");
    await connectDB();
    console.log("✅ DB connected successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ DB connection failed:", error);
    process.exit(1);
  }
})();
