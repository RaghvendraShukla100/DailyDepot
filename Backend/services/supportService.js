import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/apiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import { ROLES } from "../constants/roles.js";

/**
 * Create a support admin profile for an existing user
 */

export const createSupportService = async (
  creator,
  { userId, contactEmail, contactPhone, permissions }
) => {
  // console.log("------------------------------------------------------------");
  // console.log("error debugging");
  // console.log("------------------------------------------------------------");
  // console.log("CREATOR : ", creator);
  // console.log("PERMISSIONS PROVIDED : ", permissions);
  // console.log("DEFAULT PERMISSION : ", ROLE_PERMISSIONS.SUPPORT);
  // console.log("FINAL PERMISSION : ", permissions || ROLE_PERMISSIONS.SUPPORT);
  // console.log("------------------------------------------------------------");
  // console.log("error debugging");
  // console.log("------------------------------------------------------------");

  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "User not found.");
  }

  const existingAdmin = await Admin.findOne({
    user: userId,
    deleted: { $ne: true },
  });
  if (existingAdmin) {
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      "This user is already an admin/support/finance."
    );
  }

  if (!["superadmin", "admin"].includes(creator.designation)) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      "You are not authorized to create support."
    );
  }

  user.role = ROLES.ADMIN;
  await user.save();

  const support = await Admin.create({
    user: user._id,
    designation: "support",
    permissions: permissions || ROLE_PERMISSIONS.SUPPORT,
    contactEmail,
    contactPhone,
  });

  return support;
};

/**
 * Get all supports with optional filters and pagination
 */
export const getSupportsService = async (filters = {}, options = {}) => {
  const limitNumber = parseInt(options.limit, 10) || 20;
  const skipNumber = parseInt(options.skip, 10) || 0;

  const supports = await Admin.find({
    designation: "support",
    deleted: { $ne: true },
    ...filters,
  })
    .populate("user", "name email phone")
    .limit(limitNumber)
    .skip(skipNumber)
    .lean();

  return supports;
};

/**
 * Get a single support by adminId
 */
export const getSupportByIdService = async (adminId) => {
  const support = await Admin.findOne({
    _id: adminId,
    designation: "support",
    deleted: { $ne: true },
  })
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
  const support = await Admin.findOne({
    _id: adminId,
    designation: "support",
    deleted: { $ne: true },
  });
  if (!support) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Support not found.");
  }

  if (updates.contactEmail !== undefined) {
    support.contactEmail = updates.contactEmail;
  }
  if (updates.contactPhone !== undefined) {
    support.contactPhone = updates.contactPhone;
  }

  if (Array.isArray(updates.permissions)) {
    const allowedPermissions = ROLE_PERMISSIONS.SUPPORT; // fixed: no .can
    const invalidPermissions = updates.permissions.filter(
      (p) => !allowedPermissions.includes(p)
    );
    if (invalidPermissions.length > 0) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        `Invalid permissions: ${invalidPermissions.join(", ")}`
      );
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
  const support = await Admin.findOne({
    _id: adminId,
    designation: "support",
    deleted: { $ne: true },
  });
  if (!support) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, "Support not found.");
  }

  support.deleted = true;
  support.deletedAt = new Date();
  await support.save();

  const user = await User.findById(support.user);
  if (user) {
    user.role = ROLES.USER;
    await user.save();
  }

  return support;
};
