// /backend/validations/reviewValidation.js

import { z } from "zod";

/**
 * Media file object schema
 * {
 *    url: string,
 *    public_id: string (optional)
 * }
 */
const mediaFileSchema = z.object({
  url: z
    .string({
      required_error: "URL is required for uploaded media.",
    })
    .url("Must be a valid URL.")
    .trim(),
  public_id: z.string().trim().optional(),
});

/**
 * Validation for creating a review
 */
export const createReviewValidation = z
  .object({
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
      .array(mediaFileSchema)
      .max(5, "You can upload up to 5 images only.")
      .optional(),
    videos: z
      .array(mediaFileSchema)
      .max(3, "You can upload up to 3 videos only.")
      .optional(),
  })
  .strict();

/**
 * Validation for updating a review
 */
export const updateReviewValidation = z
  .object({
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
      .array(mediaFileSchema)
      .max(5, "You can upload up to 5 images only.")
      .optional(),
    videos: z
      .array(mediaFileSchema)
      .max(3, "You can upload up to 3 videos only.")
      .optional(),
    status: z.enum(["visible", "hidden"]).optional(),
  })
  .strict();
