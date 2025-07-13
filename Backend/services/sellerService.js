import Seller from "../models/sellerSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * Fetch a seller's profile by ID, excluding sensitive fields.
 * Throws ApiError if seller not found.
 * @param {String} sellerId - The ID of the seller.
 * @returns {Promise<Object>} The seller document.
 */
export const getSellerProfile = async (sellerId) => {
  const seller = await Seller.findById(sellerId).select("-password");
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller profile fetched`, { sellerId });
  return seller;
};

/**
 * Update a seller's profile by ID with provided update data.
 * Uses runValidators to ensure validation.
 * Throws ApiError if seller not found.
 * @param {String} sellerId - The ID of the seller.
 * @param {Object} updateData - Fields to update.
 * @returns {Promise<Object>} The updated seller document.
 */
export const updateSellerProfile = async (sellerId, updateData) => {
  const seller = await Seller.findByIdAndUpdate(sellerId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller profile updated`, { sellerId });
  return seller;
};
