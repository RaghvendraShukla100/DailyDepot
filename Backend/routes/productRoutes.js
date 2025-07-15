import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../validations/productValidation.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (Seller/Admin)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.SELLER, ROLES.ADMIN),
  upload.array("media", 10),
  validateResource(createProductValidation),
  asyncHandler(createProduct)
);

/**
 * @route   GET /api/products
 * @desc    Get all products with filters, pagination, sorting
 * @access  Public
 */
router.get("/", asyncHandler(getProducts));

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get("/:id", asyncHandler(getProductById));

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (Seller/Admin)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.SELLER, ROLES.ADMIN),
  upload.array("media", 10),
  validateResource(updateProductValidation),
  asyncHandler(updateProduct)
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Soft delete a product
 * @access  Private (Seller/Admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.SELLER, ROLES.ADMIN),
  asyncHandler(deleteProduct)
);

export default router;
