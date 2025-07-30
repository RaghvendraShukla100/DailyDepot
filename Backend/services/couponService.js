import Coupon from "../models/couponSchema.js";

export const createCoupon = async (data, user) => {
  console.log("DATA AT THE SERVICE LAYER : ", data);
  console.log("USER AT THE SERVICE LAYER : ", user);

  const existing = await Coupon.findOne({ code: data.code });
  if (existing) {
    throw new Error("Coupon with this code already exists.");
  }

  // Add createdBy field from user
  const couponData = {
    ...data,
    createdBy: user.id,
  };

  return await Coupon.create(couponData);
};

export const getAllCoupons = async () => {
  return await Coupon.find({ deleted: false });
};

export const getCouponById = async (id) => {
  return await Coupon.findOne({ _id: id, deleted: false });
};

export const updateCouponById = async (id, data, user) => {
  // Attach updatedBy field to the data
  data.updatedBy = user._id;

  return await Coupon.findOneAndUpdate({ _id: id, deleted: false }, data, {
    new: true,
  });
};

export const softDeleteCoupon = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon || coupon.deleted) return null;

  coupon.deleted = true;
  await coupon.save();
  return true;
};
