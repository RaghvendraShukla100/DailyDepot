// /backend/services/userService.js

import User from "../models/userSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * Fetch a user's profile by ID, excluding the password field.
 * Throws ApiError if user not found.
 */
export const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  logger.info(`User profile fetched`, { userId });
  return user;
};

/**
 * Update a user's profile by ID with provided update data, excluding the password field.
 * Uses runValidators to ensure validation.
 * Throws ApiError if user not found.
 */
export const updateUserProfile = async (userId, updateData) => {
  const user = await User.findByIdAndUpdate(userId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  logger.info(`User profile updated`, { userId });
  return user;
};

/**
 * Soft delete a user by ID.
 * Marks the user as deleted, updates status to 'deleted', and sets deletedAt timestamp.
 * Throws ApiError if user not found.
 */
export const softDeleteUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  user.deleted = true;
  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();
  logger.info(`User soft-deleted`, { userId });
  return user;
};

/**
 * Get all non-deleted users with pagination.
 * Returns { users, page, limit, total, totalPages }
 */
export const getAllUsers = async ({ page = 1, limit = 20 }) => {
  page = parseInt(page);
  limit = parseInt(limit);
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find({ deleted: { $ne: true } })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    User.countDocuments({ deleted: { $ne: true } }),
  ]);

  logger.info(`Fetched users page=${page}, limit=${limit}`);
  return {
    users,
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Fetch a specific user by ID, excluding password.
 * Throws ApiError if user not found.
 */
export const getUserById = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  logger.info(`Fetched user by ID`, { userId });
  return user;
};
