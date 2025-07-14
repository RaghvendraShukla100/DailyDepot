import { z } from "zod";

export const createAddressValidation = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, { message: "Full name must be at least 2 characters long." })
    .max(50, { message: "Full name cannot exceed 50 characters." }),

  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9]{10,15}$/, {
      message:
        "Phone number must be 10-15 digits, optionally starting with '+'.",
    }),

  email: z
    .string()
    .trim()
    .email({ message: "Email must be a valid email address." })
    .optional(),

  addressLine1: z
    .string()
    .trim()
    .min(5, { message: "Address Line 1 must be at least 5 characters long." })
    .max(200, { message: "Address Line 1 cannot exceed 200 characters." }),

  addressLine2: z
    .string()
    .trim()
    .max(200, { message: "Address Line 2 cannot exceed 200 characters." })
    .optional(),

  city: z
    .string()
    .trim()
    .min(2, { message: "City must be at least 2 characters long." })
    .max(100, { message: "City cannot exceed 100 characters." }),

  state: z
    .string()
    .trim()
    .min(2, { message: "State must be at least 2 characters long." })
    .max(100, { message: "State cannot exceed 100 characters." }),

  postalCode: z
    .string()
    .trim()
    .min(4, { message: "Postal code must be at least 4 characters long." })
    .max(20, { message: "Postal code cannot exceed 20 characters." }),

  country: z
    .string()
    .trim()
    .min(2, { message: "Country must be at least 2 characters long." })
    .max(100, { message: "Country cannot exceed 100 characters." })
    .default("India"),

  landmark: z
    .string()
    .trim()
    .max(200, { message: "Landmark cannot exceed 200 characters." })
    .optional(),

  addressType: z
    .enum(["home", "work", "other"], {
      errorMap: () => ({
        message: "Address type must be one of: home, work, other.",
      }),
    })
    .default("home")
    .optional(),

  isDefault: z
    .boolean({ invalid_type_error: "isDefault must be a boolean." })
    .optional(),

  tag: z
    .enum(["primary", "secondary", "billing", "shipping"], {
      errorMap: () => ({
        message: "Tag must be one of: primary, secondary, billing, shipping.",
      }),
    })
    .default("shipping")
    .optional(),

  notes: z
    .string()
    .trim()
    .max(500, { message: "Notes cannot exceed 500 characters." })
    .optional(),

  geoLocation: z
    .object({
      type: z.literal("Point", {
        errorMap: () => ({
          message: "geoLocation.type must be 'Point'.",
        }),
      }),
      coordinates: z.tuple([
        z
          .number({
            invalid_type_error: "Longitude must be a number.",
          })
          .min(-180, { message: "Longitude must be >= -180." })
          .max(180, { message: "Longitude must be <= 180." }),
        z
          .number({
            invalid_type_error: "Latitude must be a number.",
          })
          .min(-90, { message: "Latitude must be >= -90." })
          .max(90, { message: "Latitude must be <= 90." }),
      ]),
      accuracy: z
        .number({
          invalid_type_error: "Accuracy must be a number.",
        })
        .min(0, { message: "Accuracy cannot be negative." })
        .optional(),
    })
    .optional(),
});

export const updateAddressValidation = createAddressValidation.partial();
