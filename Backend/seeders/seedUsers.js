import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import dotenv from "dotenv";
dotenv.config();

/**
 * Helper to hash password securely
 */
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Seed Users:
 * Creates admin, sellers, and customers with realistic test data.
 */
const seedUsers = async () => {
  try {
    console.log("Seeding Users...");

    // Delete all existing users
    await User.deleteMany();

    // Create hashed passwords
    const adminPassword = await hashPassword("Admin@123");
    const sellerPassword = await hashPassword("Seller@123");
    const userPassword = await hashPassword("User@123");

    // Seed user data
    const users = [
      {
        name: { first: "Admin", last: "User" },
        email: "admin@dailydepot.com",
        phone: "7000000001",
        password: adminPassword,
        gender: "other",
        dob: new Date("1990-01-01"),
        profilePic: "https://via.placeholder.com/150x150.png?text=Admin",
        bio: "DailyDepot Admin",
        role: "admin",
        isEmailVerified: true,
        isPhoneVerified: true,
        status: "active",
      },
      {
        name: { first: "John", last: "Seller" },
        email: "seller@dailydepot.com",
        phone: "7000000002",
        password: sellerPassword,
        gender: "male",
        dob: new Date("1992-05-15"),
        profilePic: "https://via.placeholder.com/150x150.png?text=Seller",
        bio: "Top-rated seller on DailyDepot.",
        role: "seller",
        isEmailVerified: true,
        isPhoneVerified: true,
        status: "active",
      },
      {
        name: { first: "Jane", last: "Doe" },
        email: "jane@dailydepot.com",
        phone: "7000000003",
        password: userPassword,
        gender: "female",
        dob: new Date("1995-07-20"),
        profilePic: "https://via.placeholder.com/150x150.png?text=User",
        bio: "Fashion enthusiast and tech lover.",
        role: "user",
        isEmailVerified: true,
        isPhoneVerified: false,
        status: "active",
      },
      {
        name: { first: "Alex", last: "Smith" },
        email: "alex@dailydepot.com",
        phone: "7000000004",
        password: userPassword,
        gender: "male",
        dob: new Date("1998-12-12"),
        profilePic: "https://via.placeholder.com/150x150.png?text=User",
        bio: "Gadget reviewer and lifestyle blogger.",
        role: "user",
        isEmailVerified: false,
        isPhoneVerified: false,
        status: "active",
      },
    ];

    // Insert seeded users
    await User.insertMany(users);

    console.log("✅ Users seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    process.exit(1);
  }
};

export default seedUsers;
