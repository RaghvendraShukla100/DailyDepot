// /backend/controllers/userController.js

import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import * as userService from "../services/userService.js";

/**
 * @desc    Fetch the currently logged-in user's profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = async (req, res) => {
  const user = await userService.getUserProfile(req.user._id);
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
  const updatedUser = await userService.updateUserProfile(
    req.user._id,
    req.body
  );
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        updatedUser,
        MESSAGES.USER.PROFILE_UPDATED
      )
    );
};

/**
 * @desc    Soft delete the currently logged-in user's account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
export const deleteUserProfile = async (req, res) => {
  await userService.softDeleteUser(req.user._id);
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
  const { page = 1, limit = 20 } = req.query;
  const usersData = await userService.getAllUsers(Number(page), Number(limit));
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, usersData, MESSAGES.USER.ALL_FETCHED)
    );
};

/**
 * @desc    Fetch a specific user by ID (Admin only)
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
export const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
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
  await userService.softDeleteUser(req.params.id);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.USER.DELETED_SUCCESS)
    );
};
