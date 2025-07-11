import { z } from "zod";

const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

export const createSellerValidation = z.object({
  storeName: z
    .string({
      required_error: "Store name is required.",
    })
    .trim()
    .min(2, "Store name must be at least 2 characters.")
    .max(100, "Store name cannot exceed 100 characters."),

  storeDescription: z
    .string()
    .trim()
    .max(500, "Store description cannot exceed 500 characters.")
    .optional(),

  logoUrl: z.string().url("Invalid logo URL.").optional(),

  bannerUrl: z.string().url("Invalid banner URL.").optional(),

  gstNumber: z
    .string()
    .regex(gstRegex, "Invalid GST number format.")
    .optional(),

  panNumber: z
    .string()
    .regex(panRegex, "Invalid PAN number format.")
    .optional(),

  contactEmail: z.string().email("Invalid contact email format.").optional(),

  contactPhone: z
    .string()
    .regex(phoneRegex, "Invalid contact phone format.")
    .optional(),

  supportContact: z
    .string()
    .regex(phoneRegex, "Invalid support contact phone format.")
    .optional(),

  bankAccount: z
    .object({
      accountHolderName: z.string().trim().optional(),
      accountNumber: z.string().trim().optional(),
      ifscCode: z.string().trim().optional(),
      bankName: z.string().trim().optional(),
      branchName: z.string().trim().optional(),
      upiId: z.string().trim().optional(),
    })
    .optional(),

  address: z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid address ID.")
    .optional(),
});

export const updateSellerValidation = createSellerValidation.partial();
