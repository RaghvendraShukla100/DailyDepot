// /backend/seeders/superAdminSeeder.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import { ROLE_PERMISSIONS } from "../constants/rolePermission.js";
import logger from "../utils/logger.js";
import { registerUserValidation } from "../validations/userValidation.js";
import ApiError from "../utils/apiError.js";

dotenv.config();

const seedSuperAdmin = async () => {
  try {
    // Connect if not already connected
    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("✅ Connected to MongoDB for superadmin seeding.");
    }

    const superadminEmail = process.env.SUPERADMIN_EMAIL || "superadmin@example.com";
    const superadminPhone = process.env.SUPERADMIN_PHONE || "+911234567890";
    const superadminPassword = process.env.SUPERADMIN_PASSWORD || "SuperAdmin@123";

    // Validate with Zod
    const validationData = {
      name: "Super Admin",
      email: superadminEmail,
      phone: superadminPhone,
      password: superadminPassword,
    };

    const parsed = registerUserValidation.safeParse(validationData);
    if (!parsed.success) {
      console.error("❌ Validation failed for superadmin seeding:", parsed.error.format());
      process.exit(1);
    }

    // Check if Superadmin user exists
    let superadminUser = await User.findOne({ email: superadminEmail });
    if (!superadminUser) {
      // Create user
      const [firstName, ...rest] = parsed.data.name.split(" ");
      const lastName = rest.join(" ") || "Admin";

      superadminUser = new User({
        name: { first: firstName, last: lastName },
        email: parsed.data.email,
        phone: parsed.data.phone,
        password: parsed.data.password,
        role: "admin", // Will attach superadmin via Admin schema
        isEmailVerified: true,
        isPhoneVerified: true,
      });
      await superadminUser.save();
      console.log(`✅ Superadmin user created: ${superadminEmail}`);
    } else {
      console.log(`ℹ️ Superadmin user already exists: ${superadminEmail}`);
    }

    // Check if Admin profile for superadmin user exists
    let superadminProfile = await Admin.findOne({ user: superadminUser._id });
    if (!superadminProfile) {
      superadminProfile = new Admin({
        user: superadminUser._id,
        designation: "superadmin",
        permissions: ROLE_PERMISSIONS.superadmin.can,
        contactEmail: superadminUser.email,
        contactPhone: superadminUser.phone,
        isActive: true,
      });
      await superadminProfile.save();
      console.log(`✅ Superadmin admin profile created for user ${superadminUser._id}`);
    } else {
      console.log(`ℹ️ Superadmin admin profile already exists for user ${superadminUser._id}`);
    }

    console.log("🎉 Superadmin seeding completed successfully.");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error while seeding superadmin:", error);
    process.exit(1);
  }
};

seedSuperAdmin();
