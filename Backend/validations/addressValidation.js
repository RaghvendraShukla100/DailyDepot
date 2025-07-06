// /backend/validations/addressValidation.js

import { z } from "zod";

export const createAddressValidation = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  phone: z
    .string()
    .trim()
    .regex(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number cannot exceed 15 digits"),
  email: z.string().trim().email("Invalid email format").optional(),
  addressLine1: z
    .string()
    .trim()
    .min(5, "Address line 1 must be at least 5 characters")
    .max(200, "Address line 1 cannot exceed 200 characters"),
  addressLine2: z
    .string()
    .trim()
    .max(200, "Address line 2 cannot exceed 200 characters")
    .optional(),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters"),
  state: z
    .string()
    .trim()
    .min(2, "State must be at least 2 characters")
    .max(100, "State cannot exceed 100 characters"),
  postalCode: z
    .string()
    .trim()
    .regex(/^[0-9A-Za-z -]+$/, "Postal code format is invalid")
    .min(4, "Postal code must be at least 4 characters")
    .max(20, "Postal code cannot exceed 20 characters"),
  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country cannot exceed 100 characters")
    .default("India"),
  landmark: z
    .string()
    .trim()
    .max(200, "Landmark cannot exceed 200 characters")
    .optional(),
  addressType: z.enum(["home", "work", "other"]).optional().default("home"),
  isDefault: z.boolean().optional(),
  tag: z.enum(["primary", "secondary", "billing", "shipping"]).optional(),
  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
  geoLocation: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      accuracy: z.number().min(0).optional(),
    })
    .optional(),
});

export const updateAddressValidation = createAddressValidation.partial();
