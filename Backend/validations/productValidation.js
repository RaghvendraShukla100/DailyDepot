// Backend/validations/productValidation.js

import { z } from "zod";

export const createProductValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(200, "Name cannot exceed 200 characters").trim(),
  description: z.string().optional(),
  price: z.number().positive("Price must be positive"),
  category: z.string().length(24, "Invalid category ID"),
  brand: z.string().length(24, "Invalid brand ID").optional(),
  stock: z.number().int().min(0, "Stock cannot be negative").default(0),
  tags: z.array(z.string()).optional().default([]),
  images: z.array(
    z.object({
      url: z.string().url("Invalid image URL"),
      alt: z.string().optional(),
      public_id: z.string().optional(),
    })
  ).optional().default([]),
  isFeatured: z.boolean().optional(),
  status: z.enum(["active", "inactive", "deleted"]).optional().default("active"),
});

export const updateProductValidation = createProductValidation.partial();