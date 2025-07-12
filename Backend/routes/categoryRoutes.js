// /backend/routes/categoryRoutes.js

import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController.js";
import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validations/categoryValidation.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @route   GET /api/categories
 * @desc    Retrieve all categories (public)
 * @access  Public
 */
router.get("/", asyncHandler(getAllCategories));

/**
 * @route   GET /api/categories/:id
 * @desc    Retrieve a single category by ID (public)
 * @access  Public
 */
router.get("/:id", asyncHandler(getCategoryById));

/**
 * @route   POST /api/categories
 * @desc    Create a new category (admin only)
 * @access  Private/Admin
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  attachAdminProfile,
  validateResource(createCategoryValidation),
  asyncHandler(createCategory)
);

/**
 * @route   PUT /api/categories/:id
 * @desc    Update a category by ID (admin only)
 * @access  Private/Admin
 */
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  attachAdminProfile,
  validateResource(updateCategoryValidation),
  asyncHandler(updateCategoryById)
);

/**
 * @route   DELETE /api/categories/:id
 * @desc    Soft delete a category by ID (admin only)
 * @access  Private/Admin
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  attachAdminProfile,
  asyncHandler(deleteCategoryById)
);

export default router;
