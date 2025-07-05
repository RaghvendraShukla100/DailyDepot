import { z } from "zod";

/**
 * Schema for creating a new wishlist
 */
export const createWishlistValidation = z.object({
  name: z.string().min(1, "Wishlist name is required."),
  isPublic: z.boolean().optional(),
  products: z
    .array(
      z.object({
        productId: z.string({
          required_error: "Product ID is required.",
        }),
        selectedSize: z.string().max(50).optional(),
        selectedColor: z.string().max(50).optional(),
        notes: z.string().max(300).optional(),
      })
    )
    .optional(),
});

/**
 * Schema for updating wishlist properties (name, isPublic)
 */
export const updateWishlistValidation = z.object({
  name: z.string().min(1).optional(),
  isPublic: z.boolean().optional(),
});

/**
 * Schema for adding a product to the wishlist
 */
export const addWishlistItemValidation = z.object({
  productId: z.string({
    required_error: "Product ID is required.",
  }),
  selectedSize: z.string().max(50).optional(),
  selectedColor: z.string().max(50).optional(),
  notes: z.string().max(300).optional(),
});

/**
 * Schema for updating a wishlist item's notes or options
 */
export const updateWishlistItemValidation = z.object({
  selectedSize: z.string().max(50).optional(),
  selectedColor: z.string().max(50).optional(),
  notes: z.string().max(300).optional(),
});
