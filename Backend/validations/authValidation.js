import { z } from "zod";

/**
 * Register Validation aligned with userSchema
 */
export const registerValidation = z.object({
  name: z.object({
    first: z
      .string({
        required_error: "First name is required.",
        invalid_type_error: "First name must be a string.",
      })
      .trim()
      .min(2, "First name must be at least 2 characters.")
      .max(50, "First name must be at most 50 characters."),
    last: z
      .string({
        required_error: "Last name is required.",
        invalid_type_error: "Last name must be a string.",
      })
      .trim()
      .min(2, "Last name must be at least 2 characters.")
      .max(50, "Last name must be at most 50 characters."),
  }),
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string.",
    })
    .trim()
    .email("Please enter a valid email address.")
    .transform((val) => val.toLowerCase()),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .min(6, "Password must be at least 6 characters."),
  phone: z
    .string({
      invalid_type_error: "Phone number must be a string.",
    })
    .trim()
    .min(10, "Phone number must be at least 10 digits.")
    .max(15, "Phone number must be at most 15 digits.")
    .optional(),
});

/**
 * Login Validation aligned with userSchema
 */
export const loginValidation = z.object({
  email: z
    .string({
      required_error: "Email is required.",
      invalid_type_error: "Email must be a string.",
    })
    .trim()
    .email("Please enter a valid email address.")
    .transform((val) => val.toLowerCase()),
  password: z
    .string({
      required_error: "Password is required.",
      invalid_type_error: "Password must be a string.",
    })
    .min(6, "Password must be at least 6 characters."),
});
