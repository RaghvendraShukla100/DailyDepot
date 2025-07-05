import cron from "node-cron";
import Product from "../models/productSchema.js";
import Inventory from "../models/inventorySchema.js";
import Notification from "../models/notificationSchema.js";
import User from "../models/userSchema.js";

/**
 * Runs daily at 3:00 AM
 * Checks for low-stock products based on `lowStockThreshold` in inventory
 * and sends notifications to admins or marks products as out of stock if needed.
 */
export const inventoryJob = () => {
  cron.schedule("0 3 * * *", async () => {
    console.log("📦 Running inventory monitoring job...");

    try {
      const lowStockInventories = await Inventory.find({
        quantity: { $lte: 5 },
        status: { $ne: "out_of_stock" },
      }).populate("product");

      if (!lowStockInventories.length) {
        console.log("✅ No low-stock inventories found.");
        return;
      }

      for (const inventory of lowStockInventories) {
        // Update product status to out_of_stock if zero
        if (inventory.quantity === 0) {
          inventory.status = "out_of_stock";
          await inventory.save();

          if (inventory.product) {
            inventory.product.stock = 0;
            await inventory.product.save();
          }
        }

        // Send low-stock notification to admin users
        const adminUsers = await User.find({ role: "admin", status: "active" });
        const notifications = adminUsers.map((admin) => ({
          user: admin._id,
          type: "general",
          title: "Low Stock Alert",
          message: `Product "${
            inventory.product?.name || "Unknown"
          }" is low on stock (Quantity: ${inventory.quantity}).`,
          priority: "high",
        }));

        await Notification.insertMany(notifications);

        console.log(
          `⚠️ Low stock detected for: ${
            inventory.product?.name || "Unknown"
          } (Quantity: ${inventory.quantity}). Notifications sent.`
        );
      }

      console.log("✅ Inventory monitoring job completed successfully.");
    } catch (error) {
      console.error("❌ Inventory monitoring job failed:", error);
    }
  });
};
