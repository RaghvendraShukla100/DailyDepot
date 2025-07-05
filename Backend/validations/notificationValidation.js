// /Backend/validations/notificationValidation.js

import { z } from "zod";

/**
 * Validation for creating a notification
 */
export const createNotificationValidation = z.object({
  user: z.string().optional(), // Optional for system notifications
  type: z.enum(["general", "promotion", "system", "order"]).optional(),
  title: z.string({ required_error: "Title is required." }).min(2).max(100),
  message: z
    .string({ required_error: "Message is required." })
    .min(2)
    .max(1000),
  priority: z.enum(["low", "normal", "high"]).optional(),
  read: z.boolean().optional(),
});
