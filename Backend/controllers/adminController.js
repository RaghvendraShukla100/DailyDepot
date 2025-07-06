import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import Admin from "../models/adminSchema.js";
import User from "../models/userSchema.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
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
  if (existingAdmin)
    throw ApiError.conflict("Admin profile already exists for this user.");

  const admin = await Admin.create({
    user: user._id,
    ...validatedData,
  });

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        admin,
        "Admin profile created successfully."
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

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        admin,
        "Admin profile fetched successfully."
      )
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

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        admin,
        "Admin profile updated successfully."
      )
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

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        "Admin profile deleted successfully."
      )
    );
});

/**
 * @desc    Get all admins (Admin only)
 * @route   GET /api/admins
 * @access  Private/Admin
 */
export const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find({ deleted: { $ne: true } }).populate(
    "user",
    "-password"
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        admins,
        "All admin profiles fetched successfully."
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

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        admin,
        "Admin profile fetched successfully."
      )
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

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        "Admin profile deleted successfully."
      )
    );
});
