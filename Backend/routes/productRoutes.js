// /backend/routes/productsRouter.js

import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import productUpload from "../middlewares/uploadMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createProductValidation,
  updateProductValidation,
} from "../validations/productValidation.js";
import { ROLES } from "../constants/roles.js";
import { publicLimiter } from "../middlewares/rateLimiter.js";
import productUpdateAuthorization from "../middlewares/productUpdateAuthorization.js";
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
  productUpload.fields([
    { name: "images", maxCount: 15 },
    { name: "videos", maxCount: 5 },
  ]),
  validateResource(createProductValidation),
  asyncHandler(createProduct)
);

/**
 * @route   GET /api/products
 * @desc    Get all products with filters, pagination, sorting
 * @access  Public
 */
router.get("/", publicLimiter, asyncHandler(getProducts));

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get("/:id", asyncHandler(getProductById));

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 * @access  Private (prduct-creater : Seller/Admin)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.SELLER, ROLES.ADMIN),
  productUpdateAuthorization,
  productUpload.fields([
    { name: "images", maxCount: 5 },
    { name: "videos", maxCount: 2 },
  ]),
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
