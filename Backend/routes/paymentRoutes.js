// /backend/routes/paymentRoutes.js

import express from "express";
import {
  createPayment,
  getPayments,
  getPaymentById,
  updatePayment,
  softDeletePayment,
} from "../controllers/paymentController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createPaymentValidation,
  updatePaymentValidation,
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
  validateResource(createPaymentValidation),
  createPayment
);

/**
 * @route   GET /api/payments
 * @desc    Get all payments (Admin sees all, User sees own)
 * @access  Auth (User/Admin)
 */
router.get("/", protect, getPayments);

/**
 * @route   GET /api/payments/:id
 * @desc    Get payment by ID
 * @access  Auth (User/Admin)
 */
router.get("/:id", protect, getPaymentById);

/**
 * @route   PUT /api/payments/:id
 * @desc    Update payment (status, refund status)
 * @access  Admin
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateResource(updatePaymentValidation),
  updatePayment
);

/**
 * @route   DELETE /api/payments/:id
 * @desc    Soft-delete a payment
 * @access  Admin
 */
router.delete("/:id", protect, authorizeRoles("admin"), softDeletePayment);

export default router;
