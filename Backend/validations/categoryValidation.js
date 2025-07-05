import { z } from "zod";

export const createCategoryValidation = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z.string().trim().min(2).max(100),
  description: z.string().trim().optional(),
  parentCategory: z.string().trim().optional(),
  image: z
    .object({
      url: z.string().url().optional(),
      public_id: z.string().optional(),
    })
    .optional(),
  isFeatured: z.boolean().optional().default(false),
  status: z
    .enum(["active", "inactive", "deleted"])
    .optional()
    .default("active"),
});

export const updateCategoryValidation = createCategorySchema.partial();
