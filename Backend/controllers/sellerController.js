// Backend/controllers/sellerController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import * as sellerService from "../services/sellerService.js";
import Seller from "../models/sellerModel.js";
import Product from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// @desc    Get current seller profile
// @route   GET /api/sellers/me
// @access  Private (Seller)
export const getMe = asyncHandler(async (req, res) => {
  const seller = await Seller.findOne({ user: req.user._id }).populate(
    "user",
    "-password"
  );
  if (!seller) {
    throw ApiError.notFound("Seller profile not found");
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    data: seller,
  });
});

// @desc    Update seller profile
// @route   PUT /api/sellers/me
// @access  Private (Seller)
export const updateMe = asyncHandler(async (req, res) => {
  const updatedSeller = await Seller.findOneAndUpdate(
    { user: req.user._id },
    { ...req.body },
    { new: true, runValidators: true }
  ).populate("user", "-password");

  if (!updatedSeller) {
    throw ApiError.notFound("Seller profile not found");
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Seller profile updated successfully.",
    data: updatedSeller,
  });
});

// @desc    Upload seller store logo and banner
// @route   PUT /api/sellers/me/store-media
// @access  Private (Seller)
export const uploadStoreMedia = asyncHandler(async (req, res) => {
  const { logoUrl, bannerUrl } = req.body;

  const updatedSeller = await Seller.findOneAndUpdate(
    { user: req.user._id },
    { ...(logoUrl && { logoUrl }), ...(bannerUrl && { bannerUrl }) },
    { new: true }
  );

  if (!updatedSeller) {
    throw ApiError.notFound("Seller profile not found");
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Store media updated successfully.",
    data: updatedSeller,
  });
});

// @desc    Get all products for the current seller
// @route   GET /api/sellers/me/products
// @access  Private (Seller)
export const getMyProducts = asyncHandler(async (req, res) => {
  const seller = await Seller.findOne({ user: req.user._id });
  if (!seller) {
    throw ApiError.notFound("Seller profile not found");
  }

  const products = await Product.find({
    seller: seller._id,
    deleted: false,
  });

  res.status(STATUS_CODES.OK).json({
    success: true,
    data: products,
  });
});

// @desc    Toggle seller store active status
// @route   PUT /api/sellers/me/toggle-status
// @access  Private (Seller)
export const toggleStoreStatus = asyncHandler(async (req, res) => {
  const seller = await Seller.findOne({ user: req.user._id });
  if (!seller) {
    throw ApiError.notFound("Seller profile not found");
  }

  seller.status = seller.status === "active" ? "inactive" : "active";
  await seller.save();

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: `Store status changed to ${seller.status}.`,
    data: seller,
  });
});

// @desc    Request seller verification (manual verification flow)
// @route   POST /api/sellers/me/request-verification
// @access  Private (Seller)
export const requestVerification = asyncHandler(async (req, res) => {
  const updatedSeller = await sellerService.requestSellerVerification(
    req.user._id
  );

  if (!updatedSeller) {
    throw ApiError.notFound("Seller profile not found");
  }

  res.status(STATUS_CODES.OK).json({
    success: true,
    message: "Verification request submitted.",
    data: updatedSeller,
  });
});
