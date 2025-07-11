// /backend/controllers/userController.js

import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/userSchema.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Fetch the currently logged-in user's profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  logger.info(`User profile fetched for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, user, MESSAGES.USER.PROFILE_FETCHED)
    );
};

/**
 * @desc    Update the currently logged-in user's profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  if (req.body.name) {
    const [first, ...last] = req.body.name.trim().split(" ");
    user.name.first = first || user.name.first;
    user.name.last = last.join(" ") || user.name.last;
  }
  if (req.body.bio !== undefined) user.bio = req.body.bio;
  if (req.body.phone !== undefined) user.phone = req.body.phone;
  if (req.body.address !== undefined) user.addresses.push(req.body.address);

  await user.save();

  logger.info(`User profile updated for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, user, MESSAGES.USER.PROFILE_UPDATED)
    );
};

/**
 * @desc    Soft delete the currently logged-in user's account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
export const deleteUserProfile = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  user.deleted = true;
  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();

  logger.info(`User account soft-deleted for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.USER.DELETED_SUCCESS)
    );
};

/**
 * @desc    Fetch all non-deleted users (Admin only) with pagination
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find({ deleted: { $ne: true } })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    User.countDocuments({ deleted: { $ne: true } }),
  ]);

  logger.info(
    `Admin userId=${req.user._id} fetched users page=${page} limit=${limit}`
  );

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      {
        users,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      MESSAGES.USER.ALL_FETCHED
    )
  );
};

/**
 * @desc    Fetch a specific user by ID (Admin only)
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
export const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  logger.info(`Admin userId=${req.user._id} fetched userId=${req.params.id}`);

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, user, MESSAGES.USER.FETCHED));
};

/**
 * @desc    Soft delete a specific user by ID (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUserById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  user.deleted = true;
  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();

  logger.info(
    `Admin userId=${req.user._id} soft-deleted userId=${req.params.id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.USER.DELETED_SUCCESS)
    );
};
