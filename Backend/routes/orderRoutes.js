// /backend/routes/orderRoutes.js

import express from "express";
import {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/orderController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createOrderValidation,
  updateOrderStatusValidation,
} from "../validations/orderValidation.js";

const router = express.Router();

/**
 * @route   GET /api/orders
 * @desc    Get logged-in user's orders
 * @access  User
 */
router.get("/", protect, asyncHandler(getUserOrders));

/**
 * @route   GET /api/orders/all
 * @desc    Get all orders (admin)
 * @access  Admin
 */
router.get(
  "/all",
  protect,
  authorizeRoles("admin"),
  asyncHandler(getAllOrders)
);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  User/Admin
 */
router.get("/:id", protect, asyncHandler(getOrderById));

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  User
 */
router.post(
  "/",
  protect,
  validateRequest(createOrderValidation),
  asyncHandler(createOrder)
);

/**
 * @route   PUT /api/orders/:id
 * @desc    Update order status (admin)
 * @access  Admin
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateRequest(updateOrderStatusValidation),
  asyncHandler(updateOrderStatus)
);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Cancel/Delete order (user/admin)
 * @access  User/Admin
 */
router.delete("/:id", protect, asyncHandler(cancelOrder));

export default router;
