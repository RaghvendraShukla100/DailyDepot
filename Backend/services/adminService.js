// /backend/services/adminService.js

import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * Fetches all admin profiles with user details.
 */
export const getAllAdmins = async () => {
  const admins = await Admin.find({ deleted: { $ne: true } }).populate(
    "user",
    "-password"
  );
  logger.info(`All admins fetched`, { count: admins.length });
  return admins;
};

/**
 * Creates a new admin profile.
 */
export const createAdmin = async (userId, adminData) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);

  const existingAdmin = await Admin.findOne({ user: user._id });
  if (existingAdmin) throw ApiError.conflict(MESSAGES.ADMIN.ALREADY_EXISTS);

  user.role = "admin";
  await user.save();

  const admin = await Admin.create({ user: user._id, ...adminData });
  logger.info(`Admin created for userId=${userId}`);
  return admin;
};

/**
 * Fetches an admin profile by userId.
 */
export const getAdminByUserId = async (userId) => {
  const admin = await Admin.findOne({ user: userId }).populate(
    "user",
    "-password"
  );
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  logger.info(`Admin fetched for userId=${userId}`);
  return admin;
};

/**
 * Updates an admin profile by userId.
 */
export const updateAdminByUserId = async (userId, updateData) => {
  const admin = await Admin.findOneAndUpdate({ user: userId }, updateData, {
    new: true,
    runValidators: true,
  });
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  logger.info(`Admin updated for userId=${userId}`);
  return admin;
};

/**
 * Soft deletes an admin profile by userId and resets user role to USER.
 */
export const softDeleteAdminByUserId = async (userId) => {
  const admin = await Admin.findOneAndUpdate(
    { user: userId },
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  );
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

  await User.findByIdAndUpdate(userId, { role: "user" });
  logger.info(`Admin soft-deleted and user role reset for userId=${userId}`);
  return admin;
};

/**
 * Fetches an admin by adminId.
 */
export const getAdminById = async (adminId) => {
  const admin = await Admin.findById(adminId).populate("user", "-password");
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  logger.info(`Admin fetched for adminId=${adminId}`);
  return admin;
};

/**
 * Soft deletes an admin by adminId and resets user role to USER.
 */
export const softDeleteAdminById = async (adminId) => {
  const admin = await Admin.findByIdAndUpdate(
    adminId,
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  );
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

  await User.findByIdAndUpdate(admin.user, { role: "user" });
  logger.info(`Admin soft-deleted for adminId=${adminId} and user role reset`);
  return admin;
};
