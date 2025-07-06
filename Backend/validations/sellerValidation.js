// /backend/validations/sellerValidation.js

import { z } from "zod";

/**
 * Validation for creating a seller
 */
export const createSellerValidation = z.object({
  shopName: z
    .string({
      required_error: "Shop name is required.",
    })
    .trim()
    .min(2, "Shop name must be at least 2 characters.")
    .max(100, "Shop name cannot exceed 100 characters."),

  gstNumber: z
    .string()
    // .regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}[Z]{1}[A-Z0-9]{1}$/, "Invalid GST number format.")
    .trim()
    .optional(),

  address: z
    .string()
    .trim()
    .max(300, "Address cannot exceed 300 characters.")
    .optional(),
});

/**
 * Validation for updating a seller profile (partial updates)
 * Used in:
 *    PUT /api/sellers/me
 *    PUT /api/sellers/:id (admin if needed)
 */
export const updateSellerValidation = createSellerValidation.partial();
