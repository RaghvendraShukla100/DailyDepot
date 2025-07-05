// /backend/controllers/adminController.js

import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";
import * as adminService from "../services/adminService.js";
import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Get current admin profile
// @route   GET /api/admins/profile
// @access  Private (Admin)
export const getAdminProfileController = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ user: req.user._id }).populate(
    "user",
    "-password"
  );
  if (!admin) {
    throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  }
  res.status(STATUS_CODES.OK).json({
    success: true,
    data: admin,
  });
});

// @desc    Update admin profile
// @route   PUT /api/admins/profile
// @access  Private (Admin)
export const updateAdminProfileController = asyncHandler(async (req, res) => {
  const updatedAdmin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    { ...req.body },
    { new: true, runValidators: true }
  ).populate("user", "-password");

  if (!updatedAdmin) {
    throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Admin profile updated successfully.",
    data: updatedAdmin,
  });
});

// @desc    Get all users
// @route   GET /api/admins/users
// @access  Private (Admin)
export const getAllUsersController = asyncHandler(async (req, res) => {
  const users = await User.find({ deleted: false }).select("-password");

  res.status(STATUS_CODES.OK).json({
    success: true,
    count: users.length,
    data: users,
  });
});

// @desc    Get all sellers
// @route   GET /api/admins/sellers
// @access  Private (Admin)
export const getAllSellersController = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({ deleted: false }).populate(
    "user",
    "-password"
  );

  res.status(STATUS_CODES.OK).json({
    success: true,
    count: sellers.length,
    data: sellers,
  });
});

// @desc    Toggle user status (block/unblock)
// @route   PUT /api/admins/users/:id/toggle-status
// @access  Private (Admin)
export const toggleUserStatusController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  user.status = user.status === "active" ? "blocked" : "active";
  await user.save();

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: `User status changed to ${user.status}.`,
    data: user,
  });
});

// @desc    Toggle seller verification
// @route   PUT /api/admins/sellers/:id/toggle-verification
// @access  Private (Admin)
export const toggleSellerVerificationController = asyncHandler(
  async (req, res) => {
    const seller = await Seller.findById(req.params.id);
    if (!seller) {
      throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
    }

    seller.isVerified = !seller.isVerified;
    seller.verifiedAt = seller.isVerified ? new Date() : null;
    await seller.save();

    res.status(STATUS_CODES.OK).json({
      success: true,
      message: `Seller verification status changed to ${seller.isVerified}.`,
      data: seller,
    });
  }
);

// @desc    Delete user (soft delete)
// @route   DELETE /api/admins/users/:id
// @access  Private (Admin)
export const deleteUserByIdController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  user.deleted = true;
  user.deletedAt = new Date();
  await user.save();

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "User deleted successfully.",
  });
});

// @desc    Delete seller (soft delete)
// @route   DELETE /api/admins/sellers/:id
// @access  Private (Admin)
export const deleteSellerByIdController = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id);
  if (!seller) {
    throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  }

  seller.deleted = true;
  seller.deletedAt = new Date();
  await seller.save();

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Seller deleted successfully.",
  });
});
