// /backend/routes/analyticsRoutes.js

import express from "express";
import {
  getAllAnalyticsController,
  getUserAnalyticsController,
  createAnalyticsController,
  deleteAnalyticsController,
} from "../controllers/analyticsController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import { createAnalyticsSchema } from "../validations/analyticsValidation.js";

const router = express.Router();

/**
 * @route   GET /api/analytics
 * @desc    Get all analytics data
 * @access  Admin
 */
router.get("/", protect, authorizeRoles("admin"), getAllAnalyticsController);

/**
 * @route   GET /api/analytics/my
 * @desc    Get current user's analytics data
 * @access  Auth
 */
router.get("/my", protect, getUserAnalyticsController);

/**
 * @route   POST /api/analytics
 * @desc    Track a new analytics event
 * @access  Auth
 */
router.post(
  "/",
  protect,
  validateResource(createAnalyticsSchema),
  createAnalyticsController
);

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
