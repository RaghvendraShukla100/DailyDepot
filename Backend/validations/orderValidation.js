// /backend/validations/orderValidation.js

import { z } from "zod";

export const createOrderValidation = z.object({
  items: z
    .array(
      z.object({
        product: z.string().min(1, "Product ID is required"),
        quantity: z.number().int().positive(),
        priceAtPurchase: z.number().optional(),
        selectedSize: z.string().optional(),
        selectedColor: z.string().optional(),
        seller: z.string().optional(),
      })
    )
    .min(1, "At least one order item is required"),

  shippingAddress: z.string().min(1, "Shipping address is required"),

  paymentMethod: z.enum(["cod", "online", "wallet"]),

  totalAmount: z.number().positive(),

  appliedCoupon: z.string().optional(),

  notes: z.string().optional(),
});

export const updateOrderStatusValidation = z.object({
  orderStatus: z.enum([
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
    "returned",
  ]),
  deliveryDate: z.string().optional(),
  notes: z.string().optional(),
});

export const updatePaymentStatusValidation = z.object({
  paymentStatus: z.enum(["pending", "paid", "failed", "refunded"]),
});
