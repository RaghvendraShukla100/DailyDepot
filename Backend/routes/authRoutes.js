import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  requestPasswordReset,
  resetPassword,
  verifyEmail,
} from "../controllers/authController.js";
import validateResource from "../middlewares/validateResource.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation.js";
import { protect } from "../middlewares/authMiddleware.js";
import { authLimiter } from "../middlewares/rateLimiter.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register user (user, seller, admin)
 * @access  Public
 */
router.post(
  "/register",
  authLimiter,
  validateResource(registerValidation),
  asyncHandler(registerUser)
);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post(
  "/login",
  authLimiter,
  validateResource(loginValidation),
  asyncHandler(loginUser)
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user
 * @access  Private
 */
router.post("/logout", protect, asyncHandler(logoutUser));

/**
 * @route   POST /api/auth/request-password-reset
 * @desc    Request password reset
 * @access  Public
 */
router.post(
  "/request-password-reset",
  authLimiter,
  asyncHandler(requestPasswordReset)
);

/**
 * @route   POST /api/auth/reset-password/:token
 * @desc    Reset password using token
 * @access  Public
 */
router.post("/reset-password/:token", asyncHandler(resetPassword));

/**
 * @route   GET /api/auth/verify-email/:token
 * @desc    Verify email using token
 * @access  Public
 */
router.get("/verify-email/:token", asyncHandler(verifyEmail));

export default router;
