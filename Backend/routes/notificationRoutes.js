// /backend/routes/notificationRoutes.js

import express from "express";
import {
  createNotificationController,
  getNotificationsController,
  markNotificationAsReadController,
  deleteNotificationController,
} from "../controllers/notificationController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import { createNotificationSchema } from "../validations/notificationValidation.js";

const router = express.Router();

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for logged-in user
 * @access  Private (User)
 */
router.get("/", protect, getNotificationsController);

/**
 * @route   POST /api/notifications
 * @desc    Create a notification (admin/system)
 * @access  Private (Admin)
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateResource(createNotificationSchema),
  createNotificationController
);

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark a notification as read
 * @access  Private (User)
 */
router.patch("/:id/read", protect, markNotificationAsReadController);

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Soft-delete a notification
 * @access  Private (User/Admin)
 */
router.delete("/:id", protect, deleteNotificationController);

export default router;
