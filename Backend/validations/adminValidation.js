import { z } from "zod";

export const createAdminSchema = z.object({
  department: z.string().optional(),
  permissions: z.array(z.string()).optional(),
});
