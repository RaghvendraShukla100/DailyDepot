// Backend/controllers/brandController.js

import Brand from "../models/brandSchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Create a new brand
// @route   POST /api/brands
// @access  Admin
export const createBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        brand,
        "Brand created successfully."
      )
    );
});

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({ deleted: false });

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, brands));
});

// @desc    Get single brand by ID
// @route   GET /api/brands/:id
// @access  Public
export const getBrandById = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand || brand.deleted) {
    throw ApiError.notFound("Brand");
  }

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, brand));
});

// @desc    Update brand by ID
// @route   PUT /api/brands/:id
// @access  Admin
export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!brand || brand.deleted) {
    throw ApiError.notFound("Brand");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, brand, "Brand updated successfully.")
    );
});

// @desc    Soft delete brand by ID
// @route   DELETE /api/brands/:id
// @access  Admin
export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!brand) {
    throw ApiError.notFound("Brand");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Brand deleted successfully.")
    );
});
