import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";

export const getAllUsers = async () => {
  return await User.find().select("-password");
};

export const getAllSellers = async () => {
  return await Seller.find().select("-password");
};

export const deleteUserById = async (userId) => {
  return await User.findByIdAndDelete(userId);
};

export const deleteSellerById = async (sellerId) => {
  return await Seller.findByIdAndDelete(sellerId);
};
