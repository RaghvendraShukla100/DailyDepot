import { z } from "zod";

/**
 * Schema for adding an item to the cart
 * Used in POST /api/cart/add
 */
export const addToCartSchema = z.object({
  productId: z.string({
    required_error: "Product ID is required.",
  }),
  quantity: z
    .number({
      required_error: "Quantity is required.",
    })
    .min(1, "Quantity must be at least 1."),
  selectedSize: z
    .string()
    .max(50, "Size must be at most 50 characters.")
    .optional(),
  selectedColor: z
    .string()
    .max(50, "Color must be at most 50 characters.")
    .optional(),
  appliedCoupon: z.string().optional(),
  notes: z
    .string()
    .max(300, "Notes must be at most 300 characters.")
    .optional(),
});

/**
 * Schema for updating a cart item
 * Used in PUT /api/cart/update/:id
 */
export const updateCartItemSchema = z.object({
  quantity: z.number().min(1, "Quantity must be at least 1.").optional(),
  selectedSize: z
    .string()
    .max(50, "Size must be at most 50 characters.")
    .optional(),
  selectedColor: z
    .string()
    .max(50, "Color must be at most 50 characters.")
    .optional(),
  appliedCoupon: z.string().optional(),
  notes: z
    .string()
    .max(300, "Notes must be at most 300 characters.")
    .optional(),
});
