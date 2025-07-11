// /backend/controllers/brandController.js

import Brand from "../models/brandSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Create a new brand
 * @route   POST /api/brands
 * @access  Private/Admin
 */
export const createBrand = async (req, res) => {
  const brand = await Brand.create(req.body);

  logger.info(`Brand created with id=${brand._id} by adminId=${req.user._id}`);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        brand,
        MESSAGES.BRAND.CREATED_SUCCESS
      )
    );
};

/**
 * @desc    Get all non-deleted brands
 * @route   GET /api/brands
 * @access  Public
 */
export const getBrands = async (req, res) => {
  const brands = await Brand.find({ deleted: { $ne: true } }).sort({
    createdAt: -1,
  });

  logger.info(`Fetched all non-deleted brands. Total=${brands.length}`);

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, brands, MESSAGES.BRAND.ALL_FETCHED));
};

/**
 * @desc    Get a brand by ID
 * @route   GET /api/brands/:id
 * @access  Public
 */
export const getBrandById = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand || brand.deleted) {
    throw ApiError.notFound(MESSAGES.BRAND.NOT_FOUND);
  }

  logger.info(`Fetched brand with id=${req.params.id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, brand, MESSAGES.BRAND.FETCHED_SUCCESS)
    );
};

/**
 * @desc    Update a brand by ID
 * @route   PUT /api/brands/:id
 * @access  Private/Admin
 */
export const updateBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand || brand.deleted) {
    throw ApiError.notFound(MESSAGES.BRAND.NOT_FOUND);
  }

  // Update fields if present
  if (req.body.name !== undefined) brand.name = req.body.name;
  if (req.body.slug !== undefined) brand.slug = req.body.slug;
  if (req.body.description !== undefined)
    brand.description = req.body.description;
  if (req.body.logo !== undefined) brand.logo = req.body.logo;
  if (req.body.status !== undefined) brand.status = req.body.status;

  await brand.save();

  logger.info(
    `Brand with id=${req.params.id} updated by adminId=${req.user._id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, brand, MESSAGES.BRAND.UPDATED_SUCCESS)
    );
};

/**
 * @desc    Soft delete a brand by ID
 * @route   DELETE /api/brands/:id
 * @access  Private/Admin
 */
export const deleteBrand = async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand || brand.deleted) {
    throw ApiError.notFound(MESSAGES.BRAND.NOT_FOUND);
  }

  brand.deleted = true;
  brand.status = "deleted";
  brand.deletedAt = new Date();
  await brand.save();

  logger.info(
    `Brand with id=${req.params.id} soft-deleted by adminId=${req.user._id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.BRAND.DELETED_SUCCESS)
    );
};
