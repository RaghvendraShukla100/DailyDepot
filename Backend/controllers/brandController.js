import Brand from "../models/brandSchema.js";
import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Create a new brand
// @route   POST /api/brands
// @access  Admin
export const createBrandController = asyncHandler(async (req, res) => {
  const brand = await Brand.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        brand,
        MESSAGES.BRAND.CREATED || "Brand created successfully."
      )
    );
});

// @desc    Get all brands
// @route   GET /api/brands
// @access  Public
export const getBrandsController = asyncHandler(async (req, res) => {
  const brands = await Brand.find({ deleted: false });
  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, brands));
});

// @desc    Get single brand by ID
// @route   GET /api/brands/:id
// @access  Public
export const getBrandByIdController = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand || brand.deleted) {
    throw ApiError.notFound(
      MESSAGES.GENERAL.NOT_FOUND.replace("resource", "Brand") ||
        "Brand not found."
    );
  }

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, brand));
});

// @desc    Update brand by ID
// @route   PUT /api/brands/:id
// @access  Admin
export const updateBrandController = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!brand || brand.deleted) {
    throw ApiError.notFound(
      MESSAGES.GENERAL.NOT_FOUND.replace("resource", "Brand") ||
        "Brand not found."
    );
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        brand,
        MESSAGES.BRAND.UPDATED || "Brand updated successfully."
      )
    );
});

// @desc    Soft delete brand by ID
// @route   DELETE /api/brands/:id
// @access  Admin
export const deleteBrandController = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(
    req.params.id,
    { deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!brand) {
    throw ApiError.notFound(
      MESSAGES.GENERAL.NOT_FOUND.replace("resource", "Brand") ||
        "Brand not found."
    );
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        MESSAGES.BRAND.DELETED || "Brand deleted successfully."
      )
    );
});
