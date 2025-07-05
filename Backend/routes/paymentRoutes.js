// /backend/routes/paymentRoutes.js

import express from "express";
import {
  getAllPaymentsController,
  getUserPaymentsController,
  getPaymentByIdController,
  createPaymentController,
  updatePaymentController,
  deletePaymentController,
} from "../controllers/paymentController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createPaymentSchema,
  updatePaymentSchema,
} from "../validations/paymentValidation.js";

const router = express.Router();

/**
 * @route   GET /api/payments
 * @desc    Get all payments (admin)
 * @access  Admin
 */
router.get("/", protect, authorizeRoles("admin"), getAllPaymentsController);

/**
 * @route   GET /api/payments/my
 * @desc    Get payments of logged-in user
 * @access  Auth
 */
router.get("/my", protect, getUserPaymentsController);

/**
 * @route   GET /api/payments/:id
 * @desc    Get payment by ID
 * @access  Auth
 */
router.get("/:id", protect, getPaymentByIdController);

/**
 * @route   POST /api/payments
 * @desc    Create a payment
 * @access  Auth
 */
router.post(
  "/",
  protect,
  validateResource(createPaymentSchema),
  createPaymentController
);

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
  updatePaymentController
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
  deletePaymentController
);

export default router;
