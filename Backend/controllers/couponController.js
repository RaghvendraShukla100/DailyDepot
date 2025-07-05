// Backend/controllers/couponController.js

import Coupon from "../models/couponSchema.js";
import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// @desc    Create a new coupon
// @route   POST /api/coupons
// @access  Admin
export const createCouponController = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        coupon,
        "Coupon created successfully."
      )
    );
});

// @desc    Get all coupons
// @route   GET /api/coupons
// @access  Public
export const getAllCouponsController = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find({ deleted: false });
  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, coupons));
});

// @desc    Get a single coupon by ID
// @route   GET /api/coupons/:id
// @access  Public
export const getCouponByIdController = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id).where({ deleted: false });

  if (!coupon) {
    throw ApiError.notFound("Coupon");
  }

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, coupon));
});

// @desc    Update a coupon by ID
// @route   PUT /api/coupons/:id
// @access  Admin
export const updateCouponByIdController = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id).where({ deleted: false });

  if (!coupon) {
    throw ApiError.notFound("Coupon");
  }

  Object.keys(req.body).forEach((field) => {
    coupon[field] = req.body[field];
  });

  const updatedCoupon = await coupon.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        updatedCoupon,
        "Coupon updated successfully."
      )
    );
});

// @desc    Soft delete a coupon by ID
// @route   DELETE /api/coupons/:id
// @access  Admin
export const deleteCouponByIdController = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findById(req.params.id).where({ deleted: false });

  if (!coupon) {
    throw ApiError.notFound("Coupon");
  }

  coupon.deleted = true;
  coupon.deletedAt = new Date();
  await coupon.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Coupon deleted successfully.")
    );
});
