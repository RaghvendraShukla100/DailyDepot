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
    .max(2000, "Description cannot exceed 2000 characters."),

  price: z.coerce
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a valid number.",
    })
    .positive("Price must be positive."),

  discount: z.coerce.number().min(0).max(100).optional().default(0),

  stock: z.coerce
    .number({
      invalid_type_error: "Stock must be a valid number.",
    })
    .int("Stock must be an integer.")
    .min(0, "Stock cannot be negative.")
    .default(0),

  sold: z.coerce.number().min(0).optional().default(0),

  category: z
    .string({
      required_error: "Category ID is required.",
    })
    .length(24, "Invalid category ID."),

  brand: z
    .string({
      required_error: "Brand ID is required.",
    })
    .length(24, "Invalid brand ID."),

  tags: z
    .array(z.string().trim())
    .max(50, "You can add up to 50 tags only.")
    .optional()
    .default([]),

  colors: z.array(z.string().trim()).optional().default([]),
  sizes: z.array(z.string().trim()).optional().default([]),

  sku: z.string().trim().optional(),

  weight: z.coerce.number().min(0).optional(),

  dimensions: z
    .object({
      length: z.coerce.number().min(0).optional(),
      width: z.coerce.number().min(0).optional(),
      height: z.coerce.number().min(0).optional(),
    })
    .optional()
    .default({}),

  meta: z
    .object({
      title: z.string().trim().optional(),
      description: z.string().trim().optional(),
      keywords: z.array(z.string().trim()).optional(),
    })
    .optional()
    .default({}),

  isPublished: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),

  ratingsAverage: z.coerce.number().min(0).max(5).optional().default(0),
  ratingsCount: z.coerce.number().min(0).optional().default(0),

  // ✅ Add images field
  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL."),
        alt: z.string().trim().optional(),
      })
    )
    .optional()
    .default([]),

  // Videos field
  videos: z
    .array(
      z.object({
        url: z.string().url("Invalid video URL."),
        alt: z.string().trim().optional(),
      })
    )
    .optional()
    .default([]),
});

export const updateProductValidation = createProductValidation.partial();
