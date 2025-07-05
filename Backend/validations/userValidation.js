import { z } from "zod";

export const updateUserProfileValidation = z.object({
  name: z.string().trim().min(2).max(50).optional(),
  bio: z.string().trim().max(300).optional(),
  phone: z.string().trim().optional(),
  address: z.string().trim().optional(),
});
