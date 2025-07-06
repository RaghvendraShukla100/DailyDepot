// /backend/seeders/seedNotification.js

import Notification from "../models/notificationSchema.js";
import User from "../models/userSchema.js";

const seedNotification = async () => {
  try {
    console.log("🌱 Seeding Notifications...");

    const users = await User.find().limit(5);

    if (users.length === 0) {
      console.log("⚠️ Users missing. Please seed them first.");
      return;
    }

    await Notification.deleteMany();

    const notifications = users.map((user, index) => ({
      user: user._id,
      type: "order_update",
      title: `Your order #${index + 1001} has been shipped!`,
      message: `Hello ${user.name || "User"}, your order is now on the way.`,
      priority: "normal",
      deliveryMethod: ["push", "email"],
      read: false,
      metadata: {
        trackingId: `TRACK${Date.now()}${index}`,
      },
    }));

    const inserted = await Notification.insertMany(notifications);

    console.log(`✅ Seeded ${inserted.length} notifications successfully.`);

    console.table(
      inserted.map((notif, idx) => ({
        SNo: idx + 1,
        NotificationID: notif._id.toString(),
        User: notif.user.toString(),
        Title: notif.title,
        Type: notif.type,
        Priority: notif.priority,
      }))
    );
  } catch (error) {
    console.error("❌ Error seeding notifications:", error);
  }
};

export default seedNotification;
