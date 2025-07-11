// /backend/controllers/analyticsController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Analytics from "../models/analyticsSchema.js";

/**
 * @desc    Create an analytics event
 * @route   POST /api/analytics
 * @access  Public
 *
 * Captures analytics data from the client, including:
 * - Request body fields
 * - Associated user if logged in
 * - IP address and user agent for tracking
 */
export const createAnalytics = asyncHandler(async (req, res) => {
  const analytics = await Analytics.create({
    ...req.body,
    user: req.user?._id || null,
    ipAddress: req.ip,
    userAgent: req.headers["user-agent"],
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, analytics, "Analytics event recorded successfully.")
    );
});

/**
 * @desc    Retrieve all analytics events (admin only)
 * @route   GET /api/analytics
 * @access  Private/Admin
 *
 * Allows admins to view all recorded analytics data for monitoring and insights.
 */
export const getAnalytics = asyncHandler(async (req, res) => {
  const analytics = await Analytics.find({ deleted: false }).sort({
    createdAt: -1,
  });

  res
    .status(200)
    .json(
      new ApiResponse(200, analytics, "Analytics data retrieved successfully.")
    );
});

/**
 * @desc    Soft delete a specific analytics event by ID
 * @route   DELETE /api/analytics/:id
 * @access  Private/Admin
 *
 * Marks an analytics record as deleted for soft deletion while preserving data for audits.
 */
export const deleteAnalytics = asyncHandler(async (req, res) => {
  const analytics = await Analytics.findById(req.params.id);

  if (!analytics || analytics.deleted) {
    throw ApiError.notFound("Analytics data");
  }

  analytics.deleted = true;
  analytics.deletedAt = new Date();
  await analytics.save();

  res
    .status(200)
    .json(new ApiResponse(200, null, "Analytics event deleted successfully."));
});
