// /backend/controllers/notificationController.js

import Notification from "../models/notificationSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Create a notification (admin or system actions)
// @route   POST /api/notifications
// @access  Admin/System
export const createNotification = async (req, res) => {
  const { user, message, type, metadata } = req.body;

  if (!user || !message || !type) {
    throw ApiError.badRequest(MESSAGES.GENERAL.BAD_REQUEST);
  }

  const notification = await Notification.create({
    user,
    message,
    type,
    metadata,
  });

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        notification,
        MESSAGES.GENERAL.CREATED_SUCCESS || "Notification created successfully."
      )
    );
};

// @desc    Get all notifications for a user
// @route   GET /api/notifications
// @access  Authenticated User
export const getNotifications = async (req, res) => {
  const notifications = await Notification.find({
    user: req.user._id,
    deleted: false,
  }).sort({ createdAt: -1 });

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        notifications,
        "Notifications fetched successfully."
      )
    );
};

// @desc    Mark a notification as read
// @route   PATCH /api/notifications/:id/read
// @access  Authenticated User
export const markNotificationAsRead = async (req, res) => {
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
};

// @desc    Delete a notification (soft delete)
// @route   DELETE /api/notifications/:id
// @access  Authenticated User
export const deleteNotification = async (req, res) => {
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
};
