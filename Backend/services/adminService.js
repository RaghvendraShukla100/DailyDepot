import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * Fetches all users excluding passwords.
 * @returns {Promise<Array>} List of users
 */
export const getAllUsers = async () => {
  const users = await User.find().select("-password");
  logger.info(`All users fetched`, { count: users.length });
  return users;
};

/**
 * Fetches all sellers excluding passwords.
 * @returns {Promise<Array>} List of sellers
 */
export const getAllSellers = async () => {
  const sellers = await Seller.find().select("-password");
  logger.info(`All sellers fetched`, { count: sellers.length });
  return sellers;
};

/**
 * Deletes a user by their ID.
 * @param {string} userId - ID of the user to delete
 * @returns {Promise<Object>} Deleted user document
 * @throws {ApiError} If user not found
 */
export const deleteUserById = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  logger.info(`User deleted`, { userId });
  return user;
};

/**
 * Deletes a seller by their ID.
 * @param {string} sellerId - ID of the seller to delete
 * @returns {Promise<Object>} Deleted seller document
 * @throws {ApiError} If seller not found
 */
export const deleteSellerById = async (sellerId) => {
  const seller = await Seller.findByIdAndDelete(sellerId);
  if (!seller) throw ApiError.notFound(MESSAGES.SELLER.NOT_FOUND);
  logger.info(`Seller deleted`, { sellerId });
  return seller;
};
