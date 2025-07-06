// /backend/seeders/seedAnalytics.js

import Analytics from "../models/analyticsSchema.js";
import User from "../models/userSchema.js";

const seedAnalytics = async () => {
  try {
    console.log("🌱 Seeding Analytics...");

    const users = await User.find().limit(5);
    if (users.length === 0) {
      console.log("⚠️ Users missing. Please seed them first.");
      return;
    }

    await Analytics.deleteMany();

    const analyticsData = users.map((user, index) => ({
      user: user._id,
      sessionId: `session_${Date.now()}_${index}`,
      eventType: "page_view",
      eventData: {
        page: "/home",
        ref: "campaign_summer",
      },
      device: "mobile",
      browser: "Chrome",
      os: "Android",
      country: "India",
      city: "Delhi",
      ipAddress: `192.168.1.${index + 10}`,
      userAgent: "Mozilla/5.0 (Linux; Android 10)",
      referrer: "https://google.com",
    }));

    const inserted = await Analytics.insertMany(analyticsData);

    console.log(`✅ Seeded ${inserted.length} analytics records successfully.`);

    console.table(
      inserted.map((item, idx) => ({
        SNo: idx + 1,
        AnalyticsID: item._id.toString(),
        User: item.user.toString(),
        SessionID: item.sessionId,
        EventType: item.eventType,
        IP: item.ipAddress,
        City: item.city,
      }))
    );
  } catch (error) {
    console.error("❌ Error seeding analytics:", error);
  }
};

export default seedAnalytics;
