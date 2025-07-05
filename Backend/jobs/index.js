/* ===== /jobs/index.js ===== */

import { cleanupJob } from "./cleanupJob.js";
import { inventoryJob } from "./inventoryAlertJob.js";
import { couponExpiryJob } from "./couponExpiryJob.js";
import { emailJob } from "./emailJob.js";

export const startAllJobs = () => {
  console.log("🚀 Starting scheduled cron jobs...");

  cleanupJob();
  inventoryJob();
  couponExpiryJob();
  emailJob();
};
