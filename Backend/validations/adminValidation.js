import { z } from "zod";

export const createAdminValidation = z.object({
  userId: z
    .string()
    .length(24, "User ID must be a valid 24-character ObjectId")
    .regex(/^[0-9a-fA-F]{24}$/, "User ID must be a valid ObjectId"),

  designation: z.enum(["superadmin", "admin", "support", "finance"], {
    required_error: "Designation is required",
  }),

  department: z
    .string()
    .trim()
    .min(2, "Department must be at least 2 characters")
    .max(100, "Department cannot exceed 100 characters")
    .optional(),

  permissions: z
    .preprocess(
      (val) => (typeof val === "string" ? JSON.parse(val) : val),
      z.array(z.string().trim().min(1, "Permission cannot be empty"))
    )
    .optional(),

  contactEmail: z.string().email("Invalid contact email").optional(),

  contactPhone: z
    .string()
    .regex(/^\+?[0-9]{10,15}$/, "Invalid contact phone")
    .optional(),

  profilePic: z.string().optional(),

  notes: z.string().optional(),
});

export const updateAdminValidation = createAdminValidation.partial();
