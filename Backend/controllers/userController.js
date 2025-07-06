import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/userSchema.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Fetch the currently logged-in user's profile
 * @route   GET /api/users/profile
 * @access  Private (user must be logged in)
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw ApiError.notFound("User");
  }

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, user, "User profile fetched."));
});

/**
 * @desc    Update the currently logged-in user's profile
 * @route   PUT /api/users/profile
 * @access  Private (user must be logged in)
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw ApiError.notFound("User");
  }

  const { name, bio, phone, address } = req.body;

  // Update user fields only if provided
  if (name) {
    const [first, ...last] = name.split(" ");
    user.name.first = first || user.name.first;
    user.name.last = last.join(" ") || user.name.last;
  }
  if (bio) user.bio = bio;
  if (phone) user.phone = phone;
  if (address) user.addresses.push(address);

  await user.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, user, "Profile updated successfully.")
    );
});

/**
 * @desc    Soft delete the currently logged-in user's account
 * @route   DELETE /api/users/profile
 * @access  Private (user must be logged in)
 */
export const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw ApiError.notFound("User");
  }

  // Perform soft delete by updating relevant fields
  user.deleted = true;
  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        "User account deleted successfully."
      )
    );
});

/**
 * @desc    Fetch all non-deleted users (Admin only)
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({ deleted: { $ne: true } }).select("-password");

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, users, "All users fetched successfully.")
    );
});

/**
 * @desc    Fetch a specific user by ID (Admin only)
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw ApiError.notFound("User");
  }

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, user, "User fetched successfully."));
});

/**
 * @desc    Soft delete a specific user by ID (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw ApiError.notFound("User");
  }

  // Soft delete the user
  user.deleted = true;
  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, "User deleted successfully."));
});
