// /backend/routes/paymentRoutes.js

import express from "express";
import {
  createPaymentControllers,
  getPaymentsControllers,
  getPaymentByIdControllers,
  updatePaymentControllers,
  softDeletePaymentControllers,
} from "../controllers/paymentController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createPaymentSchema,
  updatePaymentSchema,
} from "../validations/paymentValidation.js";

const router = express.Router();

/**
 * @route   POST /api/payments
 * @desc    Create a payment
 * @access  Auth (User)
 */
router.post(
  "/",
  protect,
  validateResource(createPaymentSchema),
  createPaymentControllers
);

/**
 * @route   GET /api/payments
 * @desc    Get all payments (Admin sees all, User sees own)
 * @access  Auth (User/Admin)
 */
router.get("/", protect, getPaymentsControllers);

/**
 * @route   GET /api/payments/:id
 * @desc    Get payment by ID
 * @access  Auth (User/Admin)
 */
router.get("/:id", protect, getPaymentByIdControllers);

/**
 * @route   PUT /api/payments/:id
 * @desc    Update payment (status, refund status)
 * @access  Admin
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateResource(updatePaymentSchema),
  updatePaymentControllers
);

/**
 * @route   DELETE /api/payments/:id
 * @desc    Soft-delete a payment
 * @access  Admin
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  softDeletePaymentControllers
);

export default router;
