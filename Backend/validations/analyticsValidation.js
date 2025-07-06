import { z } from "zod";

export const createAnalyticsValidation = z.object({
  sessionId: z
    .string({ required_error: "Session ID must be a string." })
    .trim()
    .optional(),
  eventType: z.enum(
    [
      "page_view",
      "product_view",
      "add_to_cart",
      "purchase",
      "wishlist_add",
      "search",
      "login",
      "signup",
      "click",
      "scroll",
    ],
    {
      required_error: "Event type is required.",
      invalid_type_error: "Event type must be a valid predefined value.",
    }
  ),
  eventData: z
    .object({})
    .passthrough()
    .optional()
    .refine(() => true, { message: "Event data must be an object." }),
  device: z
    .enum(["mobile", "desktop", "tablet"], {
      invalid_type_error:
        "Device must be one of 'mobile', 'desktop', or 'tablet'.",
    })
    .optional(),
  browser: z
    .string({ invalid_type_error: "Browser must be a string." })
    .trim()
    .optional(),
  os: z
    .string({ invalid_type_error: "Operating system must be a string." })
    .trim()
    .optional(),
  country: z
    .string({ invalid_type_error: "Country must be a string." })
    .trim()
    .optional(),
  city: z
    .string({ invalid_type_error: "City must be a string." })
    .trim()
    .optional(),
  ipAddress: z
    .string({ invalid_type_error: "IP address must be a string." })
    .trim()
    .regex(
      /^(([0-9]{1,3}\.){3}[0-9]{1,3}|(([a-fA-F0-9:]+:+)+[a-fA-F0-9]+))$/,
      "IP address must be a valid IPv4 or IPv6 format."
    )
    .optional(),
  userAgent: z
    .string({ invalid_type_error: "User agent must be a string." })
    .trim()
    .optional(),
  referrer: z
    .string({ invalid_type_error: "Referrer must be a string." })
    .trim()
    .optional(),
});
