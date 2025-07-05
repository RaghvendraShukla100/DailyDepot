// /backend/routes/productRoutes.js

import express from "express";
import {
  createProductController,
  getAllProductsController,
  getProductByIdController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createProductSchema,
  updateProductSchema,
} from "../validations/productValidation.js";

const router = express.Router();

/**
 * @route   GET /api/products
 * @desc    Get all products (with optional filters)
 * @access  Public
 */
router.get("/", getAllProductsController);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", getProductByIdController);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Admin, Seller)
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin", "seller"),
  validateResource(createProductSchema),
  createProductController
);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Admin, Seller)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "seller"),
  validateResource(updateProductSchema),
  updateProductController
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete (soft) a product
 * @access  Private (Admin, Seller)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "seller"),
  deleteProductController
);

export default router;
