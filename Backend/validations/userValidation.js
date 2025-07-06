// /backend/validations/userValidation.js

import { z } from "zod";

// Phone regex for +country and 10-15 digit validation
const phoneRegex = /^\+?[0-9]{10,15}$/;

// Password regex with clear message
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])/;

// ==============================
// Register User Validation
// ==============================
export const registerUserValidation = z
  .object({
    name: z
      .string({
        required_error: "Name is required.",
        invalid_type_error: "Name must be a string.",
      })
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name cannot exceed 50 characters."),

    email: z
      .string({
        required_error: "Email is required.",
        invalid_type_error: "Email must be a string.",
      })
      .trim()
      .email("Please enter a valid email address."),

    password: z
      .string({
        required_error: "Password is required.",
        invalid_type_error: "Password must be a string.",
      })
      .min(8, "Password must be at least 8 characters long.")
      .regex(
        passwordRegex,
        "Password must include at least one uppercase letter, one lowercase letter, one number, and one special character."
      ),

    phone: z
      .string()
      .trim()
      .regex(
        phoneRegex,
        "Please enter a valid phone number with 10-15 digits. Include country code if applicable."
      )
      .optional(),

    gender: z
      .enum(["male", "female", "other"], {
        invalid_type_error: "Gender must be 'male', 'female', or 'other'.",
      })
      .optional(),

    dob: z.coerce
      .date({
        invalid_type_error: "Date of birth must be a valid date.",
      })
      .optional(),

    profilePic: z
      .string()
      .trim()
      .url("Profile picture must be a valid URL.")
      .optional(),

    bio: z
      .string()
      .trim()
      .max(300, "Bio cannot exceed 300 characters.")
      .optional(),

    preferences: z
      .object({
        theme: z
          .enum(["light", "dark"], {
            invalid_type_error: "Theme must be 'light' or 'dark'.",
          })
          .optional(),
        language: z
          .string()
          .trim()
          .max(10, "Language code cannot exceed 10 characters.")
          .optional(),
      })
      .optional(),
  })
  .strict();

// ==============================
// Update User Profile Validation
// ==============================
export const updateUserProfileValidation = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(50, "Name cannot exceed 50 characters.")
      .optional(),

    bio: z
      .string()
      .trim()
      .max(300, "Bio cannot exceed 300 characters.")
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(
        phoneRegex,
        "Please enter a valid phone number with 10-15 digits. Include country code if applicable."
      )
      .optional(),

    gender: z
      .enum(["male", "female", "other"], {
        invalid_type_error: "Gender must be 'male', 'female', or 'other'.",
      })
      .optional(),

    dob: z.coerce
      .date({
        invalid_type_error: "Date of birth must be a valid date.",
      })
      .optional(),

    profilePic: z
      .string()
      .trim()
      .url("Profile picture must be a valid URL.")
      .optional(),

    preferences: z
      .object({
        theme: z
          .enum(["light", "dark"], {
            invalid_type_error: "Theme must be 'light' or 'dark'.",
          })
          .optional(),
        language: z
          .string()
          .trim()
          .max(10, "Language code cannot exceed 10 characters.")
          .optional(),
      })
      .optional(),

    address: z
      .object({
        fullName: z
          .string()
          .trim()
          .min(2, "Full name must be at least 2 characters.")
          .max(50, "Full name cannot exceed 50 characters."),
        phone: z
          .string()
          .trim()
          .regex(
            phoneRegex,
            "Please enter a valid phone number with 10-15 digits."
          ),
        email: z
          .string()
          .trim()
          .email("Please enter a valid email address.")
          .optional(),
        addressLine1: z
          .string()
          .trim()
          .min(5, "Address Line 1 must be at least 5 characters.")
          .max(200, "Address Line 1 cannot exceed 200 characters."),
        addressLine2: z
          .string()
          .trim()
          .max(200, "Address Line 2 cannot exceed 200 characters.")
          .optional(),
        city: z
          .string()
          .trim()
          .min(2, "City must be at least 2 characters.")
          .max(100, "City cannot exceed 100 characters."),
        state: z
          .string()
          .trim()
          .min(2, "State must be at least 2 characters.")
          .max(100, "State cannot exceed 100 characters."),
        postalCode: z
          .string()
          .trim()
          .min(4, "Postal code must be at least 4 characters.")
          .max(20, "Postal code cannot exceed 20 characters."),
        country: z
          .string()
          .trim()
          .min(2, "Country must be at least 2 characters.")
          .max(100, "Country cannot exceed 100 characters.")
          .default("India"),
        landmark: z
          .string()
          .trim()
          .max(200, "Landmark cannot exceed 200 characters.")
          .optional(),
        addressType: z
          .enum(["home", "work", "other"], {
            invalid_type_error:
              "Address type must be 'home', 'work', or 'other'.",
          })
          .optional(),
        isDefault: z.boolean().optional(),
        tag: z
          .enum(["primary", "secondary", "billing", "shipping"], {
            invalid_type_error:
              "Tag must be 'primary', 'secondary', 'billing', or 'shipping'.",
          })
          .optional(),
        notes: z
          .string()
          .trim()
          .max(500, "Notes cannot exceed 500 characters.")
          .optional(),
        geoLocation: z
          .object({
            lat: z
              .number()
              .min(-90, "Latitude must be >= -90.")
              .max(90, "Latitude must be <= 90."),
            lng: z
              .number()
              .min(-180, "Longitude must be >= -180.")
              .max(180, "Longitude must be <= 180."),
            accuracy: z
              .number()
              .min(0, "Accuracy cannot be negative.")
              .optional(),
          })
          .optional(),
      })
      .optional(),
  })
  .strict();

export const loginUserValidation = z.object({
  email: z.string().email("A valid email is required."),
  password: z.string().min(8, "Password must be at least 8 characters."),
});
