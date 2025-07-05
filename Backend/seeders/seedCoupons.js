import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Coupon from "../models/couponSchema.js";

/**
 * Seed Coupons:
 * Adds demo coupons for testing checkout, discounts, and promotional flows.
 */
const seedCoupons = async () => {
  try {
    console.log("Seeding Coupons...");

    // Clear existing coupons
    await Coupon.deleteMany();

    const coupons = [
      {
        code: "WELCOME10",
        description: "10% off on your first purchase.",
        discountType: "percentage",
        discountValue: 10,
        maxDiscountAmount: 500,
        minPurchaseAmount: 1000,
        validFrom: new Date(),
        validTo: new Date(new Date().setMonth(new Date().getMonth() + 3)), // 3 months validity
        usageLimit: 1000,
        usageCount: 0,
        isActive: true,
      },
      {
        code: "FREESHIP",
        description: "Free shipping on orders above ₹500.",
        discountType: "free_shipping",
        discountValue: 0,
        minPurchaseAmount: 500,
        validFrom: new Date(),
        validTo: new Date(new Date().setMonth(new Date().getMonth() + 6)),
        usageLimit: 5000,
        usageCount: 0,
        isActive: true,
      },
      {
        code: "FESTIVE15",
        description: "Flat 15% off during festive season.",
        discountType: "percentage",
        discountValue: 15,
        maxDiscountAmount: 1000,
        minPurchaseAmount: 1500,
        validFrom: new Date(),
        validTo: new Date(new Date().setMonth(new Date().getMonth() + 1)),
        usageLimit: 2000,
        usageCount: 0,
        isActive: true,
      },
      {
        code: "FLAT200",
        description: "Flat ₹200 off on orders above ₹2000.",
        discountType: "fixed",
        discountValue: 200,
        minPurchaseAmount: 2000,
        validFrom: new Date(),
        validTo: new Date(new Date().setMonth(new Date().getMonth() + 2)),
        usageLimit: 1500,
        usageCount: 0,
        isActive: true,
      },
      {
        code: "SUMMER20",
        description: "20% off on selected categories.",
        discountType: "percentage",
        discountValue: 20,
        maxDiscountAmount: 800,
        minPurchaseAmount: 1200,
        validFrom: new Date(),
        validTo: new Date(new Date().setMonth(new Date().getMonth() + 4)),
        usageLimit: 1000,
        usageCount: 0,
        isActive: true,
      },
    ];

    await Coupon.insertMany(coupons);

    console.log("✅ Coupons seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding coupons:", error);
    process.exit(1);
  }
};

export default seedCoupons;
