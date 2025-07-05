import { z } from "zod";

export const createCouponValidation = z.object({
  code: z.string().trim().min(3).max(20),
  description: z.string().trim().optional(),
  discountType: z.enum(["percentage", "flat"]),
  discountValue: z.number().positive(),
  maxDiscountAmount: z.number().optional(),
  minOrderAmount: z.number().optional(),
  validFrom: z.coerce.date(),
  validTill: z.coerce.date(),
  usageLimit: z.number().optional(),
  applicableCategories: z.array(z.string().trim()).optional(),
  applicableProducts: z.array(z.string().trim()).optional(),
  isStackable: z.boolean().optional().default(false),
  status: z
    .enum(["active", "expired", "inactive"])
    .optional()
    .default("active"),
});

export const updateCouponValidation = createCouponValidation.partial();
