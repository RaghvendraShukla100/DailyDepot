import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createBrand,
  getBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} from "../controllers/brandController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import checkDesignation from "../middlewares/checkDesignation.js";
import checkPermissions from "../middlewares/checkPermissions.js";

import { ROLES } from "../constants/roles.js";
import { ADMIN_DESIGNATIONS } from "../constants/designation.js";
import validateResource from "../middlewares/validateResource.js";
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
 * @access  Private (Admin and superadmin)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_database"),
  validateResource(createBrandValidation),
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
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_database"),
  validateResource(updateBrandValidation),
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
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_database"),
  asyncHandler(deleteBrand)
);

export default router;
