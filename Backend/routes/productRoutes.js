// /backend/routes/productRoutes.js

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
import {
  createProductValidation,
  updateProductValidation,
} from "../validations/productValidation.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @route POST /api/products
 * @desc Create a new product
 * @access Private (seller/admin)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.SELLER, ROLES.ADMIN),
  upload.array("media", 10), // max 10 images/videos per product
  validateResource(createProductValidation),
  createProduct
);

/**
 * @route GET /api/products
 * @desc Get all products with filters, pagination, sorting
 * @access Public
 */
router.get("/", getProducts);

/**
 * @route GET /api/products/:id
 * @desc Get product by ID
 * @access Public
 */
router.get("/:id", getProductById);

/**
 * @route PUT /api/products/:id
 * @desc Update a product
 * @access Private (seller/admin)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.SELLER, ROLES.ADMIN),
  upload.array("media", 10),
  validateResource(updateProductValidation),
  updateProduct
);

/**
 * @route DELETE /api/products/:id
 * @desc Soft delete a product
 * @access Private (seller/admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.SELLER, ROLES.ADMIN),
  deleteProduct
);

export default router;
