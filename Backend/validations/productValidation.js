import { z } from "zod";

/**
 * Zod validation schema for creating a product
 * Ensures structured validation for consistent API data integrity
 */
export const createProductValidation = z.object({
  // Product name
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(200, "Name cannot exceed 200 characters."),

  // Product description
  description: z
    .string()
    .trim()
    .max(2000, "Description cannot exceed 2000 characters."),

  // Price
  price: z.coerce
    .number({
      required_error: "Price is required.",
      invalid_type_error: "Price must be a valid number.",
    })
    .positive("Price must be positive."),

  // Discount (optional)
  discount: z.coerce.number().min(0).max(100).optional().default(0),

  // Stock count
  stock: z.coerce
    .number({
      invalid_type_error: "Stock must be a valid number.",
    })
    .int("Stock must be an integer.")
    .min(0, "Stock cannot be negative.")
    .default(0),

  // Sold count
  sold: z.coerce.number().min(0).optional().default(0),

  // Category ID
  category: z
    .string({
      required_error: "Category ID is required.",
    })
    .length(24, "Invalid category ID."),

  // Brand ID
  brand: z
    .string({
      required_error: "Brand ID is required.",
    })
    .length(24, "Invalid brand ID."),

  // Tags (optional)
  tags: z
    .array(z.string().trim())
    .max(50, "You can add up to 50 tags only.")
    .optional()
    .default([]),

  // Colors (optional)
  colors: z.array(z.string().trim()).optional().default([]),

  // Sizes (optional)
  sizes: z.array(z.string().trim()).optional().default([]),

  // SKU (optional)
  sku: z.string().trim().optional(),

  // Weight (optional)
  weight: z.coerce.number().min(0).optional(),

  // Dimensions (optional)
  dimensions: z
    .object({
      length: z.coerce.number().min(0).optional(),
      width: z.coerce.number().min(0).optional(),
      height: z.coerce.number().min(0).optional(),
    })
    .optional()
    .default({}),

  // Meta information for SEO (optional)
  meta: z
    .object({
      title: z.string().trim().optional(),
      description: z.string().trim().optional(),
      keywords: z.array(z.string().trim()).optional(),
    })
    .optional()
    .default({}),

  // Publication status
  isPublished: z.boolean().optional().default(true),

  // Featured status
  isFeatured: z.boolean().optional().default(false),

  // Ratings (optional)
  ratingsAverage: z.coerce.number().min(0).max(5).optional().default(0),
  ratingsCount: z.coerce.number().min(0).optional().default(0),

  /**
   * Images field:
   * Accepts an array of { url, alt }
   * Validation ensures valid URLs if provided (optional on creation)
   */
  images: z
    .array(
      z.object({
        url: z.string().url("Invalid image URL."),
        alt: z.string().trim().optional(),
      })
    )
    .optional()
    .default([]),

  /**
   * Videos field:
   * Accepts an array of { url, alt }
   * Validation ensures valid URLs if provided (optional on creation)
   */
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

/**
 * Validation for updating a product
 * Uses partial() to make all fields optional while preserving validation logic
 */
export const updateProductValidation = createProductValidation.partial();
