import cron from "node-cron";
import { sendMail } from "../services/mailService.js";

export const emailJob = () => {
  // Run every Monday at 9 AM
  cron.schedule("0 9 * * 1", async () => {
    console.log("📧 Running weekly email job...");

    try {
      await sendMail(
        "testuser@example.com",
        "Weekly Update",
        "<h1>Hello!</h1><p>This is your weekly update from DailyDepot 🚀</p>"
      );

      console.log("✅ Weekly email sent successfully.");
    } catch (error) {
      console.error("❌ Email job error:", error);
    }
  });
};
