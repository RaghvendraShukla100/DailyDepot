// /backend/validations/productValidation.js

import { z } from "zod";

/**
 * Validation for creating a product
 */
export const createProductValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(200, "Name cannot exceed 200 characters."),
  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters.")
    .optional(),
  price: z
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a valid number.",
    })
    .positive("Price must be positive."),
  category: z
    .string({
      required_error: "Category ID is required.",
    })
    .length(24, "Invalid category ID."),
  brand: z.string().length(24, "Invalid brand ID.").optional(),
  stock: z
    .number({
      invalid_type_error: "Stock must be a valid number.",
    })
    .int("Stock must be an integer.")
    .min(0, "Stock cannot be negative.")
    .default(0),
  tags: z
    .array(z.string().trim())
    .max(50, "You can add up to 50 tags only.")
    .optional()
    .default([]),
  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL."),
        alt: z
          .string()
          .trim()
          .max(200, "Alt text cannot exceed 200 characters.")
          .optional(),
        public_id: z.string().trim().optional(),
      })
    )
    .max(20, "You can upload up to 20 images only.")
    .optional()
    .default([]),
  isFeatured: z.boolean().optional().default(false),
  status: z
    .enum(["active", "inactive", "deleted"])
    .optional()
    .default("active"),
});

/**
 * Validation for updating a product
 */
export const updateProductValidation = createProductValidation.partial();
