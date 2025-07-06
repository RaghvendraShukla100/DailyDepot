// /backend/validations/orderValidation.js

import { z } from "zod";

/**
 * Validation for creating an order
 */
export const createOrderValidation = z.object({
  items: z
    .array(
      z.object({
        product: z
          .string({
            required_error: "Product ID is required.",
          })
          .length(24, "Invalid Product ID."),
        quantity: z
          .number({
            required_error: "Quantity is required.",
            invalid_type_error: "Quantity must be a valid number.",
          })
          .int("Quantity must be an integer.")
          .positive("Quantity must be greater than zero."),
        priceAtPurchase: z
          .number({
            invalid_type_error: "Price at purchase must be a valid number.",
          })
          .positive("Price at purchase must be positive.")
          .optional(),
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
        seller: z.string().length(24, "Invalid Seller ID.").optional(),
      })
    )
    .min(1, "At least one order item is required."),

  shippingAddress: z
    .string({
      required_error: "Shipping address ID is required.",
    })
    .length(24, "Invalid Shipping Address ID."),

  paymentMethod: z.enum(["cod", "online", "wallet"], {
    required_error: "Payment method is required.",
  }),

  totalAmount: z
    .number({
      required_error: "Total amount is required.",
      invalid_type_error: "Total amount must be a valid number.",
    })
    .positive("Total amount must be positive."),

  appliedCoupon: z.string().length(24, "Invalid Coupon ID.").optional(),

  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});

/**
 * Validation for updating order status
 */
export const updateOrderStatusValidation = z.object({
  orderStatus: z.enum(
    ["pending", "processing", "shipped", "delivered", "cancelled", "returned"],
    {
      required_error: "Order status is required.",
    }
  ),
  deliveryDate: z
    .string()
    .datetime({
      message: "Delivery date must be a valid ISO datetime string.",
    })
    .optional(),
  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});

/**
 * Validation for updating payment status
 */
export const updatePaymentStatusValidation = z.object({
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"], {
    required_error: "Payment status is required.",
  }),
});
