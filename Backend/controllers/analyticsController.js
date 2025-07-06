// /Backend/controllers/analyticsController.js

import asyncHandlerMiddleware from "../middlewares/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import Analytics from "../models/analyticsSchema.js";

/**
 * @desc Create analytics event
 * @route POST /api/analytics
 * @access Public
 */
export const createAnalyticsController = asyncHandlerMiddleware(
  async (req, res) => {
    const analytics = await Analytics.create({
      ...req.body,
      user: req.user?._id || null,
      ipAddress: req.ip,
      userAgent: req.headers["user-agent"],
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, analytics, "Analytics event recorded successfully")
      );
  }
);

/**
 * @desc Get all analytics data (Admin only)
 * @route GET /api/analytics
 * @access Private (Admin)
 */
export const getAnalyticsController = asyncHandlerMiddleware(
  async (req, res) => {
    const analytics = await Analytics.find({ deleted: false }).sort({
      createdAt: -1,
    });
    res.status(200).json(new ApiResponse(200, analytics));
  }
);

/**
 * @desc Delete analytics event (soft delete)
 * @route DELETE /api/analytics/:id
 * @access Private (Admin)
 */
export const deleteAnalyticsController = asyncHandlerMiddleware(
  async (req, res) => {
    const analytics = await Analytics.findById(req.params.id);
    if (!analytics || analytics.deleted) {
      throw ApiError.notFound("Analytics data");
    }

    analytics.deleted = true;
    analytics.deletedAt = new Date();
    await analytics.save();

    res
      .status(200)
      .json(new ApiResponse(200, null, "Analytics event deleted successfully"));
  }
);
