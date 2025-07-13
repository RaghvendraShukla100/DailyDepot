// /backend/services/authService.js

import bcrypt from "bcryptjs";
import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import generateToken from "../utils/generateToken.js";

/**
 * Register a new user with duplicate checks and clean error handling
 * @param {Object} userData
 * @returns {Promise<User>}
 */
export const registerUser = async (userData) => {
  try {
    // Check for existing email
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new ApiError(
        STATUS_CODES.CONFLICT,
        MESSAGES.AUTH.USER_ALREADY_EXISTS ||
          "User already exists with this email."
      );
    }

    // Check for existing phone if provided
    if (userData.phone) {
      const existingPhone = await User.findOne({ phone: userData.phone });
      if (existingPhone) {
        throw new ApiError(
          STATUS_CODES.CONFLICT,
          MESSAGES.AUTH.PHONE_ALREADY_EXISTS ||
            "User already exists with this phone number."
        );
      }
    }

    const user = await User.create(userData);
    return user;
  } catch (error) {
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      throw new ApiError(
        STATUS_CODES.CONFLICT,
        `User with this ${field} already exists.`
      );
    }

    if (error instanceof ApiError) {
      throw error;
    }

    console.error("[registerUser] Unexpected error:", error);
    throw new ApiError(
      STATUS_CODES.INTERNAL_SERVER_ERROR,
      MESSAGES.GENERAL.UNEXPECTED_ERROR || "An unexpected error occurred."
    );
  }
};

/**
 * Login user and return user with JWT token
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ user: User, token: string }>}
 */
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_CREDENTIALS || "Invalid email or password."
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new ApiError(
      STATUS_CODES.UNAUTHORIZED,
      MESSAGES.AUTH.INVALID_CREDENTIALS || "Invalid email or password."
    );
  }

  const token = generateToken({ id: user._id, role: user.role });
  return { user, token };
};

// You can similarly add registerSeller, loginSeller, registerAdmin, loginAdmin following the same pattern for clarity, error safety, and consistency.
