// /backend/validations/wishlistValidation.js

import { z } from "zod";

/**
 * Validation for creating a new wishlist
 */
export const createWishlistValidation = z.object({
  name: z.string().trim().min(1, "Wishlist name is required."),
  isPublic: z.boolean().optional(),
  products: z
    .array(
      z.object({
        productId: z
          .string({
            required_error: "Product ID is required.",
          })
          .trim(),
        selectedSize: z
          .string()
          .trim()
          .max(50, "Selected size cannot exceed 50 characters.")
          .optional(),
        selectedColor: z
          .string()
          .trim()
          .max(50, "Selected color cannot exceed 50 characters.")
          .optional(),
        notes: z
          .string()
          .trim()
          .max(300, "Notes cannot exceed 300 characters.")
          .optional(),
      })
    )
    .optional(),
});

/**
 * Validation for updating wishlist properties (name, isPublic)
 */
export const updateWishlistValidation = z.object({
  name: z.string().trim().min(1, "Wishlist name is required.").optional(),
  isPublic: z.boolean().optional(),
});

/**
 * Validation for adding a product to the wishlist
 */
export const addWishlistItemValidation = z.object({
  productId: z
    .string({
      required_error: "Product ID is required.",
    })
    .trim(),
  selectedSize: z
    .string()
    .trim()
    .max(50, "Selected size cannot exceed 50 characters.")
    .optional(),
  selectedColor: z
    .string()
    .trim()
    .max(50, "Selected color cannot exceed 50 characters.")
    .optional(),
  notes: z
    .string()
    .trim()
    .max(300, "Notes cannot exceed 300 characters.")
    .optional(),
});

/**
 * Validation for updating a wishlist item's notes or options
 */
export const updateWishlistItemValidation = z.object({
  selectedSize: z
    .string()
    .trim()
    .max(50, "Selected size cannot exceed 50 characters.")
    .optional(),
  selectedColor: z
    .string()
    .trim()
    .max(50, "Selected color cannot exceed 50 characters.")
    .optional(),
  notes: z
    .string()
    .trim()
    .max(300, "Notes cannot exceed 300 characters.")
    .optional(),
});

/**
 * Validation for modifying (adding or removing) a product in wishlist
 */
export const modifyWishlistProductValidation = z.object({
  productId: z
    .string({
      required_error: "Product ID is required.",
    })
    .trim(),
});
