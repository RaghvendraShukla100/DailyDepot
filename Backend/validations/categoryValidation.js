// /backend/validations/categoryValidation.js

import { z } from "zod";

/**
 * Validation for creating a category
 */
export const createCategoryValidation = z.object({
  name: z
    .string({
      required_error: "Category name is required.",
    })
    .trim()
    .min(2, "Category name must be at least 2 characters.")
    .max(100, "Category name cannot exceed 100 characters."),

  slug: z
    .string({
      required_error: "Slug is required.",
    })
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(100, "Slug cannot exceed 100 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  parentCategory: z.string().trim().optional(),

  image: z
    .object({
      url: z.string().url("Image URL must be valid.").optional(),
      public_id: z.string().optional(),
    })
    .optional(),

  isFeatured: z.boolean().optional().default(false),

  status: z
    .enum(["active", "inactive", "deleted"])
    .optional()
    .default("active"),
});

/**
 * Validation for updating a category (partial updates)
 */
export const updateCategoryValidation = createCategoryValidation.partial();
