import cron from "node-cron";
import Coupon from "../models/couponSchema.js";
import Notification from "../models/notificationSchema.js";
import User from "../models/userSchema.js";

/**
 * Runs daily at 2:30 AM
 * Checks for expired coupons and marks them as `expired`.
 * Sends notifications to admin users summarizing expired coupons.
 */
export const couponExpiryJob = () => {
  cron.schedule("30 2 * * *", async () => {
    console.log("🏷️ Running coupon expiry job...");

    try {
      const now = new Date();

      const expiredCoupons = await Coupon.find({
        validTill: { $lt: now },
        status: { $ne: "expired" },
      });

      if (!expiredCoupons.length) {
        console.log("✅ No coupons to expire.");
        return;
      }

      const expiredCodes = expiredCoupons.map((coupon) => coupon.code);

      // Update their status in bulk
      await Coupon.updateMany(
        { _id: { $in: expiredCoupons.map((c) => c._id) } },
        { $set: { status: "expired" } }
      );

      // Notify all admin users
      const adminUsers = await User.find({ role: "admin", status: "active" });

      const notifications = adminUsers.map((admin) => ({
        user: admin._id,
        type: "promotion",
        title: "Coupons Expired",
        message: `The following coupons have expired: ${expiredCodes.join(
          ", "
        )}`,
        priority: "normal",
      }));

      await Notification.insertMany(notifications);

      console.log(
        `✅ Coupon expiry job completed. Expired coupons: ${expiredCodes.join(
          ", "
        )}`
      );
    } catch (error) {
      console.error("❌ Coupon expiry job failed:", error);
    }
  });
};
