// /backend/validations/addressValidation.js

import { z } from "zod";

export const createAddressValidation = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50, "Name cannot exceed 50 characters").trim(),
  phone: z.string()
    .regex(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  addressLine1: z.string().min(5, "Address line 1 must be at least 5 characters").max(200, "Address line 1 cannot exceed 200 characters").trim(),
  addressLine2: z.string().max(200, "Address line 2 cannot exceed 200 characters").optional().trim(),
  city: z.string().min(2, "City must be at least 2 characters").max(100, "City cannot exceed 100 characters").trim(),
  state: z.string().min(2, "State must be at least 2 characters").max(100, "State cannot exceed 100 characters").trim(),
  postalCode: z.string()
    .regex(/^[0-9A-Za-z -]+$/, "Postal code format is invalid")
    .min(4, "Postal code must be at least 4 characters")
    .max(20, "Postal code cannot exceed 20 characters")
    .trim(),
  country: z.string().min(2, "Country must be at least 2 characters").max(100, "Country cannot exceed 100 characters").trim(),
  landmark: z.string().max(200, "Landmark cannot exceed 200 characters").optional().trim(),
  type: z.enum(["home", "work", "other"]).optional().default("home"),
  isDefault: z.boolean().optional(),
});

export const updateAddressValidation = createAddressValidation.partial();