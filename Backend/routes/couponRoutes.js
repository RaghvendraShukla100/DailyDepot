import express from "express";
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
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createCouponSchema,
  updateCouponSchema,
} from "../validations/couponValidation.js";

const router = express.Router();

// Public - View all coupons
router.get("/", getAllCoupons);

// Public - View a single coupon by ID
router.get("/:id", getCouponById);

// Admin only - Create coupon
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(createCouponSchema),
  createCoupon
);

// Admin only - Update coupon
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(updateCouponSchema),
  updateCouponById
);

// Admin only - Delete coupon
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  deleteCouponById
);

export default router;
