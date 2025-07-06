// /backend/routes/sellerRoutes.js

import express from "express";
import {
  createSeller,
  getSeller,
  updateSeller,
  removeSeller,
  getAllSellers,
  getSellerById,
  removeSellerById,
} from "../controllers/sellerController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @route   POST /api/sellers
 * @desc    Create seller profile (must be protectd user)
 * @access  Private (User)
 */
router.post("/", protect, authorizeRoles(ROLES.USER), createSeller);

/**
 * @route   GET /api/sellers/me
 * @desc    Get current seller profile
 * @access  Private (Seller)
 */
router.get("/me", protect, authorizeRoles(ROLES.SELLER), getSeller);

/**
 * @route   PUT /api/sellers/me
 * @desc    Update current seller profile
 * @access  Private (Seller)
 */
router.put("/me", protect, authorizeRoles(ROLES.SELLER), updateSeller);

/**
 * @route   DELETE /api/sellers/me
 * @desc    Soft delete current seller profile
 * @access  Private (Seller)
 */
router.delete("/me", protect, authorizeRoles(ROLES.SELLER), removeSeller);

/**
 * @route   GET /api/sellers
 * @desc    Get all sellers
 * @access  Private (Admin)
 */
router.get("/", protect, authorizeRoles(ROLES.ADMIN), getAllSellers);

/**
 * @route   GET /api/sellers/:id
 * @desc    Get seller by ID
 * @access  Private (Admin)
 */
router.get("/:id", protect, authorizeRoles(ROLES.ADMIN), getSellerById);

/**
 * @route   DELETE /api/sellers/:id
 * @desc    Soft delete seller by ID
 * @access  Private (Admin)
 */
router.delete("/:id", protect, authorizeRoles(ROLES.ADMIN), removeSellerById);

export default router;
