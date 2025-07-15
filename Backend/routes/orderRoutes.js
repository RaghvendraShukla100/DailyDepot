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
import validateResource from "../middlewares/validateResource.js";
import {
  createOrderValidation,
  updateOrderStatusValidation,
} from "../validations/orderValidation.js";

const router = express.Router();

// Get logged-in user's orders
router.get("/", protect, getUserOrders);

// Get all orders (admin)
router.get("/all", protect, authorizeRoles("admin"), getAllOrders);

// Get order by ID
router.get("/:id", protect, getOrderById);

// Create a new order
router.post("/", protect, validateResource(createOrderValidation), createOrder);

// Update order status (admin)
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateResource(updateOrderStatusValidation),
  updateOrderStatus
);

// Cancel/Delete order (user/admin)
router.delete("/:id", protect, cancelOrder);

export default router;
