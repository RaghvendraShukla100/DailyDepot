import { z } from "zod";

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

const objectId = z
  .string({ required_error: "ObjectId is required" })
  .regex(objectIdRegex, { message: "Invalid ObjectId format" });

const couponSchema = z.object({
  code: z
    .string({ required_error: "Coupon code is required" })
    .trim()
    .min(1, { message: "Coupon code cannot be empty" })
    .transform((val) => val.toUpperCase()),

  description: z
    .string({ invalid_type_error: "Description must be a string" })
    .trim()
    .optional(),

  imageUrl: z
    .string({ invalid_type_error: "Image URL must be a valid string" })
    .url({ message: "Invalid image URL" })
    .nullable()
    .optional(),

  discountType: z.enum(["percentage", "flat"], {
    required_error: "Discount type is required",
    invalid_type_error: "Discount type must be either 'percentage' or 'flat'",
  }),

  discountValue: z
    .number({
      required_error: "Discount value is required",
      invalid_type_error: "Discount value must be a number",
    })
    .min(0, { message: "Discount value must be greater than or equal to 0" }),

  maxDiscountAmount: z
    .number({ invalid_type_error: "Max discount must be a number" })
    .nonnegative({ message: "Max discount must be >= 0" })
    .nullable()
    .optional(),

  minOrderAmount: z
    .number({ invalid_type_error: "Min order amount must be a number" })
    .nonnegative({ message: "Min order amount must be >= 0" })
    .optional(),

  usageLimit: z
    .number({ invalid_type_error: "Usage limit must be a number" })
    .int({ message: "Usage limit must be an integer" })
    .positive({ message: "Usage limit must be > 0" })
    .nullable()
    .optional(),

  usedCount: z
    .number({ invalid_type_error: "Used count must be a number" })
    .int({ message: "Used count must be an integer" })
    .nonnegative({ message: "Used count cannot be negative" })
    .optional(),

  usedBy: z
    .array(
      z.object({
        userId: objectId,
        usedCount: z
          .number({ invalid_type_error: "Used count must be a number" })
          .int({ message: "Used count must be an integer" })
          .positive({ message: "Used count must be greater than 0" })
          .default(1),
      })
    )
    .optional(),

  usersUsed: z
    .array(objectId, {
      invalid_type_error: "Users used must be an array of user IDs",
    })
    .optional(),

  validFrom: z.coerce
    .date({ invalid_type_error: "Valid from must be a valid date" })
    .refine((val) => val instanceof Date && !isNaN(val), {
      message: "Invalid validFrom date",
    }),

  validTill: z.coerce
    .date({ invalid_type_error: "Valid till must be a valid date" })
    .refine((val) => val instanceof Date && !isNaN(val), {
      message: "Invalid validTill date",
    }),

  isStackable: z
    .boolean({ invalid_type_error: "isStackable must be a boolean" })
    .optional(),

  status: z
    .enum(["active", "expired", "inactive"], {
      invalid_type_error: "Status must be 'active', 'expired', or 'inactive'",
    })
    .optional(),

  applicableProducts: z
    .array(objectId, {
      invalid_type_error: "Applicable products must be ObjectIds",
    })
    .optional(),

  applicableCategories: z
    .array(objectId, {
      invalid_type_error: "Applicable categories must be ObjectIds",
    })
    .optional(),

  applicableUserIds: z
    .array(objectId, {
      invalid_type_error: "Applicable users must be ObjectIds",
    })
    .optional(),

  deleted: z
    .boolean({ invalid_type_error: "Deleted must be a boolean" })
    .optional(),

  deletedAt: z.coerce
    .date({ invalid_type_error: "DeletedAt must be a valid date or null" })
    .nullable()
    .optional(),
});

export const createCouponValidation = couponSchema;

export const updateCouponValidation = couponSchema.partial();
