import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";
import {
  createAdminValidation,
  updateAdminProfileValidation,
} from "../validations/adminValidation.js";

/**
 * @desc    Create admin profile (user must exist first)
 * @route   POST /api/admins
 * @access  Private (User creating admin profile)
 */
export const createAdmin = asyncHandler(async (req, res) => {
  const validatedData = createAdminValidation.parse(req.body);

  const user = await User.findById(req.user._id);
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);

  const existingAdmin = await Admin.findOne({ user: user._id });
  if (existingAdmin) throw ApiError.conflict(MESSAGES.ADMIN.ALREADY_EXISTS);

  const admin = await Admin.create({
    user: user._id,
    ...validatedData,
  });

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
});

/**
 * @desc    Get current admin profile
 * @route   GET /api/admins/me
 * @access  Private (Admin)
 */
export const getAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findOne({ user: req.user._id }).populate(
    "user",
    "-password"
  );

  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

  logger.info(`Admin profile fetched for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, admin, MESSAGES.ADMIN.FETCHED_SUCCESS)
    );
});

/**
 * @desc    Update current admin profile
 * @route   PUT /api/admins/me
 * @access  Private (Admin)
 */
export const updateAdmin = asyncHandler(async (req, res) => {
  const validatedData = updateAdminProfileValidation.parse(req.body);

  const admin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    validatedData,
    { new: true, runValidators: true }
  );

  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

  logger.info(`Admin profile updated for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, admin, MESSAGES.ADMIN.UPDATED_SUCCESS)
    );
});

/**
 * @desc    Soft delete current admin profile
 * @route   DELETE /api/admins/me
 * @access  Private (Admin)
 */
export const removeAdmin = asyncHandler(async (req, res) => {
  const admin = await Admin.findOneAndUpdate(
    { user: req.user._id },
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

  logger.info(`Admin profile soft-deleted for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.ADMIN.DELETED_SUCCESS)
    );
});

/**
 * @desc    Get all admins (Admin only) with pagination
 * @route   GET /api/admins
 * @access  Private/Admin
 */
export const getAllAdmins = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [admins, total] = await Promise.all([
    Admin.find({ deleted: { $ne: true } })
      .populate("user", "-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Admin.countDocuments({ deleted: { $ne: true } }),
  ]);

  logger.info(
    `Admin userId=${req.user._id} fetched admins page=${page} limit=${limit}`
  );

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      {
        admins,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      MESSAGES.ADMIN.ALL_FETCHED
    )
  );
});

/**
 * @desc    Get admin by ID (Admin only)
 * @route   GET /api/admins/:id
 * @access  Private/Admin
 */
export const getAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findById(req.params.id).populate(
    "user",
    "-password"
  );

  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

  logger.info(`Admin userId=${req.user._id} fetched adminId=${req.params.id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, admin, MESSAGES.ADMIN.FETCHED_SUCCESS)
    );
});

/**
 * @desc    Soft delete admin by ID (Admin only)
 * @route   DELETE /api/admins/:id
 * @access  Private/Admin
 */
export const removeAdminById = asyncHandler(async (req, res) => {
  const admin = await Admin.findByIdAndUpdate(
    req.params.id,
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

  logger.info(
    `Admin userId=${req.user._id} soft-deleted adminId=${req.params.id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.ADMIN.DELETED_SUCCESS)
    );
});
