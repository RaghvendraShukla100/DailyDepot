// /backend/routes/orderRoutes.js

import express from "express";
import {
  createOrderController,
  getUserOrdersController,
  getAllOrdersController,
  getOrderByIdController,
  updateOrderStatusController,
  cancelOrderController,
} from "../controllers/orderController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../validations/orderValidation.js";

const router = express.Router();

/**
 * @route   GET /api/orders
 * @desc    Get logged-in user's orders
 * @access  User
 */
router.get("/", protect, getUserOrdersController);

/**
 * @route   GET /api/orders/all
 * @desc    Get all orders (admin)
 * @access  Admin
 */
router.get("/all", protect, authorizeRoles("admin"), getAllOrdersController);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  User/Admin
 */
router.get("/:id", protect, getOrderByIdController);

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  User
 */
router.post(
  "/",
  protect,
  validateResource(createOrderSchema),
  createOrderController
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
  validateResource(updateOrderStatusSchema),
  updateOrderStatusController
);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Cancel/Delete order (user/admin)
 * @access  User/Admin
 */
router.delete("/:id", protect, cancelOrderController);

export default router;
