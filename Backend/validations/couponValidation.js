// /backend/validations/couponValidation.js

import { z } from "zod";

/**
 * Validation for creating a coupon
 */
export const createCouponValidation = z.object({
  code: z
    .string({
      required_error: "Coupon code is required.",
    })
    .trim()
    .min(3, "Coupon code must be at least 3 characters.")
    .max(20, "Coupon code cannot exceed 20 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters.")
    .optional(),

  discountType: z.enum(["percentage", "flat"], {
    required_error: "Discount type is required.",
  }),

  discountValue: z
    .number({
      required_error: "Discount value is required.",
    })
    .positive("Discount value must be positive."),

  maxDiscountAmount: z
    .number()
    .positive("Max discount amount must be positive.")
    .optional(),

  minOrderAmount: z
    .number()
    .positive("Minimum order amount must be positive.")
    .optional(),

  validFrom: z.coerce.date({
    required_error: "Valid from date is required.",
  }),

  validTill: z.coerce.date({
    required_error: "Valid till date is required.",
  }),

  usageLimit: z.number().positive("Usage limit must be positive.").optional(),

  applicableCategories: z.array(z.string().trim()).optional(),

  applicableProducts: z.array(z.string().trim()).optional(),

  isStackable: z.boolean().optional().default(false),

  status: z
    .enum(["active", "expired", "inactive"])
    .optional()
    .default("active"),
});

/**
 * Validation for updating a coupon (partial updates)
 */
export const updateCouponValidation = createCouponValidation.partial();
