// Backend/controllers/userController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import * as userService from "../services/userService.js";
import User from "../models/userModel.js";
import Wishlist from "../models/wishlistModel.js";
import Order from "../models/orderModel.js";

// @desc    Get current user profile
// @route   GET /api/users/me
// @access  Private
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");
  res.status(200).json({
    success: true,
    data: user,
  });
});

// @desc    Update user profile
// @route   PUT /api/users/me
// @access  Private
export const updateMe = asyncHandler(async (req, res) => {
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

// @desc    Delete user account (soft delete)
// @route   DELETE /api/users/me
// @access  Private
export const deleteMe = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, {
    deleted: true,
    status: "deleted",
  });
  res.status(200).json({
    success: true,
    message: "Account marked as deleted.",
  });
});

// @desc    Get user wishlist
// @route   GET /api/users/me/wishlist
// @access  Private
export const getWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.find({
    user: req.user._id,
    deleted: false,
  }).populate("products.product");
  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

// @desc    Get user orders
// @route   GET /api/users/me/orders
// @access  Private
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({
    user: req.user._id,
    deleted: false,
  }).populate("items.product items.seller shippingAddress");
  res.status(200).json({
    success: true,
    data: orders,
  });
});

// @desc    Change user password
// @route   PUT /api/users/me/change-password
// @access  Private
export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await userService.changeUserPassword(
    req.user._id,
    currentPassword,
    newPassword
  );

  res.status(200).json({
    success: true,
    message: "Password changed successfully.",
  });
});

// @desc    Upload user profile picture
// @route   PUT /api/users/me/profile-picture
// @access  Private
export const uploadProfilePicture = asyncHandler(async (req, res) => {
  const { profilePicUrl } = req.body;
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { profilePic: profilePicUrl },
    { new: true }
  ).select("-password");

  res.status(200).json({
    success: true,
    message: "Profile picture updated.",
    data: updatedUser,
  });
});
