import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Seller from "../models/sellerSchema.js";
import User from "../models/userSchema.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";
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

  const user = await User.findById(req.user._id);
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);

  const existingSeller = await Seller.findOne({ user: user._id });
  if (existingSeller) throw ApiError.conflict(MESSAGES.SELLER.ALREADY_EXISTS);

  const seller = await Seller.create({
    user: user._id,
    ...validatedData,
  });

  logger.info(`Seller profile created for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        seller,
        MESSAGES.SELLER.CREATED_SUCCESS
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

  logger.info(`Seller profile fetched for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.FETCHED_SUCCESS)
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

  logger.info(`Seller profile updated for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.UPDATED_SUCCESS)
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
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);

  logger.info(`Seller profile soft-deleted for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.DELETED_SUCCESS)
    );
});

/**
 * @desc    Get all sellers (Admin) with pagination
 * @route   GET /api/sellers
 * @access  Private (Admin)
 */
export const getAllSellers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [sellers, total] = await Promise.all([
    Seller.find({ deleted: { $ne: true } })
      .populate("user", "-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Seller.countDocuments({ deleted: { $ne: true } }),
  ]);

  logger.info(
    `Admin userId=${req.user._id} fetched sellers page=${page} limit=${limit}`
  );

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      {
        sellers,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      MESSAGES.SELLER.ALL_FETCHED
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

  logger.info(`Admin userId=${req.user._id} fetched sellerId=${req.params.id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.FETCHED_SUCCESS)
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
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);

  logger.info(
    `Admin userId=${req.user._id} soft-deleted sellerId=${req.params.id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.DELETED_SUCCESS)
    );
});
