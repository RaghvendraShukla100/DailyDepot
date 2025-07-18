// /backend/services/supportService.js

import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/apiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import { ROLES } from "../constants/roles.js";

/**
 * Create a support admin profile for an existing user
 */
export const createSupportService = async (creator, { userId, contactEmail, contactPhone, permissions }) => {
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

  // Only superadmin or admin can create support
  if (!["superadmin", "admin"].includes(creator.designation)) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, "You are not authorized to create support.");
  }

  // Set user's role to ADMIN (since support managed under admin)
  user.role = ROLES.ADMIN;
  await user.save();

  // Prepare permissions (default + custom within limits)
  const defaultPermissions = ROLE_PERMISSIONS.support.can;
  let finalPermissions = defaultPermissions;

  if (permissions) {
    const invalidPermissions = permissions.filter(p => !defaultPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, `Invalid permissions: ${invalidPermissions.join(", ")}`);
    }
    finalPermissions = permissions;
  }

  // Create Admin record with designation = "support"
  const support = await Admin.create({
    user: user._id,
    designation: "support",
    permissions: finalPermissions,
    contactEmail,
    contactPhone,
  });

  return support;
};

/**
 * Get all supports with optional filters and pagination
 */
export const getSupportsService = async (filters = {}, options = {}) => {
  const { limit = 20, skip = 0 } = options;
  const supports = await Admin.find({ designation: "support", ...filters })
    .populate("user", "name email phone")
    .limit(limit)
    .skip(skip)
    .lean();

  return supports;
};

/**
 * Get a single support by adminId
 */
export const getSupportByIdService = async (adminId) => {
  const support = await Admin.findOne({ _id: adminId, designation: "support" })
    .populate("user", "name email phone")
    .lean();

  if (!support) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Support not found.");
  }

  return support;
};

/**
 * Update a support's contact info and permissions
 */
export const updateSupportService = async (adminId, updater, updates) => {
  const support = await Admin.findOne({ _id: adminId, designation: "support" });
  if (!support) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Support not found.");
  }

  // Allow updating contact info and permissions
  if (updates.contactEmail !== undefined) {
    support.contactEmail = updates.contactEmail;
  }
  if (updates.contactPhone !== undefined) {
    support.contactPhone = updates.contactPhone;
  }

  if (updates.permissions) {
    const allowedPermissions = ROLE_PERMISSIONS.support.can;
    const invalidPermissions = updates.permissions.filter(p => !allowedPermissions.includes(p));
    if (invalidPermissions.length > 0) {
      throw new ApiError(STATUS_CODES.BAD_REQUEST, `Invalid permissions: ${invalidPermissions.join(", ")}`);
    }
    support.permissions = updates.permissions;
  }

  await support.save();
  return support;
};

/**
 * Soft delete support and downgrade user's role
 */
export const deleteSupportService = async (adminId) => {
  const support = await Admin.findOne({ _id: adminId, designation: "support" });
  if (!support) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Support not found.");
  }

  // Soft delete admin
  support.deleted = true;
  support.deletedAt = new Date();
  await support.save();

  // Downgrade linked user's role back to "user"
  const user = await User.findById(support.user);
  if (user) {
    user.role = ROLES.USER;
    await user.save();
  }

  return support;
};
