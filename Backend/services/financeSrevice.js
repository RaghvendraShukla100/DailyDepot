// /backend/services/financeService.js

import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/apiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import { ROLES } from "../constants/roles.js";

/**
 * Create a finance profile for an existing user
 */
export const createFinanceService = async (creator, { userId, contactEmail, contactPhone, permissions }) => {
  // Check if user exists
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "User not found.");
  }

  // Check if already linked to an admin profile
  const existingAdmin = await Admin.findOne({ user: userId });
  if (existingAdmin) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, "This user is already an admin/support/finance.");
  }

  // Only superadmin or admin can create finance
  if (!["superadmin", "admin"].includes(creator.designation)) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, "You are not authorized to create finance.");
  }

  // Upgrade user role to ADMIN
  user.role = ROLES.ADMIN;
  await user.save();

  // Prepare permissions with validation
  const defaultPermissions = ROLE_PERMISSIONS.finance.can;
  let finalPermissions = defaultPermissions;

  if (permissions) {
    const invalidPermissions = permissions.filter(p => !defaultPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, `Invalid permissions: ${invalidPermissions.join(", ")}`);
    }
    finalPermissions = permissions;
  }

  // Create Admin record with designation = "finance"
  const finance = await Admin.create({
    user: user._id,
    designation: "finance",
    permissions: finalPermissions,
    contactEmail,
    contactPhone,
  });

  return finance;
};

/**
 * Get all finance profiles with optional filters and pagination
 */
export const getFinancesService = async (filters = {}, options = {}) => {
  const { limit = 20, skip = 0 } = options;
  const finances = await Admin.find({ designation: "finance", ...filters })
    .populate("user", "name email phone")
    .limit(limit)
    .skip(skip)
    .lean();

  return finances;
};

/**
 * Get a single finance profile by adminId
 */
export const getFinanceByIdService = async (adminId) => {
  const finance = await Admin.findOne({ _id: adminId, designation: "finance" })
    .populate("user", "name email phone")
    .lean();

  if (!finance) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Finance profile not found.");
  }

  return finance;
};

/**
 * Update a finance's contact info and permissions
 */
export const updateFinanceService = async (adminId, updater, updates) => {
  const finance = await Admin.findOne({ _id: adminId, designation: "finance" });
  if (!finance) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Finance profile not found.");
  }

  // Allow contact updates
  if (updates.contactEmail !== undefined) {
    finance.contactEmail = updates.contactEmail;
  }
  if (updates.contactPhone !== undefined) {
    finance.contactPhone = updates.contactPhone;
  }

  if (updates.permissions) {
    const allowedPermissions = ROLE_PERMISSIONS.finance.can;
    const invalidPermissions = updates.permissions.filter(p => !allowedPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, `Invalid permissions: ${invalidPermissions.join(", ")}`);
    }
    finance.permissions = updates.permissions;
  }

  await finance.save();
  return finance;
};

/**
 * Soft delete a finance profile and downgrade user's role
 */
export const deleteFinanceService = async (adminId) => {
  const finance = await Admin.findOne({ _id: adminId, designation: "finance" });
  if (!finance) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Finance profile not found.");
  }

  // Soft delete admin
  finance.deleted = true;
  finance.deletedAt = new Date();
  await finance.save();

  // Downgrade linked user's role back to user
  const user = await User.findById(finance.user);
  if (user) {
    user.role = ROLES.USER;
    await user.save();
  }

  return finance;
};
