// /backend/validations/brandValidation.js

import { z } from "zod";

export const createBrandValidation = z.object({
  name: z.string().min(2).max(100),
  slug: z.string().min(2).max(100),
  description: z.string().optional(),
  logo: z
    .object({
      url: z.string().url().optional(),
      public_id: z.string().optional(),
    })
    .optional(),
  status: z.enum(["active", "inactive", "deleted"]).optional(),
});

export const updateBrandValidation = createBrandSchema.partial();
