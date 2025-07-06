// Backend/controllers/authController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import * as authService from "../services/authService.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Register user/seller/admin
// @route   POST /api/auth/register
// @access  Public
export const registerUserController = asyncHandler(async (req, res) => {
  const { userData, sellerData, adminData } = req.body;

  let result;
  if (userData && sellerData) {
    result = await authService.registerSeller(userData, sellerData);
  } else if (userData && adminData) {
    result = await authService.registerAdmin(userData, adminData);
  } else if (userData) {
    result = await authService.registerUser(userData);
  } else {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.GENERAL.BAD_REQUEST);
  }

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        result,
        MESSAGES.AUTH.REGISTER_SUCCESS
      )
    );
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const loginUserController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser(email, password);

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        { user, token },
        MESSAGES.AUTH.LOGIN_SUCCESS
      )
    );
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
export const logoutUserController = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, "Logged out successfully."));
});

// @desc    Request password reset
// @route   POST /api/auth/request-password-reset
// @access  Public
export const requestPasswordResetController = asyncHandler(async (req, res) => {
  const { email } = req.body;
  await authService.requestPasswordReset(email);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        "Password reset email sent if account exists."
      )
    );
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
export const resetPasswordController = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  await authService.resetPassword(token, password);

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, "Password reset successful."));
});

// @desc    Verify email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmailController = asyncHandler(async (req, res) => {
  const { token } = req.params;

  await authService.verifyEmail(token);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Email verification successful.")
    );
});
