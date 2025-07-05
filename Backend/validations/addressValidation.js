// /backend/validations/addressValidation.js

import { z } from "zod";

export const createAddressSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(10).max(15),
  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  postalCode: z.string().min(4).max(20),
  country: z.string().min(2).max(100),
  landmark: z.string().max(200).optional(),
  type: z.enum(["home", "work", "other"]).optional(),
  isDefault: z.boolean().optional(),
});

export const updateAddressSchema = createAddressSchema.partial();
