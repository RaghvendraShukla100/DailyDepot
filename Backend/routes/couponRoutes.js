// /backend/routes/couponRoutes.js

import express from "express";
import {
  createCouponController,
  getAllCouponsController,
  getCouponByIdController,
  updateCouponByIdController,
  deleteCouponByIdController,
} from "../controllers/couponController.js";

import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";

import validateResource from "../middlewares/validateResourceMiddleware.js";
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
router.get("/", getAllCouponsController);

/**
 * @route   GET /api/coupons/:id
 * @desc    Public - View a single coupon by ID
 * @access  Public
 */
router.get("/:id", getCouponByIdController);

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
  createCouponController
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
  updateCouponByIdController
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
  deleteCouponByIdController
);

export default router;
