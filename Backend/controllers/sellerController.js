import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Seller from "../models/sellerSchema.js";
import User from "../models/userSchema.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import {
  createSellerValidation,
  updateSellerValidation,
} from "../validations/sellerValidation.js";

/**
 * @desc    Create seller profile (user must exist)
 * @route   POST /api/sellers
 * @access  Private
 */
export const createSeller = asyncHandler(async (req, res) => {
  const validatedData = createSellerValidation.parse(req.body);

  // Check if user exists
  const user = await User.findById(req.user._id);
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);

  // Prevent duplicate seller registration
  const existingSeller = await Seller.findOne({ user: user._id });
  if (existingSeller)
    throw ApiError.conflict("Seller profile already exists for this user.");

  const seller = await Seller.create({
    user: user._id,
    ...validatedData,
  });

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        seller,
        "Seller profile created successfully."
      )
    );
});

/**
 * @desc    Get current seller profile
 * @route   GET /api/sellers/me
 * @access  Private (Seller)
 */
export const getSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findOne({ user: req.user._id }).populate(
    "user",
    "-password"
  );
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        seller,
        "Seller profile fetched successfully."
      )
    );
});

/**
 * @desc    Update current seller profile
 * @route   PUT /api/sellers/me
 * @access  Private (Seller)
 */
export const updateSeller = asyncHandler(async (req, res) => {
  const validatedData = updateSellerValidation.parse(req.body);

  const seller = await Seller.findOneAndUpdate(
    { user: req.user._id },
    validatedData,
    { new: true, runValidators: true }
  );

  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        seller,
        "Seller profile updated successfully."
      )
    );
});

/**
 * @desc    Soft delete current seller profile
 * @route   DELETE /api/sellers/me
 * @access  Private (Seller)
 */
export const removeSeller = asyncHandler(async (req, res) => {
  const seller = await Seller.findOneAndUpdate(
    { user: req.user._id },
    { status: "deleted", deleted: true },
    { new: true }
  );

  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        seller,
        "Seller profile marked as deleted."
      )
    );
});

/**
 * @desc    Get all sellers (Admin)
 * @route   GET /api/sellers
 * @access  Private (Admin)
 */
export const getAllSellers = asyncHandler(async (req, res) => {
  const sellers = await Seller.find({ deleted: { $ne: true } }).populate(
    "user",
    "-password"
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        sellers,
        "All sellers fetched successfully."
      )
    );
});

/**
 * @desc    Get seller by ID (Admin)
 * @route   GET /api/sellers/:id
 * @access  Private (Admin)
 */
export const getSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findById(req.params.id).populate(
    "user",
    "-password"
  );
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, "Seller fetched successfully.")
    );
});

/**
 * @desc    Delete seller by ID (Admin - soft delete)
 * @route   DELETE /api/sellers/:id
 * @access  Private (Admin)
 */
export const removeSellerById = asyncHandler(async (req, res) => {
  const seller = await Seller.findByIdAndUpdate(
    req.params.id,
    { status: "deleted", deleted: true },
    { new: true }
  );
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        seller,
        "Seller marked as deleted successfully."
      )
    );
});
