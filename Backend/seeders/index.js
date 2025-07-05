// backend/seeders/index.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";

import seedUsers from "./seedUsers.js";
import seedCategories from "./seedCategories.js";
import seedBrands from "./seedBrands.js";
import seedCoupons from "./seedCoupons.js";
import seedProducts from "./seedProducts.js";
import seedOrders from "./seedOrders.js";
import seedAdmin from "./seedAdmin.js";

const seedAll = async () => {
  try {
    console.log("🌱 Starting seeding process...");
    await connectDB();

    await seedUsers();
    await seedCategories();
    await seedBrands();
    await seedCoupons();
    await seedProducts();
    await seedOrders();
    await seedAdmin();

    console.log("✅ All seeding completed successfully.");
    mongoose.connection.close(() => {
      console.log("🔌 Database connection closed.");
      process.exit(0);
    });
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    mongoose.connection.close(() => {
      console.log("🔌 Database connection closed due to error.");
      process.exit(1);
    });
  }
};

seedAll();
