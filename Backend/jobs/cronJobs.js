import cron from "node-cron";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";

export const cleanupJob = () => {
  // Run daily at 2:00 AM
  cron.schedule("0 2 * * *", async () => {
    console.log("🧹 Running cleanup job for soft-deleted records...");

    try {
      const deleteBefore = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // 7 days old

      const userResult = await User.deleteMany({
        deleted: true,
        deletedAt: { $lte: deleteBefore },
      });

      const productResult = await Product.deleteMany({
        deleted: true,
        deletedAt: { $lte: deleteBefore },
      });

      const orderResult = await Order.deleteMany({
        deleted: true,
        deletedAt: { $lte: deleteBefore },
      });

      console.log(
        `✅ Cleanup completed: Users(${userResult.deletedCount}), Products(${productResult.deletedCount}), Orders(${orderResult.deletedCount})`
      );
    } catch (error) {
      console.error("❌ Cleanup job error:", error);
    }
  });
};
