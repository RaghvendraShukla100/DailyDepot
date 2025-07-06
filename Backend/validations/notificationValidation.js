// /backend/validations/notificationValidation.js

import { z } from "zod";

/**
 * Validation for creating a notification
 */
export const createNotificationValidation = z.object({
  user: z.string().length(24, "Invalid User ID.").optional(), // Optional for system notifications

  type: z
    .enum(["general", "promotion", "system", "order"])
    .optional()
    .default("general"),

  title: z
    .string({
      required_error: "Title is required.",
    })
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title cannot exceed 100 characters.")
    .trim(),

  message: z
    .string({
      required_error: "Message is required.",
    })
    .min(2, "Message must be at least 2 characters.")
    .max(1000, "Message cannot exceed 1000 characters.")
    .trim(),

  priority: z.enum(["low", "normal", "high"]).optional().default("normal"),

  read: z.boolean().optional().default(false),
});

/**
 * Validation for updating a notification
 */
export const updateNotificationValidation = z.object({
  title: z
    .string()
    .min(2, "Title must be at least 2 characters.")
    .max(100, "Title cannot exceed 100 characters.")
    .trim()
    .optional(),

  message: z
    .string()
    .min(2, "Message must be at least 2 characters.")
    .max(1000, "Message cannot exceed 1000 characters.")
    .trim()
    .optional(),

  priority: z.enum(["low", "normal", "high"]).optional(),

  read: z.boolean().optional(),

  type: z.enum(["general", "promotion", "system", "order"]).optional(),
});
