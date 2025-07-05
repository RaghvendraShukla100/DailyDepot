import { z } from "zod";

export const createAnalyticsValidation = z.object({
  sessionId: z.string().trim().optional(),
  eventType: z.enum([
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
  ]),
  eventData: z.object({}).passthrough().optional(),
  device: z.enum(["mobile", "desktop", "tablet"]).optional(),
  browser: z.string().trim().optional(),
  os: z.string().trim().optional(),
  country: z.string().trim().optional(),
  city: z.string().trim().optional(),
  ipAddress: z.string().trim().optional(),
  userAgent: z.string().trim().optional(),
  referrer: z.string().trim().optional(),
});
