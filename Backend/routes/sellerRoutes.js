// /backend/routes/sellerRoutes.js

import express from "express";
import {
  getSellerProfileController,
  updateSellerProfileController,
  getAllSellersController,
  getSellerByIdController,
  deleteSellerByIdController,
} from "../controllers/sellerController.js";

import {
  protect,
  authorizeRoles,
  attachSellerProfile,
} from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import { updateSellerValidation } from "../validations/sellerValidation.js";

const router = express.Router();

/**
 * @route   GET /api/sellers/profile
 * @desc    Get seller's own profile
 * @access  Private (Seller)
 */
router.get(
  "/profile",
  protect,
  authorizeRoles("seller"),
  attachSellerProfile,
  getSellerProfileController
);

/**
 * @route   PUT /api/sellers/profile
 * @desc    Update seller's own profile
 * @access  Private (Seller)
 */
router.put(
  "/profile",
  protect,
  authorizeRoles("seller"),
  attachSellerProfile,
  validateResource(updateSellerProfileValidation),
  updateSellerProfileController
);

/**
 * @route   GET /api/sellers
 * @desc    Get all sellers
 * @access  Private (Admin)
 */
router.get("/", protect, authorizeRoles("admin"), getAllSellersController);

/**
 * @route   GET /api/sellers/:id
 * @desc    Get seller by ID
 * @access  Private (Admin)
 */
router.get("/:id", protect, authorizeRoles("admin"), getSellerByIdController);

/**
 * @route   DELETE /api/sellers/:id
 * @desc    Delete seller by ID
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteSellerByIdController
);

export default router;
