// /backend/middlewares/rateLimiter.js

import rateLimit from "express-rate-limit";

/**
 * General API rate limiter
 * Limits each IP to 100 requests per 15 minutes
 * Use for general authenticated API routes if needed
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
  message: "Too many requests, please try again later.",
  standardHeaders: true, // Return rate limit info in RateLimit-* headers
  legacyHeaders: false, // Disable deprecated X-RateLimit-* headers
});

/**
 * Auth routes rate limiter (for login, register, request-password-reset)
 * Stricter limit to prevent abuse & brute-force attacks
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per window
  message: "Too many auth requests, please try again after 15 minutes.",
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Public routes rate limiter (optional)
 * Example: Analytics, public product browsing, etc.
 */
export const publicLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 60, // 60 requests per minute
  message: "Too many requests from this IP, please slow down.",
  standardHeaders: true,
  legacyHeaders: false,
});
