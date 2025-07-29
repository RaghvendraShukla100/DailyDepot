import { z } from "zod";

export const createBrandValidation = z.object({
  name: z
    .string({
      required_error: "Brand name is required.",
      invalid_type_error: "Brand name must be a string.",
    })
    .trim()
    .min(2, "Brand name must be at least 2 characters.")
    .max(100, "Brand name must be at most 100 characters."),

  slug: z
    .string({
      invalid_type_error: "Slug must be a string.",
    })
    .trim()
    .min(2, "Slug must be at least 2 characters.")
    .max(100, "Slug must be at most 100 characters.")
    .optional(), // <----- Make slug optional here

  description: z
    .string({
      invalid_type_error: "Description must be a string.",
    })
    .trim()
    .optional(),

  logo: z
    .object({
      url: z
        .string({
          invalid_type_error: "Logo URL must be a string.",
        })
        .url("Logo URL must be a valid URL.")
        .trim()
        .optional(),
      public_id: z
        .string({
          invalid_type_error: "Logo public_id must be a string.",
        })
        .trim()
        .optional(),
    })
    .optional(),

  status: z
    .enum(["active", "inactive", "deleted"], {
      invalid_type_error:
        "Status must be one of 'active', 'inactive', or 'deleted'.",
    })
    .optional(),
});

export const updateBrandValidation = createBrandValidation.partial();
