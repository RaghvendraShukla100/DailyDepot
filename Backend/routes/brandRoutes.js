// /backend/routes/brandRoutes.js

import express from "express";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
import validateRequest from "../middlewares/validateRequest.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createBrandValidation,
  updateBrandValidation,
} from "../validations/brandValidation.js";

const router = express.Router();

/**
 * @route   GET /api/brands
 * @desc    Retrieve all brands
 * @access  Public
 */
router.get("/", asyncHandler(getBrands));

/**
 * @route   GET /api/brands/:id
 * @desc    Retrieve a brand by ID
 * @access  Public
 */
router.get("/:id", asyncHandler(getBrandById));

/**
 * @route   POST /api/brands
 * @desc    Create a new brand
 * @access  Private (Admin)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  validateRequest(createBrandValidation),
  asyncHandler(createBrand)
);

/**
 * @route   PUT /api/brands/:id
 * @desc    Update a brand by ID
 * @access  Private (Admin)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  validateRequest(updateBrandValidation),
  asyncHandler(updateBrand)
);

/**
 * @route   DELETE /api/brands/:id
 * @desc    Soft delete a brand by ID
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(deleteBrand)
);

export default router;
