import Seller from "../models/sellerSchema.js";

export const getSellerProfile = async (sellerId) => {
  const seller = await Seller.findById(sellerId).select("-password");
  if (!seller) throw new Error("Seller not found");
  return seller;
};

export const updateSellerProfile = async (sellerId, updateData) => {
  const seller = await Seller.findByIdAndUpdate(sellerId, updateData, {
    new: true,
    runValidators: true,
  }).select("-password");
  if (!seller) throw new Error("Seller not found");
  return seller;
};
