// /Backend/validations/reviewValidation.js

import { z } from "zod";

/**
 * Validation for creating a review
 */
export const createReviewValidation = z.object({
  product: z.string({
    required_error: "Product ID is required.",
  }),
  rating: z
    .number({
      required_error: "Rating is required.",
    })
    .min(1, "Rating must be at least 1.")
    .max(5, "Rating cannot exceed 5."),
  comment: z.string().max(1000).optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
});

/**
 * Validation for updating a review
 */
export const updateReviewValidation = z.object({
  rating: z.number().min(1).max(5).optional(),
  comment: z.string().max(1000).optional(),
  images: z.array(z.string()).optional(),
  videos: z.array(z.string()).optional(),
  status: z.enum(["pending", "approved", "rejected"]).optional(),
});
