// /backend/controllers/authController.js

import * as authService from "../services/authService.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc    Register user / seller / admin
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = async (req, res) => {
  const { userData, sellerData, adminData } = req.body;

  let effectiveUserData = userData || req.body; // allow fallback

  let result;

  if (effectiveUserData && sellerData) {
    result = await authService.registerSeller(effectiveUserData, sellerData);
  } else if (effectiveUserData && adminData) {
    result = await authService.registerAdmin(effectiveUserData, adminData);
  } else if (effectiveUserData) {
    result = await authService.registerUser(effectiveUserData);
  } else {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, MESSAGES.GENERAL.BAD_REQUEST);
  }

  return res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        result,
        MESSAGES.AUTH.REGISTER_SUCCESS
      )
    );
};

/**
 * @desc    Login user
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { user, token } = await authService.loginUser(email, password);

  // Set secure HTTP-only cookie for JWT
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        { user, token },
        MESSAGES.AUTH.LOGIN_SUCCESS
      )
    );
};

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Private
 */
export const logoutUser = async (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
  });

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        MESSAGES.AUTH.LOGOUT_SUCCESS || "Logged out successfully."
      )
    );
};

/**
 * @desc    Request password reset
 * @route   POST /api/auth/request-password-reset
 * @access  Public
 */
export const requestPasswordReset = async (req, res) => {
  const { email } = req.body;

  await authService.requestPasswordReset(email);

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        MESSAGES.AUTH.RESET_EMAIL_SENT ||
          "Password reset email sent if account exists."
      )
    );
};

/**
 * @desc    Reset password using token
 * @route   POST /api/auth/reset-password/:token
 * @access  Public
 */
export const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  await authService.resetPassword(token, password);

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        MESSAGES.AUTH.RESET_SUCCESS || "Password reset successful."
      )
    );
};

/**
 * @desc    Verify email using token
 * @route   GET /api/auth/verify-email/:token
 * @access  Public
 */
export const verifyEmail = async (req, res) => {
  const { token } = req.params;

  await authService.verifyEmail(token);

  return res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        MESSAGES.AUTH.VERIFY_SUCCESS || "Email verification successful."
      )
    );
};
