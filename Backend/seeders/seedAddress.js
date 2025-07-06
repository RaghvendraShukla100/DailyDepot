import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Address from "../models/addressSchema.js";
import User from "../models/userSchema.js";

/**
 * Seed Addresses:
 * Creates demo addresses for testing checkout flows, order creation, and address management.
 */

// Prevent accidental seeding in production
if (process.env.NODE_ENV === "production") {
  console.log("⚠️ Seeding addresses is disabled in production.");
}

const seedAddresses = async () => {
  try {
    console.log("🌱 Seeding Addresses...");

    // Clear existing addresses
    await Address.deleteMany();

    // Get an existing user to associate addresses
    const user = await User.findOne();
    if (!user) {
      console.log("⚠️ No users found. Please seed users first.");
      return;
    }

    const addresses = [
      {
        user: user._id,
        fullName: "Raghav Sharma",
        phone: "9876543210",
        email: "raghav@example.com",
        addressLine1: "221B Baker Street",
        addressLine2: "Near City Park",
        city: "New Delhi",
        state: "Delhi",
        postalCode: "110001",
        country: "India",
        landmark: "Near Red Fort",
        addressType: "home",
        isDefault: true,
        tag: "primary",
        notes: "Leave at the security gate if not available.",
        geoLocation: { lat: 28.6139, lng: 77.209, accuracy: 5 },
        isVerified: true,
      },
      {
        user: user._id,
        fullName: "Aarav Verma",
        phone: "9123456789",
        email: "aarav@example.com",
        addressLine1: "12 MG Road",
        addressLine2: "Apartment 4B",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560001",
        country: "India",
        landmark: "Opposite Metro Station",
        addressType: "work",
        isDefault: false,
        tag: "shipping",
        geoLocation: { lat: 12.9716, lng: 77.5946, accuracy: 10 },
        isVerified: false,
      },
    ];

    const insertedAddresses = await Address.insertMany(addresses);

    console.table(
      insertedAddresses.map((address) => ({
        Name: address.fullName,
        Phone: address.phone,
        City: address.city,
        State: address.state,
        Type: address.addressType,
        Default: address.isDefault,
      }))
    );

    console.log(
      `✅ Seeded ${insertedAddresses.length} addresses successfully.`
    );
  } catch (error) {
    console.error("❌ Error seeding addresses:", error.message);
  }
};

export default seedAddresses;
