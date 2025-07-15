import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";
import Admin from "../models/adminSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";
import mongoose from "mongoose";

/**
 * Fetches all admin profiles with user details.
 */
export const getAllAdmins = async (page = 1, limit = 10) => {
  page = parseInt(page) || 1;
  limit = parseInt(limit) || 10;

  const skip = (page - 1) * limit;

  const [admins, total] = await Promise.all([
    Admin.find({ deleted: { $ne: true } })
      .populate("user", "-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Admin.countDocuments({ deleted: { $ne: true } }),
  ]);

  logger.info(`Admins fetched`, { count: admins.length, page, limit, total });

  return { admins, page, limit, total };
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
  logger.info(`Admin created for user`, { userId, adminId: admin._id });

  return admin;
};

/**
 * Fetches an admin profile by userId.
 */
export const getAdminByUserId = async (userId) => {
  const admin = await Admin.findOne({
    user: userId,
    deleted: { $ne: true },
  }).populate("user", "-password");
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  logger.info(`Admin fetched`, { userId });
  return admin;
};

/**
 * Updates an admin profile by userId.
 */
export const updateAdminByUserId = async (userId, updateData) => {
  const admin = await Admin.findOneAndUpdate(
    { user: userId, deleted: { $ne: true } },
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  logger.info(`Admin updated`, { userId, updateData });
  return admin;
};

/**
 * Soft deletes an admin profile by userId and resets user role to USER using transaction.
 */
export const softDeleteAdminByUserId = async (userId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const admin = await Admin.findOneAndUpdate(
      { user: userId, deleted: { $ne: true } },
      { deleted: true, deletedAt: new Date() },
      { new: true, session }
    );
    if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

    await User.findByIdAndUpdate(userId, { role: "user" }, { session });
    await session.commitTransaction();

    logger.info(`Admin soft-deleted and user role reset`, { userId });
    return admin;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

/**
 * Fetches an admin by adminId.
 */
export const getAdminById = async (adminId) => {
  const admin = await Admin.findOne({
    _id: adminId,
    deleted: { $ne: true },
  }).populate("user", "-password");
  if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);
  logger.info(`Admin fetched`, { adminId });
  return admin;
};

/**
 * Soft deletes an admin by adminId and resets user role to USER using transaction.
 */
export const softDeleteAdminById = async (adminId) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const admin = await Admin.findOneAndUpdate(
      { _id: adminId, deleted: { $ne: true } },
      { deleted: true, deletedAt: new Date() },
      { new: true, session }
    );
    if (!admin) throw ApiError.notFound(MESSAGES.ADMIN.NOT_FOUND);

    await User.findByIdAndUpdate(admin.user, { role: "user" }, { session });
    await session.commitTransaction();

    logger.info(`Admin soft-deleted and user role reset`, { adminId });
    return admin;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};
