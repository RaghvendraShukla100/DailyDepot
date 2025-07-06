import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Coupon from "../models/couponSchema.js";

/**
 * Seed Coupons:
 * Adds demo coupons for testing checkout, discounts, and promotional flows.
 */

if (process.env.NODE_ENV === "production") {
  console.log("⚠️ Seeding coupons is disabled in production.");
}

const seedCoupons = async () => {
  try {
    console.log("🌱 Seeding Coupons...");

    // Clear existing coupons
    await Coupon.deleteMany();

    const now = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    const sixMonthsLater = new Date();
    sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);

    const oneMonthLater = new Date();
    oneMonthLater.setMonth(oneMonthLater.getMonth() + 1);

    const twoMonthsLater = new Date();
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);

    const fourMonthsLater = new Date();
    fourMonthsLater.setMonth(fourMonthsLater.getMonth() + 4);

    const coupons = [
      {
        code: "WELCOME10",
        description: "10% off on your first purchase.",
        discountType: "percentage",
        discountValue: 10,
        maxDiscountAmount: 500,
        minOrderAmount: 1000,
        validFrom: now,
        validTill: threeMonthsLater,
        usageLimit: 1000,
        isStackable: false,
        status: "active",
      },
      {
        code: "FESTIVE15",
        description: "Flat 15% off during festive season.",
        discountType: "percentage",
        discountValue: 15,
        maxDiscountAmount: 1000,
        minOrderAmount: 1500,
        validFrom: now,
        validTill: oneMonthLater,
        usageLimit: 2000,
        isStackable: false,
        status: "active",
      },
      {
        code: "FLAT200",
        description: "Flat ₹200 off on orders above ₹2000.",
        discountType: "flat",
        discountValue: 200,
        minOrderAmount: 2000,
        validFrom: now,
        validTill: twoMonthsLater,
        usageLimit: 1500,
        isStackable: false,
        status: "active",
      },
      {
        code: "SUMMER20",
        description: "20% off on selected categories.",
        discountType: "percentage",
        discountValue: 20,
        maxDiscountAmount: 800,
        minOrderAmount: 1200,
        validFrom: now,
        validTill: fourMonthsLater,
        usageLimit: 1000,
        isStackable: false,
        status: "active",
      },
    ];

    const insertedCoupons = await Coupon.insertMany(coupons);

    console.table(
      insertedCoupons.map((coupon) => ({
        Code: coupon.code,
        Type: coupon.discountType,
        Value: coupon.discountValue,
        Status: coupon.status,
        ValidTill: coupon.validTill.toDateString(),
      }))
    );

    console.log(`✅ Seeded ${insertedCoupons.length} coupons successfully.`);
  } catch (error) {
    console.error("❌ Error seeding coupons:", error.message);
  }
};

export default seedCoupons;
