import { z } from "zod";

// ------------------ Media Schema ------------------
const mediaSchema = z.object({
  url: z.string().url("Invalid media URL."),
  alt: z.string().trim().optional().default(""),
});

// ------------------ Variant Schema ------------------
const variantSchema = z.object({
  sku: z.string().trim().min(1, "SKU is required."),
  color: z.string().trim().optional(),
  size: z.string().trim().optional(),
  price: z.coerce.number().positive("Price must be positive."),
  discount: z.coerce.number().min(0).max(100).optional().default(0),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative."),
  sold: z.coerce.number().int().min(0).optional().default(0),
  images: z.array(mediaSchema).min(1, "At least one image is required."),
});

// ------------------ Dimensions Schema ------------------
const dimensionsSchema = z
  .object({
    length: z.coerce.number().min(0).optional(),
    width: z.coerce.number().min(0).optional(),
    height: z.coerce.number().min(0).optional(),
  })
  .optional()
  .default({});

// ------------------ Meta Schema ------------------
const metaSchema = z
  .object({
    title: z.string().trim().optional(),
    description: z.string().trim().optional(),
    keywords: z.array(z.string().trim()).optional().default([]),
  })
  .optional()
  .default({});

// ------------------ Create Product Validation ------------------
export const createProductValidation = z.object({
  name: z.string().trim().min(2).max(200),
  slug: z.string().trim().optional(), // Generated via slugify; optional in input
  description: z.string().trim().min(5).max(2000),

  price: z.coerce.number().positive("Price must be positive."),
  discount: z.coerce.number().min(0).max(100).optional().default(0),
  stock: z.coerce.number().int().min(0).default(0),
  sold: z.coerce.number().int().min(0).optional().default(0),

  category: z.string().length(24, "Invalid category ID."),
  brand: z.string().length(24, "Invalid brand ID."),

  images: z.array(mediaSchema).min(1, "At least one image is required."),
  videos: z.array(mediaSchema).optional().default([]),

  variants: z.array(variantSchema).optional().default([]),

  colors: z.array(z.string().trim()).optional().default([]),
  sizes: z.array(z.string().trim()).optional().default([]),

  ratingsAverage: z.coerce.number().min(0).max(5).optional().default(0),
  ratingsCount: z.coerce.number().min(0).optional().default(0),

  reviews: z.array(z.string().length(24)).optional().default([]),

  tags: z.array(z.string().trim()).optional().default([]),

  weight: z.coerce.number().min(0).optional(),
  dimensions: dimensionsSchema,

  meta: metaSchema,

  isPublished: z.boolean().optional().default(true),
  isFeatured: z.boolean().optional().default(false),
});
export const updateProductValidation = createProductValidation.partial();
