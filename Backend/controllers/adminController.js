// /backend/controllers/adminController.js

import * as adminService from "../services/adminService.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Create admin profile (user must exist first)
 * @route   POST /api/admins
 * @access  Private (User creating admin profile)
 */
export const createAdmin = async (req, res) => {
  const admin = await adminService.createAdmin(req.user._id, req.validatedData);

  logger.info(`Admin profile created for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        admin,
        MESSAGES.ADMIN.CREATED_SUCCESS
      )
    );
};

/**
 * @desc    Get current admin profile
 * @route   GET /api/admins/me
 * @access  Private (Admin)
 */
export const getAdmin = async (req, res) => {
  const admin = await adminService.getAdminProfile(req.user._id);

  logger.info(`Admin profile fetched for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, admin, MESSAGES.ADMIN.FETCHED_SUCCESS)
    );
};

/**
 * @desc    Update current admin profile
 * @route   PUT /api/admins/me
 * @access  Private (Admin)
 */
export const updateAdmin = async (req, res) => {
  const admin = await adminService.updateAdminProfile(
    req.user._id,
    req.validatedData
  );

  logger.info(`Admin profile updated for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, admin, MESSAGES.ADMIN.UPDATED_SUCCESS)
    );
};

/**
 * @desc    Soft delete current admin profile and reset user role to USER
 * @route   DELETE /api/admins/me
 * @access  Private (Admin)
 */
export const removeAdmin = async (req, res) => {
  await adminService.softDeleteAdmin(req.user._id);

  logger.info(
    `Admin profile soft-deleted and role reset for userId=${req.user._id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.ADMIN.DELETED_SUCCESS)
    );
};

/**
 * @desc    Get all admins (Supradmin only) with pagination
 * @route   GET /api/admins
 * @access  Private/Supradmin
 */
export const getAllAdmins = async (req, res) => {
  const { admins, page, limit, total } = await adminService.getAllAdmins(
    req.query.page,
    req.query.limit
  );

  logger.info(`Admin userId=${req.user._id} fetched all admins`, {
    page,
    limit,
  });

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      {
        admins,
        page,
        limit,
        total,
        totalPages: limit ? Math.ceil(total / limit) : 1,
      },
      MESSAGES.ADMIN.ALL_FETCHED
    )
  );
};

/**
 * @desc    Get admin by ID (Supradmin only)
 * @route   GET /api/admins/:id
 * @access  Private/Supradmin
 */
export const getAdminById = async (req, res) => {
  const admin = await adminService.getAdminById(req.params.id);

  logger.info(`Admin userId=${req.user._id} fetched adminId=${req.params.id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, admin, MESSAGES.ADMIN.FETCHED_SUCCESS)
    );
};

/**
 * @desc    Soft delete admin by ID (Supradmin only)  and reset user role to USER
 * @route   DELETE /api/admins/:id
 * @access  Private/Supradmin
 */
export const removeAdminById = async (req, res) => {
  await adminService.softDeleteAdminById(req.params.id);

  logger.info(
    `Admin userId=${req.user._id} soft-deleted adminId=${req.params.id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.ADMIN.DELETED_SUCCESS)
    );
};
