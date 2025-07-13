import Seller from "../models/sellerSchema.js";
import User from "../models/userSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";
import { ROLES } from "../constants/roles.js";

// Seller Service Layer for managing seller operations in a clean, reusable, scalable manner following industry standards
// Includes CRUD operations, soft deletes, and pagination utilities with proper logging and error handling for maintainability

/**
 * Fetch seller profile by sellerId with populated user details.
 */
export const getSellerProfile = async (sellerId) => {
  const seller = await Seller.findById(sellerId).populate("user", "-password");
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller profile fetched`, { sellerId });
  return seller;
};

/**
 * Update seller profile by sellerId with validation.
 */
export const updateSellerProfile = async (sellerId, updateData) => {
  const seller = await Seller.findByIdAndUpdate(sellerId, updateData, {
    new: true,
    runValidators: true,
  }).populate("user", "-password");
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller profile updated`, { sellerId });
  return seller;
};

/**
 * Create seller profile and upgrade user role to SELLER.
 */
export const createSellerProfile = async (userId, sellerData) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  const existingSeller = await Seller.findOne({ user: userId });
  if (existingSeller) throw ApiError.conflict(MESSAGES.SELLER.ALREADY_EXISTS);
  user.role = ROLES.SELLER;
  await user.save();
  const seller = await Seller.create({ user: userId, ...sellerData });
  logger.info(`Seller profile created for userId=${userId}`);
  return seller;
};

/**
 * Fetch seller profile by userId with populated user details.
 */
export const getSellerProfileByUserId = async (userId) => {
  const seller = await Seller.findOne({ user: userId }).populate(
    "user",
    "-password"
  );
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller profile fetched for userId=${userId}`);
  return seller;
};

/**
 * Update seller profile by userId with validation.
 */
export const updateSellerProfileByUserId = async (userId, updateData) => {
  const seller = await Seller.findOneAndUpdate({ user: userId }, updateData, {
    new: true,
    runValidators: true,
  }).populate("user", "-password");
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller profile updated for userId=${userId}`);
  return seller;
};

/**
 * Soft delete seller profile by userId and downgrade user role to USER.
 */
export const softDeleteSellerByUserId = async (userId) => {
  const seller = await Seller.findOneAndUpdate(
    { user: userId },
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  );
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  const user = await User.findById(userId);
  if (user) {
    user.role = ROLES.USER;
    await user.save();
    logger.info(`User role downgraded to USER for userId=${userId}`);
  }
  logger.info(`Seller profile soft-deleted for userId=${userId}`);
  return seller;
};

/**
 * Fetch all sellers with pagination for admin views.
 */
export const getAllSellers = async (query) => {
  const page = parseInt(query.page) || 1;
  const limit = parseInt(query.limit) || 20;
  const skip = (page - 1) * limit;
  const [sellers, total] = await Promise.all([
    Seller.find({ deleted: { $ne: true } })
      .populate("user", "-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    Seller.countDocuments({ deleted: { $ne: true } }),
  ]);
  const pagination = {
    page,
    limit,
    total,
    totalPages: Math.ceil(total / limit),
  };
  logger.info(`Fetched sellers with pagination page=${page} limit=${limit}`);
  return { sellers, pagination };
};

/**
 * Soft delete seller profile by sellerId (admin use).
 */
export const softDeleteSellerById = async (sellerId) => {
  const seller = await Seller.findByIdAndUpdate(
    sellerId,
    { status: "deleted", deleted: true, deletedAt: new Date() },
    { new: true }
  ).populate("user", "-password");
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller profile soft-deleted for sellerId=${sellerId}`);
  return seller;
};
