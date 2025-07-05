import { z } from "zod";

// Create Admin Schema
export const createAdminValidation = z.object({
  department: z
    .string()
    .trim()
    .min(2, "Department must be at least 2 characters")
    .max(100, "Department cannot exceed 100 characters")
    .optional(),

  permissions: z
    .array(z.string().trim().min(1, "Permission cannot be empty"))
    .optional(),
});

// Update Admin Schema (partial for PATCH/PUT flexibility)
export const updateAdminProfileValidation = createAdminSchema.partial();
