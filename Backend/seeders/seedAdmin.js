import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
dotenv.config();

import Admin from "../models/adminSchema.js";

/**
 * Seed Admin:
 * Creates a default admin user for initial system login and dashboard management.
 * Update the credentials below or use environment variables for production security.
 */
const seedAdmin = async () => {
  try {
    console.log("Seeding Admin...");

    // Optional: clear existing admins if needed
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists, skipping creation.");
      return;
    }

    const hashedPassword = await bcrypt.hash(
      process.env.ADMIN_PASSWORD || "admin@123",
      10
    );

    const admin = new Admin({
      name: {
        first: "Super",
        last: "Admin",
      },
      email: process.env.ADMIN_EMAIL || "admin@example.com",
      phone: process.env.ADMIN_PHONE || "9999999999",
      password: hashedPassword,
      role: "admin",
      isEmailVerified: true,
      status: "active",
    });

    await admin.save();

    console.log(`✅ Admin seeded successfully:
    Email: ${admin.email}
    Password: ${process.env.ADMIN_PASSWORD || "admin@123"}`);
  } catch (error) {
    console.error("❌ Error seeding admin:", error);
    process.exit(1);
  }
};

export default seedAdmin;
