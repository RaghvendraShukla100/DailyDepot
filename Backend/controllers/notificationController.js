// Backend/controllers/notificationController.js

import Notification from "../models/notificationSchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// @desc    Create a notification (admin or system actions)
// @route   POST /api/notifications
// @access  Admin/System
export const createNotificationController = asyncHandler(async (req, res) => {
  const notification = await Notification.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        notification,
        "Notification created successfully."
      )
    );
});

// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Authenticated User
export const getNotificationsController = asyncHandler(async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
    deleted: false,
  }).sort({ createdAt: -1 });

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, notifications));
});

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Authenticated User
export const markNotificationAsReadController = asyncHandler(
  async (req, res) => {
    const notification = await Notification.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id, deleted: false },
      { read: true },
      { new: true }
    );

    if (!notification) {
      throw ApiError.notFound("Notification");
    }

    res
      .status(STATUS_CODES.OK)
      .json(
        new ApiResponse(
          STATUS_CODES.OK,
          notification,
          "Notification marked as read."
        )
      );
  }
);

// @desc    Delete a notification (soft delete)
// @route   DELETE /api/notifications/:id
// @access  Authenticated User
export const deleteNotificationController = asyncHandler(async (req, res) => {
  const notification = await Notification.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, deleted: false },
    { deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!notification) {
    throw ApiError.notFound("Notification");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        "Notification deleted successfully."
      )
    );
});
