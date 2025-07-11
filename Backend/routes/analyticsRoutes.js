// /backend/routes/analyticsRoutes.js

import express from "express";
import {
  createAnalyticsController,
  getAnalyticsController,
  deleteAnalyticsController,
} from "../controllers/analyticsController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/analytics
 * @desc    Record a new analytics event
 * @access  Public
 *
 * Allows the frontend to send analytics data for tracking user interactions,
 * device information, or behavioral events.
 */
router.post("/", createAnalyticsController);

/**
 * @route   GET /api/analytics
 * @desc    Retrieve all analytics data (admin only)
 * @access  Private/Admin
 *
 * Enables admins to view collected analytics data for insights and monitoring.
 */
router.get("/", protect, authorizeRoles("admin"), getAnalyticsController);

/**
 * @route   DELETE /api/analytics/:id
 * @desc    Soft delete an analytics event by ID (admin only)
 * @access  Private/Admin
 *
 * Soft deletes an analytics entry while preserving its data for audit trails.
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteAnalyticsController
);

export default router;
