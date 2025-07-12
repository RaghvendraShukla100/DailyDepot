// /backend/routes/notificationRoutes.js

import express from "express";
import {
  createNotification,
  getNotifications,
  markNotificationAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for logged-in user
 * @access  Private (User)
 */
router.get("/", protect, asyncHandler(getNotifications));

/**
 * @route   POST /api/notifications
 * @desc    Create a notification (admin/system)
 * @access  Private (Admin)
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  asyncHandler(createNotification)
);

/**
 * @route   PATCH /api/notifications/:id/read
 * @desc    Mark a notification as read
 * @access  Private (User)
 */
router.patch("/:id/read", protect, asyncHandler(markNotificationAsRead));

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Soft-delete a notification
 * @access  Private (User/Admin)
 */
router.delete("/:id", protect, asyncHandler(deleteNotification));

export default router;
