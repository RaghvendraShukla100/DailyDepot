// /backend/routes/notificationRoutes.js

import express from "express";
import {
  getAllNotificationsController,
  getNotificationByIdController,
  createNotificationController,
  updateNotificationController,
  deleteNotificationController,
} from "../controllers/notificationController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createNotificationSchema,
  updateNotificationSchema,
} from "../validations/notificationValidation.js";

const router = express.Router();

/**
 * @route   GET /api/notifications
 * @desc    Get all notifications for logged-in user/admin
 * @access  Auth
 */
router.get("/", protect, getAllNotificationsController);

/**
 * @route   GET /api/notifications/:id
 * @desc    Get single notification by ID
 * @access  Auth
 */
router.get("/:id", protect, getNotificationByIdController);

/**
 * @route   POST /api/notifications
 * @desc    Create a notification (admin use)
 * @access  Admin
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  validateResource(createNotificationSchema),
  createNotificationController
);

/**
 * @route   PUT /api/notifications/:id
 * @desc    Update a notification (admin use)
 * @access  Admin
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  validateResource(updateNotificationSchema),
  updateNotificationController
);

/**
 * @route   DELETE /api/notifications/:id
 * @desc    Soft-delete a notification
 * @access  User (self) / Admin
 */
router.delete("/:id", protect, deleteNotificationController);

export default router;
