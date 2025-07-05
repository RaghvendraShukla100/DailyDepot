import { z } from "zod";

export const createSellerSchema = z.object({
  shopName: z.string().trim().min(2).max(100),
  gstNumber: z
    .string()
    // .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, "Invalid GST number")
    .trim()
    .optional(),
  address: z.string().trim().optional(),
});

export const updateSellerSchema = createSellerSchema.partial();
