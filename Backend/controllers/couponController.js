import * as couponService from "../services/couponService.js";
import ApiError from "../utils/ApiError.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
  const newCoupon = await couponService.createCoupon(req.body, req.user);
  res.status(STATUS_CODES.CREATED).json({
    message: MESSAGES.COUPON.CREATED,
    data: newCoupon,
  });
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
  const coupons = await couponService.getAllCoupons();
  res.status(STATUS_CODES.OK).json({ data: coupons });
};

// Get a coupon by ID
export const getCouponById = async (req, res) => {
  const { id } = req.params;
  const coupon = await couponService.getCouponById(id);
  if (!coupon) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.COUPON.NOT_FOUND);
  }
  res.status(STATUS_CODES.OK).json({ data: coupon });
};

// Update a coupon by ID
export const updateCouponById = async (req, res) => {
  const { id } = req.params;

  const updatedCoupon = await couponService.updateCouponById(
    id,
    req.body,
    req.user
  );

  if (!updatedCoupon) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.COUPON.NOT_FOUND);
  }

  res.status(STATUS_CODES.OK).json({
    message: MESSAGES.COUPON.UPDATED,
    data: updatedCoupon,
  });
};

// Soft delete a coupon by ID
export const deleteCouponById = async (req, res) => {
  const { id } = req.params;
  const deleted = await couponService.softDeleteCoupon(id);
  if (!deleted) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.COUPON.NOT_FOUND);
  }
  res.status(STATUS_CODES.OK).json({ message: MESSAGES.COUPON.DELETED });
};
