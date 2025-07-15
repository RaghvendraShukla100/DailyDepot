import express from "express";
import {
  createSeller,
  getSeller,
  updateSeller,
  removeSeller,
  getAllSellers,
  getSellerById,
  removeSellerById,
  getSellerAnalytics,
  getSellerOrders,
  getSellerProducts,
} from "../controllers/sellerController.js";
import {
  protect,
  authorizeRoles,
  attachSellerProfile,
} from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
import validateResource from "../middlewares/validateResource.js";
import upload from "../middlewares/uploadMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createSellerValidation,
  updateSellerValidation,
} from "../validations/sellerValidation.js";

const router = express.Router();

/**
 * @route   POST /api/sellers
 * @desc    Create a seller profile for the authenticated user
 * @access  Private (User)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.USER),
  upload.single("shopLogo"),
  validateResource(createSellerValidation),
  asyncHandler(createSeller)
);

/**
 * @route   GET /api/sellers/me
 * @desc    Retrieve the authenticated seller's profile
 * @access  Private (Seller)
 */
router.get(
  "/me",
  protect,
  authorizeRoles(ROLES.SELLER),
  attachSellerProfile,
  asyncHandler(getSeller)
);

/**
 * @route   PUT /api/sellers/me
 * @desc    Update the authenticated seller's profile
 * @access  Private (Seller)
 */
router.put(
  "/me",
  protect,
  authorizeRoles(ROLES.SELLER),
  attachSellerProfile,
  upload.single("shopLogo"),
  validateResource(updateSellerValidation),
  asyncHandler(updateSeller)
);

/**
 * @route   DELETE /api/sellers/me
 * @desc    Soft delete the authenticated seller's profile
 * @access  Private (Seller)
 */
router.delete(
  "/me",
  protect,
  authorizeRoles(ROLES.SELLER),
  attachSellerProfile,
  asyncHandler(removeSeller)
);

/**
 * @route   GET /api/sellers
 * @desc    Retrieve all sellers (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(getAllSellers)
);

/**
 * @route   GET /api/sellers/:id
 * @desc    Retrieve a seller by ID (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(getSellerById)
);

/**
 * @route   DELETE /api/sellers/:id
 * @desc    Soft delete a seller by ID (Admin only)
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(removeSellerById)
);

/**
 * @route   GET /api/sellers/me/orders
 * @desc    Retrieve all the seller's orders
 * @access  Private (Seller)
 */
router.get(
  "/me/orders",
  protect,
  authorizeRoles(ROLES.SELLER),
  attachSellerProfile,
  asyncHandler(getSellerOrders)
);

/**
 * @route   GET /api/sellers/me/products
 * @desc    Retrieve all the seller's products
 * @access  Private (Seller)
 */
router.get(
  "/me/products",
  protect,
  authorizeRoles(ROLES.SELLER),
  attachSellerProfile,
  asyncHandler(getSellerProducts)
);

/**
 * @route   GET /api/sellers/me/analytics
 * @desc    Retrieve all the seller's analytics
 * @access  Private (Seller)
 */
router.get(
  "/me/analytics",
  protect,
  authorizeRoles(ROLES.SELLER),
  attachSellerProfile,
  asyncHandler(getSellerAnalytics)
);

export default router;
