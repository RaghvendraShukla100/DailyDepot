import { z } from "zod";

export const createAddressValidation = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(50, "Full name cannot exceed 50 characters"),
  phone: z
    .string()
    .trim()
    .regex(
      /^\\+?[0-9]{10,15}$/,
      "Phone number must be a valid format with 10-15 digits, optionally starting with +"
    ),
  email: z.string().trim().email("Invalid email format").optional(),
  addressLine1: z
    .string()
    .trim()
    .min(5, "Address Line 1 must be at least 5 characters")
    .max(200, "Address Line 1 cannot exceed 200 characters"),
  addressLine2: z
    .string()
    .trim()
    .max(200, "Address Line 2 cannot exceed 200 characters")
    .optional(),
  city: z
    .string()
    .trim()
    .min(2, "City must be at least 2 characters")
    .max(100, "City cannot exceed 100 characters"),
  state: z
    .string()
    .trim()
    .min(2, "State must be at least 2 characters")
    .max(100, "State cannot exceed 100 characters"),
  postalCode: z
    .string()
    .trim()
    .min(4, "Postal code must be at least 4 characters")
    .max(20, "Postal code cannot exceed 20 characters"),
  country: z
    .string()
    .trim()
    .min(2, "Country must be at least 2 characters")
    .max(100, "Country cannot exceed 100 characters")
    .default("India"),
  landmark: z
    .string()
    .trim()
    .max(200, "Landmark cannot exceed 200 characters")
    .optional(),
  addressType: z
    .enum(["home", "work", "other"], {
      errorMap: () => ({
        message: "Address type must be one of: home, work, other",
      }),
    })
    .default("home")
    .optional(),
  isDefault: z
    .boolean({ invalid_type_error: "isDefault must be a boolean" })
    .optional(),
  tag: z
    .enum(["primary", "secondary", "billing", "shipping"], {
      errorMap: () => ({
        message: "Tag must be one of: primary, secondary, billing, shipping",
      }),
    })
    .default("shipping")
    .optional(),
  notes: z
    .string()
    .trim()
    .max(500, "Notes cannot exceed 500 characters")
    .optional(),
  geoLocation: z
    .object({
      type: z.literal("Point", {
        errorMap: () => ({ message: "geoLocation.type must be 'Point'" }),
      }),
      coordinates: z.tuple(
        [
          z
            .number()
            .min(-180, "Longitude must be >= -180")
            .max(180, "Longitude must be <= 180"),
          z
            .number()
            .min(-90, "Latitude must be >= -90")
            .max(90, "Latitude must be <= 90"),
        ],
        {
          invalid_type_error:
            "Coordinates must be a tuple of [longitude, latitude]",
        }
      ),
      accuracy: z.number().min(0, "Accuracy cannot be negative").optional(),
    })
    .optional(),
});

export const updateAddressValidation = createAddressValidation.partial();
