// /Backend/seeders/seedSuperAdmin.js

import connectDB from "../config/db.js";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import { ROLES } from "../constants/roles.js";
import dotenv from "dotenv";
dotenv.config();

const createSuperadmin = async () => {
  try {
    await connectDB();

    const existing = await User.findOne({ email: "superadmin@example.com" });
    if (existing) {
      console.log("ℹ️ Superadmin already exists:", existing.email);
      return;
    }

    const user = await User.create({
      name: "Super Admin",
      email: "superadmin@example.com",
      password: "StrongPassword123", // TODO: Change after first login
      role: ROLES.SUPERADMIN,
    });

    await Admin.create({
      user: user._id,
      role: "superadmin",
      permissions: [
        "manage_users",
        "manage_orders",
        "manage_products",
        "manage_payments",
        "manage_admins",
      ],
    });

    console.log("✅ Superadmin created:", user.email);
    console.log(
      "⚠️ Please change the default superadmin password after the first login."
    );
  } catch (error) {
    console.error("❌ Error seeding superadmin:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

createSuperadmin();
