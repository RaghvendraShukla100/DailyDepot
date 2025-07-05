// Backend/controllers/categoryController.js

import Category from "../models/categoryModel.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Create a new category
// @route   POST /api/categories
// @access  Admin
export const createCategory = asyncHandler(async (req, res) => {
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

// @desc    Get all categories
// @route   GET /api/categories
// @access  Public
export const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({ deleted: false }).populate(
    "parentCategory",
    "name slug"
  );

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, categories));
});

// @desc    Get a single category by ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id)
    .where({ deleted: false })
    .populate("parentCategory", "name slug");

  if (!category) {
    throw ApiError.notFound("Category");
  }

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, category));
});

// @desc    Update a category
// @route   PUT /api/categories/:id
// @access  Admin
export const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id).where({
    deleted: false,
  });

  if (!category) {
    throw ApiError.notFound("Category");
  }

  const updateFields = [
    "name",
    "slug",
    "description",
    "parentCategory",
    "image",
    "isFeatured",
    "status",
  ];

  updateFields.forEach((field) => {
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

// @desc    Soft delete a category
// @route   DELETE /api/categories/:id
// @access  Admin
export const deleteCategory = asyncHandler(async (req, res) => {
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
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        "Category soft-deleted successfully."
      )
    );
});
