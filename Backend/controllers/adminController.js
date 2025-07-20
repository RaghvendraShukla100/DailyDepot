import * as adminService from "../services/adminService.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Create a new admin/support/finance profile for an existing user
 * @route   POST /api/admins
 * @access  Private (Superadmin/Admin with proper permissions)
 */
export const createAdmin = async (req, res) => {
  const creator = req.admin;
  const data = req.body;

  const admin = await adminService.createAdminService(creator, data);

  logger.info(`Admin created by ${creator._id} for user ${data.userId}`);

  res
    .status(STATUS_CODES.CREATED)
    .json(new ApiResponse(STATUS_CODES.CREATED, admin, MESSAGES.ADMIN.CREATED));
};

/**
 * @desc    Get all admins with optional filters and pagination
 * @route   GET /api/admins
 * @access  Private (Superadmin/Admin with proper permissions)
 */
export const getAdmins = async (req, res) => {
  const { page = 1, limit = 20, ...filters } = req.query;
  const skip = (page - 1) * limit;

  const admins = await adminService.getAdminsService(filters, { limit, skip });

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, admins, MESSAGES.ADMIN.FETCHED_ALL));
};

/**
 * @desc    Get a single admin by ID
 * @route   GET /api/admins/:adminId
 * @access  Private (Superadmin/Admin with proper permissions)
 */
export const getAdminById = async (req, res) => {
  const admin = await adminService.getAdminByIdService(req.params.id);

  res.status(200).json({
    statusCode: 200,
    data: admin,
    message: "Success",
    success: true,
  });
};

/**
 * @desc    Update an admin's details and permissions
 * @route   PUT /api/admins/:adminId
 * @access  Private (Superadmin/Admin with proper permissions)
 */
export const updateAdmin = async (req, res) => {
  const { id: adminId } = req.params;
  const updater = req.admin;
  const data = req.body;
  const file = req.file;

  const updatedAdmin = await adminService.updateAdminService(
    adminId,
    updater,
    data,
    file
  );

  logger.info(`Admin ${adminId} updated by ${updater._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, updatedAdmin, MESSAGES.ADMIN.UPDATED)
    );
};

/**
 * @desc    Soft delete an admin and downgrade user's role
 * @route   DELETE /api/admins/:adminId
 * @access  Private (Superadmin/Admin with proper permissions)
 */
export const deleteAdmin = async (req, res) => {
  const { id: adminId } = req.params;

  const deletedAdmin = await adminService.deleteAdminService(adminId);

  logger.info(`Admin ${adminId} soft deleted.`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, deletedAdmin, MESSAGES.ADMIN.DELETED)
    );
};

/* ---------------- Superadmin Self Management ---------------- */

/**
 * @desc    Get current superadmin profile
 * @route   GET /api/admins/me
 * @access  Private (Superadmin)
 */
export const getSuperAdmin = async (req, res) => {
  const userId = req.user._id;

  const superadmin = await adminService.getSuperAdminService(userId);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        superadmin,
        MESSAGES.ADMIN.FETCHED_SINGLE
      )
    );
};

/**
 * @desc    Update current superadmin profile
 * @route   PUT /api/admins/me
 * @access  Private (Superadmin)
 */
export const updateSuperAdmin = async (req, res) => {
  const userId = req.user._id;
  const data = req.body;

  const updatedSuperadmin = await adminService.updateSuperAdminService(
    userId,
    data
  );

  logger.info(`Superadmin profile updated by ${userId}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        updatedSuperadmin,
        MESSAGES.ADMIN.UPDATED
      )
    );
};

/**
 * @desc    Soft delete current superadmin profile (safe fallback)
 * @route   DELETE /api/admins/me
 * @access  Private (Superadmin)
 */
export const deleteSuperAdmin = async (req, res) => {
  const userId = req.user._id;

  const deletedSuperadmin = await adminService.deleteSuperAdminService(userId);

  logger.info(`Superadmin profile soft deleted by ${userId}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        deletedSuperadmin,
        MESSAGES.ADMIN.DELETED
      )
    );
};
