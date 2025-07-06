// /backend/routes/brandRoutes.js

import express from "express";
import {
  createBrandController,
  getBrandsController,
  getBrandByIdController,
  updateBrandController,
  deleteBrandController,
} from "../controllers/brandController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createBrandValidation,
  updateBrandValidation,
} from "../validations/brandValidation.js";

const router = express.Router();

/**
 * @route   GET /api/brands
 * @desc    Get all brands
 * @access  Public
 */
router.get("/", getBrandsController);

/**
 * @route   GET /api/brands/:id
 * @desc    Get brand by ID
 * @access  Public
 */
router.get("/:id", getBrandByIdController);

/**
 * @route   POST /api/brands
 * @desc    Create a new brand
 * @access  Admin Only
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateResource(createBrandValidation),
  createBrandController
);

/**
 * @route   PUT /api/brands/:id
 * @desc    Update a brand
 * @access  Admin Only
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateResource(updateBrandValidation),
  updateBrandController
);

/**
 * @route   DELETE /api/brands/:id
 * @desc    Delete (soft) a brand
 * @access  Admin Only
 */
router.delete("/:id", protect, authorizeRoles("admin"), deleteBrandController);

export default router;
