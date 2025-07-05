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
 * @desc    Track a new analytics event
 * @access  Public
 */
router.post("/", createAnalyticsController);

/**
 * @route   GET /api/analytics
 * @desc    Get all analytics data
 * @access  Admin
 */
router.get("/", protect, authorizeRoles("admin"), getAnalyticsController);

/**
 * @route   DELETE /api/analytics/:id
 * @desc    Soft delete an analytics event
 * @access  Admin
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteAnalyticsController
);

export default router;
