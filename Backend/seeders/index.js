// /backend/seeders/index.js

import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";

import seedUsers from "./seedUsers.js";
import seedSellers from "./seedSellers.js";
import seedAdmins from "./seedAdmins.js";
import seedAddresses from "./seedAddress.js";
import seedBrands from "./seedBrands.js";
import seedCategories from "./seedCategories.js";
import seedCoupons from "./seedCoupons.js";
import seedProducts from "./seedProducts.js";
import seedInventorys from "./seedInventorys.js";
import seedOrders from "./seedOrders.js";
import seedCartItems from "./seedCartItems.js";
import seedWishlists from "./seedWishlists.js";
import seedPayments from "./seedPayments.js";
import seedNotifications from "./seedNotifications.js";
import seedAnalytics from "./seedAnalytics.js";

if (process.env.NODE_ENV === "production") {
  console.log("⚠️ Seeding is disabled in production.");
  process.exit(0);
}

const seedAll = async () => {
  const start = Date.now();
  try {
    console.log("🌱 Starting seeding process...");
    await connectDB();

    const seedFunctions = [
      seedUsers,
      seedSellers,
      seedAdmins,
      seedAddresses,
      seedBrands,
      seedCategories,
      seedCoupons,
      seedProducts,
      seedInventorys,
      seedOrders,
      seedCartItems,
      seedWishlists,
      seedPayments,
      seedNotifications,
      seedAnalytics,
    ];

    for (const seedFn of seedFunctions) {
      try {
        await seedFn();
      } catch (err) {
        console.error(`❌ Error in ${seedFn.name}:`, err);
      }
    }

    console.log(`✅ All seeding completed in ${(Date.now() - start) / 1000}s.`);
    await mongoose.connection.close();
    console.log("🔌 Database connection closed.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    await mongoose.connection.close();
    console.log("🔌 Database connection closed due to error.");
    process.exit(1);
  }
};

seedAll();
