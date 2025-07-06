// /backend/validations/addressValidation.js

import { z } from "zod";

export const createAddressValidation = z.object({
  fullName: z.string().min(2).max(50),
  phone: z.string().min(10).max(15),
  email: z.string().email().optional(),
  addressLine1: z.string().min(5).max(200),
  addressLine2: z.string().max(200).optional(),
  city: z.string().min(2).max(100),
  state: z.string().min(2).max(100),
  postalCode: z.string().min(4).max(20),
  country: z.string().min(2).max(100).default("India"),
  landmark: z.string().max(200).optional(),
  addressType: z.enum(["home", "work", "other"]).optional(),
  isDefault: z.boolean().optional(),
  tag: z.enum(["primary", "secondary", "billing", "shipping"]).optional(),
  notes: z.string().max(500).optional(),
  geoLocation: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
      accuracy: z.number().min(0).optional(),
    })
    .optional(),
});

export const updateAddressValidation = createAddressValidation.partial();
