// src/features/coupon/couponAPI.js
import axiosInstance from "../../utils/axiosInstance";

export const createCoupon = async (data) => {
  const res = await axiosInstance.post("/coupons", data);
  return res.data;
};

export const getAllCoupons = async () => {
  const res = await axiosInstance.get("/coupons");
  return res.data;
};

export const getCouponById = async (id) => {
  const res = await axiosInstance.get(`/coupons/${id}`);
  return res.data;
};

export const updateCoupon = async ({ id, data }) => {
  const res = await axiosInstance.put(`/coupons/${id}`, data);
  return res.data;
};

export const deleteCoupon = async (id) => {
  const res = await axiosInstance.delete(`/coupons/${id}`);
  return res.data;
};
