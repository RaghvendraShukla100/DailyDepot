import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/apiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import { ADMIN_DESIGNATIONS } from "../constants/designation.js";
import { ROLES } from "../constants/roles.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc    Create a finance profile for an existing user
 * @access  Private (Superadmin/Admin with permissions)
 */
export const createFinanceService = async (
  creator,
  { userId, contactEmail, contactPhone, permissions, profilePic, notes }
) => {
  const user = await User.findById(userId);
  if (!user)
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.USER.NOT_FOUND);

  const existingAdmin = await Admin.findOne({ user: userId });
  if (existingAdmin)
    throw new ApiError(
      STATUS_CODES.BAD_REQUEST,
      MESSAGES.ADMIN.ALREADY_EXISTS ||
        "This user is already an admin/support/finance."
    );

  if (
    ![ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN].includes(
      creator.designation
    )
  ) {
    throw new ApiError(
      STATUS_CODES.FORBIDDEN,
      MESSAGES.FINANCE.UNAUTHORIZED_ACCESS ||
        "You are not authorized to create finance."
    );
  }

  // updating user collection for role
  user.role = ROLES.ADMIN;
  await user.save();

  const finance = await Admin.create({
    user: user._id,
    designation: ADMIN_DESIGNATIONS.FINANCE,
    permissions: permissions || ROLE_PERMISSIONS.FINANCE,
    contactEmail,
    contactPhone,
    profilePic,
    notes,
  });

  return finance;
};

/**
 * @desc    Get all finance profiles with optional filters and pagination
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getFinancesService = async (filters = {}, options = {}) => {
  const limit = Math.min(Number(options.limit) || 20, 100);
  const skip = Math.max(Number(options.skip) || 0, 0);

  return await Admin.find({
    designation: ADMIN_DESIGNATIONS.FINANCE,
    deleted: { $ne: true },
    ...filters,
  })
    .populate("user", "name email phone")
    .limit(limit)
    .skip(skip)
    .lean();
};

/**
 * @desc    Get a single finance profile by adminId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getFinanceByIdService = async (adminId) => {
  const finance = await Admin.findOne({
    _id: adminId,
    designation: ADMIN_DESIGNATIONS.FINANCE,
    deleted: { $ne: true },
  })
    .populate("user", "name email phone")
    .lean();
  if (!finance)
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.FINANCE.NOT_FOUND);
  return finance;
};

/**
 * @desc    Update a finance's contact info and permissions
 * @access  Private (Superadmin/Admin with permissions)
 */
export const updateFinanceServiceById = async (
  adminId,
  updater,
  updates,
  profilePic
) => {
  //   console.log(
  //     `=================================================================
  //                     FINANCE SERVICE LAYER DEBUG
  // =================================================================`
  //   );

  //   console.log("ADMIN ID : ", adminId);
  //   console.log("UPDATER : ", updater.designation);
  //   console.log("UPDATES : ", updates);
  //   console.log("PROFILE PIC : ", profilePic);
  //   console.log(
  //     `=================================================================`
  //   );

  const finance = await Admin.findOne({
    _id: adminId,
    designation: ADMIN_DESIGNATIONS.FINANCE,
    deleted: { $ne: true },
  });
  if (!finance)
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.FINANCE.NOT_FOUND);

  finance.contactEmail = updates.contactEmail ?? finance.contactEmail;
  finance.contactPhone = updates.contactPhone ?? finance.contactPhone;
  finance.profilePic = profilePic ?? finance.profilePic;

  if (updates.permissions) {
    let invalidPermissions = [];

    if (updater.designation === ADMIN_DESIGNATIONS.ADMIN) {
      // Validate against updater's own permissions
      invalidPermissions = updates.permissions.filter(
        (p) => !updater.permissions.includes(p)
      );
    }

    if (invalidPermissions.length > 0) {
      throw new ApiError(
        STATUS_CODES.BAD_REQUEST,
        `Invalid permissions: ${invalidPermissions.join(", ")}`
      );
    }

    finance.permissions = updates.permissions;
  }

  await finance.save();
  return finance;
};

/**
 * @desc    Soft delete a finance profile and downgrade user's role
 * @access  Private (Superadmin/Admin with permissions)
 */
export const deleteFinanceService = async (adminId) => {
  const finance = await Admin.findOne({
    _id: adminId,
    designation: ADMIN_DESIGNATIONS.FINANCE,
    deleted: { $ne: true },
  });
  if (!finance)
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.FINANCE.NOT_FOUND);

  finance.deleted = true;
  finance.deletedAt = new Date();
  await finance.save();

  const user = await User.findById(finance.user);
  if (user) {
    user.role = ROLES.USER;
    await user.save();
  }

  return finance;
};
