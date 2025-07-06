// /backend/controllers/categoryController.js

import Category from "../models/categorySchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc    Create a new category
 * @route   POST /api/categories
 * @access  Private/Admin
 */
export const createCategoryController = asyncHandler(async (req, res) => {
  const category = await Category.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        category,
        "Category created successfully."
      )
    );
});

/**
 * @desc    Get all categories
 * @route   GET /api/categories
 * @access  Public
 */
export const getAllCategoriesController = asyncHandler(async (req, res) => {
  const categories = await Category.find({ deleted: false }).populate(
    "parentCategory",
    "name slug"
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        categories,
        "Categories fetched successfully."
      )
    );
});

/**
 * @desc    Get a single category by ID
 * @route   GET /api/categories/:id
 * @access  Public
 */
export const getCategoryByIdController = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
    .where({ deleted: false })
    .populate("parentCategory", "name slug");

  if (!category) {
    throw ApiError.notFound("Category");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        category,
        "Category fetched successfully."
      )
    );
});

/**
 * @desc    Update a category by ID
 * @route   PUT /api/categories/:id
 * @access  Private/Admin
 */
export const updateCategoryByIdController = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).where({
    deleted: false,
  });

  if (!category) {
    throw ApiError.notFound("Category");
  }

  const updatableFields = [
    "name",
    "slug",
    "description",
    "parentCategory",
    "image",
    "isFeatured",
    "status",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      category[field] = req.body[field];
    }
  });

  const updatedCategory = await category.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        updatedCategory,
        "Category updated successfully."
      )
    );
});

/**
 * @desc    Soft delete a category by ID
 * @route   DELETE /api/categories/:id
 * @access  Private/Admin
 */
export const deleteCategoryByIdController = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).where({
    deleted: false,
  });

  if (!category) {
    throw ApiError.notFound("Category");
  }

  category.deleted = true;
  category.deletedAt = new Date();
  await category.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Category deleted successfully.")
    );
});
