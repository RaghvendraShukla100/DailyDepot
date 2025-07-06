// /backend/validations/userValidation.js

import { z } from "zod";

export const updateUserProfileValidation = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters.")
    .max(50, "Name cannot exceed 50 characters.")
    .optional(),

  bio: z
    .string()
    .trim()
    .max(300, "Bio cannot exceed 300 characters.")
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(/^[0-9]{10,15}$/, "Phone number must be between 10 to 15 digits.")
    .optional(),

  address: z
    .object({
      fullName: z.string().trim().min(2).max(50),
      phone: z.string().trim().min(10).max(15),
      email: z.string().trim().email().optional(),
      addressLine1: z.string().trim().min(5).max(200),
      addressLine2: z.string().trim().max(200).optional(),
      city: z.string().trim().min(2).max(100),
      state: z.string().trim().min(2).max(100),
      postalCode: z.string().trim().min(4).max(20),
      country: z.string().trim().min(2).max(100).default("India"),
      landmark: z.string().trim().max(200).optional(),
      addressType: z.enum(["home", "work", "other"]).optional(),
      isDefault: z.boolean().optional(),
      tag: z.enum(["primary", "secondary", "billing", "shipping"]).optional(),
      notes: z.string().trim().max(500).optional(),
      geoLocation: z
        .object({
          lat: z.number().min(-90).max(90),
          lng: z.number().min(-180).max(180),
          accuracy: z.number().min(0).optional(),
        })
        .optional(),
    })
    .optional(),
});
