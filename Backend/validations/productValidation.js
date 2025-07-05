// Backend/validations/productValidation.js

import { z } from "zod";

export const createProductValidation = z.object({
  name: z.string().min(2).max(200),
  description: z.string().optional(),
  price: z.number().positive(),
  category: z.string(), // Category ObjectId as string
  brand: z.string().optional(), // Brand ObjectId as string
  stock: z.number().int().min(0).default(0),
  tags: z.array(z.string()).optional(),
  images: z
    .array(
      z.object({
        url: z.string().url(),
        alt: z.string().optional(),
        public_id: z.string().optional(),
      })
    )
    .optional(),
  isFeatured: z.boolean().optional(),
  status: z.enum(["active", "inactive", "deleted"]).optional(),
});

export const updateProductValidation = createProductSchema.partial();
