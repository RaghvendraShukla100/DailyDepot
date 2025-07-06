import express from "express";
import {
  registerUserController,
  loginUserController,
  logoutUserController,
  requestPasswordResetController,
  resetPasswordController,
  verifyEmailController,
} from "../controllers/authController.js";

import validateResourceMiddleware from "../middlewares/validateResource.js";
import {
  registerValidation,
  loginValidation,
} from "../validations/authValidation.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register user (user, seller, admin)
// @access  Public
router.post(
  "/register",
  validateResourceMiddleware(registerValidation),
  registerUserController
);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post(
  "/login",
  validateResourceMiddleware(loginValidation),
  loginUserController
);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private
router.post("/logout", protect, logoutUserController);

// @route   POST /api/auth/request-password-reset
// @desc    Request password reset
// @access  Public
router.post("/request-password-reset", requestPasswordResetController);

// @route   POST /api/auth/reset-password/:token
// @desc    Reset password using token
// @access  Public
router.post("/reset-password/:token", resetPasswordController);

// @route   GET /api/auth/verify-email/:token
// @desc    Verify email using token
// @access  Public
router.get("/verify-email/:token", verifyEmailController);

export default router;
