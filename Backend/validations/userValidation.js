import { z } from "zod";

export const updateUserProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  bio: z.string().max(300).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
