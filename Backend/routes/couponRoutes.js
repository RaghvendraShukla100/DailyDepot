// /backend/routes/couponRoutes.js

import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCouponById,
  deleteCouponById,
} from "../controllers/couponController.js";

import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";

import validateResource from "../middlewares/validateResource.js";
import {
  createCouponValidation,
  updateCouponValidation,
} from "../validations/couponValidation.js";

const router = express.Router();

/**
 * @route   GET /api/coupons
 * @desc    Public - View all coupons
 * @access  Public
 */
router.get("/", asyncHandler(getAllCoupons));

/**
 * @route   GET /api/coupons/:id
 * @desc    Public - View a single coupon by ID
 * @access  Public
 */
router.get("/:id", asyncHandler(getCouponById));

/**
 * @route   POST /api/coupons
 * @desc    Admin - Create a new coupon
 * @access  Private/Admin
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(createCouponValidation),
  asyncHandler(createCoupon)
);

/**
 * @route   PUT /api/coupons/:id
 * @desc    Admin - Update a coupon by ID
 * @access  Private/Admin
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(updateCouponValidation),
  asyncHandler(updateCouponById)
);

/**
 * @route   DELETE /api/coupons/:id
 * @desc    Admin - Soft delete a coupon by ID
 * @access  Private/Admin
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  asyncHandler(deleteCouponById)
);

export default router;
