import { z } from "zod";

export const createAdminSchema = z.object({
  department: z.string().trim().optional(),
  permissions: z.array(z.string().trim()).optional(),
});

export const updateAdminSchema = createAdminSchema.partial();
