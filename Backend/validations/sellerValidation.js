import { z } from "zod";

export const createSellerSchema = z.object({
  shopName: z.string().min(2).max(100),
  gstNumber: z.string().optional(),
  address: z.string().optional(),
});
