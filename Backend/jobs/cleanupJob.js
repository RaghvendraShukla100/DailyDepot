import cron from "node-cron";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";
import Address from "../models/addressSchema.js";
import CartItem from "../models/cartItemSchema.js";
import Wishlist from "../models/wishlistSchema.js";
import Review from "../models/reviewSchema.js";
import Notification from "../models/notificationSchema.js";
import Payment from "../models/paymentSchema.js";
import Coupon from "../models/couponSchema.js";
import Category from "../models/categorySchema.js";
import Brand from "../models/brandSchema.js";
import Seller from "../models/sellerSchema.js";
import Analytics from "../models/analyticsSchema.js";

/**
 * Runs daily at 2:00 AM
 * Deletes soft-deleted records older than 7 days for all relevant collections
 * to maintain database hygiene and reduce storage.
 */
export const cleanupJob = () => {
  cron.schedule("0 2 * * *", async () => {
    console.log("🧹 Running cleanup job for soft-deleted records...");

    try {
      const deleteBefore = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

      const collections = [
        { model: User, name: "Users" },
        { model: Product, name: "Products" },
        { model: Order, name: "Orders" },
        { model: Address, name: "Addresses" },
        { model: CartItem, name: "CartItems" },
        { model: Wishlist, name: "Wishlists" },
        { model: Review, name: "Reviews" },
        { model: Notification, name: "Notifications" },
        { model: Payment, name: "Payments" },
        { model: Coupon, name: "Coupons" },
        { model: Category, name: "Categories" },
        { model: Brand, name: "Brands" },
        { model: Seller, name: "Sellers" },
        { model: Analytics, name: "Analytics" },
      ];

      for (const { model, name } of collections) {
        const result = await model.deleteMany({
          deleted: true,
          deletedAt: { $lte: deleteBefore },
        });

        console.log(
          `✅ ${name}: Deleted ${result.deletedCount} soft-deleted documents.`
        );
      }

      console.log("✅ Cleanup job completed successfully.");
    } catch (error) {
      console.error("❌ Cleanup job failed:", error);
    }
  });
};
