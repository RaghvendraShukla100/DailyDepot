import express from "express";
import * as couponController from "../controllers/couponController.js";
import asyncHandler from "../middlewares/asyncHandler.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createCouponValidation,
  updateCouponValidation,
} from "../validations/couponValidation.js";

const router = express.Router();

// 🔒 Authenticated + Admin-only
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  validateResource(createCouponValidation),
  asyncHandler(couponController.createCoupon)
);

// 🧾 Public or authenticated route (change to `protect` if needed)
router.get("/", asyncHandler(couponController.getAllCoupons));
router.get("/:id", asyncHandler(couponController.getCouponById));

// ✏️ Update coupon - Admin only
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  validateResource(updateCouponValidation),
  asyncHandler(couponController.updateCouponById)
);

// ❌ Soft delete - Admin only
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(couponController.deleteCouponById)
);

export default router;
