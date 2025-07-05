// /backend/controllers/userController.js

import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";
import * as userService from "../services/userService.js";
import User from "../models/userSchema.js";
import Wishlist from "../models/wishlistSchema.js";
import Order from "../models/orderSchema.js";

/**
 * @desc    Get current user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfileController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Update current user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfileController = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { ...req.body },
    { new: true, runValidators: true }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully.",
    data: updatedUser,
  });
});

/**
 * @desc    Soft delete current user account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
export const deleteUserProfileController = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    deleted: true,
    status: "deleted",
  });

  res.status(200).json({
    success: true,
    message: "Account marked as deleted.",
  });
});

/**
 * @desc    Get all users (Admin)
 * @route   GET /api/users
 * @access  Private (Admin)
 */
export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await User.find({ deleted: { $ne: true } }).select("-password");
  res.status(200).json({
    success: true,
    data: users,
  });
});

/**
 * @desc    Get user by ID (Admin)
 * @route   GET /api/users/:id
 * @access  Private (Admin)
 */
export const getUserByIdController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

/**
 * @desc    Delete user by ID (Admin - Soft delete)
 * @route   DELETE /api/users/:id
 * @access  Private (Admin)
 */
export const deleteUserByIdController = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { deleted: true, status: "deleted" },
    { new: true }
  );
  if (!user) {
    res.status(404);
    throw new Error("User not found.");
  }
  res.status(200).json({
    success: true,
    message: "User account marked as deleted.",
    data: user,
  });
});
