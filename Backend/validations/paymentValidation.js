// /backend/validations/paymentValidation.js

import { z } from "zod";

/**
 * Validation for creating a payment
 */
export const createPaymentValidation = z.object({
  order: z
    .string({
      required_error: "Order ID is required.",
    })
    .length(24, "Invalid Order ID."),
  paymentMethod: z.enum(
    ["credit_card", "debit_card", "upi", "net_banking", "cod", "wallet"],
    {
      required_error: "Payment method is required.",
    }
  ),
  amount: z
    .number({
      required_error: "Amount is required.",
      invalid_type_error: "Amount must be a valid number.",
    })
    .positive("Amount must be positive."),
  transactionId: z
    .string({
      required_error: "Transaction ID is required.",
    })
    .trim(),
  paymentGatewayResponse: z.object({}).passthrough().optional(),
  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});

/**
 * Validation for updating a payment
 */
export const updatePaymentValidation = z.object({
  paymentStatus: z.enum(["paid", "pending", "failed", "refunded"]).optional(),
  refundedAmount: z
    .number({
      invalid_type_error: "Refunded amount must be a valid number.",
    })
    .min(0, "Refunded amount cannot be negative.")
    .optional(),
  refundStatus: z.enum(["initiated", "completed", "failed"]).optional(),
  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters.")
    .optional(),
});
