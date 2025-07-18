import mongoose from "mongoose";
import User from "../models/userSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/apiError.js";
import { ROLE_PERMISSIONS } from "../constants/rolePermissions.js";
import { ROLES } from "../constants/roles.js";

// Utility: check if creator can create the requested designation
const canCreatorCreateDesignation = (creatorDesignation, targetDesignation) => {
  if (creatorDesignation === "superadmin") return true;
  if (creatorDesignation === "admin" && ["support", "finance"].includes(targetDesignation)) return true;
  return false;
};

// Utility: ensure permissions are within creator's authority
const validatePermissionsWithinCreator = (creator, requestedPermissions) => {
  const creatorPermissions = creator.permissions || ROLE_PERMISSIONS[creator.designation]?.can || [];
  const canAssignAll = requestedPermissions.every(perm => creatorPermissions.includes(perm));
  if (!canAssignAll) {
    throw ApiError.forbidden("Cannot assign permissions you do not possess.");
  }
};

// ✅ CREATE Admin / Support / Finance
export const createAdminService = async (creator, data) => {
  const { userId, designation, permissions, contactEmail, contactPhone, profilePic, notes } = data;

  if (!canCreatorCreateDesignation(creator.designation, designation)) {
    throw ApiError.forbidden("You are not authorized to create this designation.");
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw ApiError.badRequest("Invalid user ID.");
  }

  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found.");

  const existingAdmin = await Admin.findOne({ user: user._id });
  if (existingAdmin) throw ApiError.badRequest("This user is already an admin/support/finance.");

  // Update user role to ADMIN
  user.role = ROLES.ADMIN;
  await user.save();

  // Determine effective permissions
  const defaultPermissions = ROLE_PERMISSIONS[designation]?.can || [];
  const effectivePermissions = permissions?.length > 0 ? permissions : defaultPermissions;
  validatePermissionsWithinCreator(creator, effectivePermissions);

  // Create admin
  const admin = await Admin.create({
    user: user._id,
    designation,
    permissions: effectivePermissions,
    contactEmail: contactEmail || user.email,
    contactPhone: contactPhone || user.phone,
    profilePic,
    notes,
  });

  return admin;
};

// ✅ READ all admins with filter
export const getAdminsService = async (filter = {}, options = {}) => {
  const admins = await Admin.find(filter)
    .populate({
      path: "user",
      select: "name email phone role",
    })
    .sort({ createdAt: -1 })
    .limit(options.limit || 20)
    .skip(options.skip || 0);

  return admins;
};

// ✅ READ single admin by ID
export const getAdminByIdService = async (adminId) => {
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    throw ApiError.badRequest("Invalid admin ID.");
  }

  const admin = await Admin.findById(adminId).populate({
    path: "user",
    select: "name email phone role",
  });

  if (!admin) throw ApiError.notFound("Admin not found.");

  return admin;
};

// ✅ UPDATE admin profile
export const updateAdminService = async (adminId, updater, data) => {
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    throw ApiError.badRequest("Invalid admin ID.");
  }

  const admin = await Admin.findById(adminId);
  if (!admin) throw ApiError.notFound("Admin not found.");

  // Only superadmin/admin can update
  if (updater.designation === "admin" && admin.designation === "admin") {
    throw ApiError.forbidden("Admins cannot update other admins.");
  }

  // If updating permissions, check within updater's authority
  if (data.permissions) {
    validatePermissionsWithinCreator(updater, data.permissions);
    admin.permissions = data.permissions;
  }

  if (data.contactEmail !== undefined) admin.contactEmail = data.contactEmail;
  if (data.contactPhone !== undefined) admin.contactPhone = data.contactPhone;
  if (data.profilePic !== undefined) admin.profilePic = data.profilePic;
  if (data.notes !== undefined) admin.notes = data.notes;
  if (data.isActive !== undefined) admin.isActive = data.isActive;

  await admin.save();

  return admin;
};

// ✅ DELETE admin (soft delete)
export const deleteAdminService = async (adminId) => {
  if (!mongoose.Types.ObjectId.isValid(adminId)) {
    throw ApiError.badRequest("Invalid admin ID.");
  }

  const admin = await Admin.findById(adminId);
  if (!admin) throw ApiError.notFound("Admin not found.");

  // Soft delete admin
  admin.deleted = true;
  admin.deletedAt = new Date();
  await admin.save();

  // Downgrade user role to USER
  const user = await User.findById(admin.user);
  if (user) {
    user.role = ROLES.USER;
    await user.save();
  }

  return admin;
};

/* ---------------- Superadmin Self Management ---------------- */

// ✅ READ superadmin profile
export const getSuperAdminService = async (userId) => {
  const admin = await Admin.findOne({ user: userId, designation: "superadmin", deleted: false })
    .populate({
      path: "user",
      select: "name email phone role",
    });

  if (!admin) throw ApiError.notFound("Superadmin profile not found.");
  return admin;
};

// ✅ UPDATE superadmin profile
export const updateSuperAdminService = async (userId, data) => {
  const admin = await Admin.findOne({ user: userId, designation: "superadmin", deleted: false });
  if (!admin) throw ApiError.notFound("Superadmin profile not found.");

  if (data.contactEmail !== undefined) admin.contactEmail = data.contactEmail;
  if (data.contactPhone !== undefined) admin.contactPhone = data.contactPhone;
  if (data.profilePic !== undefined) admin.profilePic = data.profilePic;
  if (data.notes !== undefined) admin.notes = data.notes;
  if (data.isActive !== undefined) admin.isActive = data.isActive;

  await admin.save();
  return admin;
};

// ✅ DELETE superadmin profile with safe fallback
export const deleteSuperAdminService = async (userId) => {
  const activeSuperadmins = await Admin.countDocuments({
    designation: "superadmin",
    deleted: false,
  });

  if (activeSuperadmins <= 1) {
    throw ApiError.forbidden("Cannot delete the last active superadmin for system safety.");
  }

  const admin = await Admin.findOne({ user: userId, designation: "superadmin", deleted: false });
  if (!admin) throw ApiError.notFound("Superadmin profile not found.");

  admin.deleted = true;
  admin.deletedAt = new Date();
  await admin.save();

  // Downgrade user to USER
  const user = await User.findById(userId);
  if (user) {
    user.role = ROLES.USER;
    await user.save();
  }

  return admin;
};
