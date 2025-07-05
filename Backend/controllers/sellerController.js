// /backend/controllers/sellerController.js

import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";
import * as sellerService from "../services/sellerService.js";
import Seller from "../models/sellerSchema.js";
import Product from "../models/productSchema.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

/**
 * @desc    Get seller's own profile
 * @route   GET /api/sellers/profile
 * @access  Private (Seller)
 */
export const getSellerProfileController = asyncHandler(async (req, res) => {
  const seller = req.seller; // provided by attachSellerProfile middleware
  res.status(STATUS_CODES.OK).json({
    success: true,
    data: seller,
  });
});

/**
 * @desc    Update seller's own profile
 * @route   PUT /api/sellers/profile
 * @access  Private (Seller)
 */
export const updateSellerProfileController = asyncHandler(async (req, res) => {
  const updatedSeller = await Seller.findByIdAndUpdate(
    req.seller._id,
    { ...req.body },
    { new: true, runValidators: true }
  ).populate("user", "-password");

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Seller profile updated successfully.",
    data: updatedSeller,
  });
});

/**
 * @desc    Get all sellers (Admin)
 * @route   GET /api/sellers
 * @access  Private (Admin)
 */
export const getAllSellersController = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({ deleted: { $ne: true } }).populate(
    "user",
    "-password"
  );

  res.status(STATUS_CODES.OK).json({
    success: true,
    data: sellers,
  });
});

/**
 * @desc    Get seller by ID (Admin)
 * @route   GET /api/sellers/:id
 * @access  Private (Admin)
 */
export const getSellerByIdController = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id).populate(
    "user",
    "-password"
  );

  if (!seller) {
    throw ApiError.notFound("Seller not found.");
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    data: seller,
  });
});

/**
 * @desc    Delete seller by ID (Admin - soft delete)
 * @route   DELETE /api/sellers/:id
 * @access  Private (Admin)
 */
export const deleteSellerByIdController = asyncHandler(async (req, res) => {
  const seller = await Seller.findByIdAndUpdate(
    req.params.id,
    { deleted: true, status: "deleted" },
    { new: true }
  ).populate("user", "-password");

  if (!seller) {
    throw ApiError.notFound("Seller not found.");
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Seller marked as deleted.",
    data: seller,
  });
});
