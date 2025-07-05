import { z } from "zod";

export const registerValidation = z.object({
  name: z.string().trim().min(2).max(50),
  email: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6),
});

export const loginValidation = z.object({
  email: z
    .string()
    .trim()
    .email()
    .transform((val) => val.toLowerCase()),
  password: z.string().min(6),
});
