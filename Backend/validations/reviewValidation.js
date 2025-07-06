// /backend/validations/reviewValidation.js

import { z } from "zod";

/**
 * Validation for creating a review
 */
export const createReviewValidation = z.object({
  product: z
    .string({
      required_error: "Product ID is required.",
    })
    .trim(),
  rating: z
    .number({
      required_error: "Rating is required.",
    })
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5."),
  comment: z
    .string()
    .trim()
    .max(1000, "Comment cannot exceed 1000 characters.")
    .optional(),
  images: z
    .array(z.string().trim())
    .max(5, "You can upload up to 5 images only.")
    .optional(),
  videos: z
    .array(z.string().trim())
    .max(3, "You can upload up to 3 videos only.")
    .optional(),
});

/**
 * Validation for updating a review
 */
export const updateReviewValidation = z.object({
  rating: z
    .number()
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5.")
    .optional(),
  comment: z
    .string()
    .trim()
    .max(1000, "Comment cannot exceed 1000 characters.")
    .optional(),
  images: z
    .array(z.string().trim())
    .max(5, "You can upload up to 5 images only.")
    .optional(),
  videos: z
    .array(z.string().trim())
    .max(3, "You can upload up to 3 videos only.")
    .optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});
