// /Backend/validations/paymentValidation.js

import { z } from "zod";

/**
 * Schema for creating a payment
 */
export const createPaymentValidation = z.object({
  order: z.string({ required_error: "Order ID is required." }),
  paymentMethod: z.enum(
    ["credit_card", "debit_card", "upi", "net_banking", "cod", "wallet"],
    {
      required_error: "Payment method is required.",
    }
  ),
  amount: z
    .number({ required_error: "Amount is required." })
    .positive("Amount must be positive."),
  transactionId: z.string({ required_error: "Transaction ID is required." }),
  paymentGatewayResponse: z.object({}).passthrough().optional(),
  notes: z.string().max(500).optional(),
});

/**
 * Schema for updating a payment
 */
export const updatePaymentValidation = z.object({
  paymentStatus: z.enum(["paid", "pending", "failed", "refunded"]).optional(),
  refundedAmount: z
    .number()
    .min(0, "Refunded amount cannot be negative")
    .optional(),
  refundStatus: z.enum(["initiated", "completed", "failed"]).optional(),
  notes: z.string().max(500).optional(),
});
