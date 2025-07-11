// /backend/controllers/paymentController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import Payment from "../models/paymentSchema.js";
import Order from "../models/orderSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc    Create a new payment record
 * @route   POST /api/payments
 * @access  Private (User)
 */
export const createPayment = asyncHandler(async (req, res) => {
  const {
    order,
    paymentMethod,
    amount,
    transactionId,
    paymentGatewayResponse,
    notes,
  } = req.body;

  if (!order || !paymentMethod || !amount || !transactionId) {
    throw ApiError.badRequest(MESSAGES.MISSING_REQUIRED_FIELDS);
  }

  const existingPayment = await Payment.findOne({ transactionId });
  if (existingPayment) {
    throw ApiError.badRequest(MESSAGES.TRANSACTION_ID_EXISTS);
  }

  const orderRecord = await Order.findById(order);
  if (!orderRecord || orderRecord.deleted) {
    throw ApiError.notFound(MESSAGES.ORDER);
  }

  const payment = await Payment.create({
    user: req.user._id,
    order,
    paymentMethod,
    amount,
    transactionId,
    paymentGatewayResponse,
    notes,
  });

  orderRecord.paymentStatus = "paid";
  await orderRecord.save();

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, payment, MESSAGES.PAYMENT_CREATED)
    );
});

/**
 * @desc    Get all payments
 * @route   GET /api/payments
 * @access  Private (Admin, User can see their payments)
 */
export const getPayments = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const query = { deleted: false };

  if (req.user.role === "user") {
    query.user = req.user._id;
  }

  if (req.query.paymentStatus) {
    query.paymentStatus = req.query.paymentStatus;
  }

  const total = await Payment.countDocuments(query);

  const payments = await Payment.find(query)
    .populate("user order")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, payments, MESSAGES.PAYMENTS_FETCHED, {
      total,
      page,
      pages: Math.ceil(total / limit),
    })
  );
});

/**
 * @desc    Get a payment by ID
 * @route   GET /api/payments/:id
 * @access  Private (Admin, User can see their payment)
 */
export const getPaymentById = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id).populate("user order");

  if (!payment || payment.deleted) {
    throw ApiError.notFound(MESSAGES.PAYMENT);
  }

  if (req.user.role === "user" && !payment.user._id.equals(req.user._id)) {
    throw ApiError.forbidden(MESSAGES.UNAUTHORIZED);
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, payment, MESSAGES.PAYMENT_RETRIEVED)
    );
});

/**
 * @desc    Update payment status or refund details
 * @route   PUT /api/payments/:id
 * @access  Private (Admin)
 */
export const updatePayment = asyncHandler(async (req, res) => {
  const { paymentStatus, refundedAmount, refundStatus, notes } = req.body;

  const payment = await Payment.findById(req.params.id);

  if (!payment || payment.deleted) {
    throw ApiError.notFound(MESSAGES.PAYMENT);
  }

  if (paymentStatus) payment.paymentStatus = paymentStatus;
  if (refundedAmount !== undefined) payment.refundedAmount = refundedAmount;
  if (refundStatus) payment.refundStatus = refundStatus;
  if (notes) payment.notes = notes;

  await payment.save();

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, payment, MESSAGES.PAYMENT_UPDATED));
});

/**
 * @desc    Soft delete a payment
 * @route   DELETE /api/payments/:id
 * @access  Private (Admin)
 */
export const softDeletePayment = asyncHandler(async (req, res) => {
  const payment = await Payment.findById(req.params.id);

  if (!payment || payment.deleted) {
    throw ApiError.notFound(MESSAGES.PAYMENT);
  }

  payment.deleted = true;
  payment.deletedAt = new Date();
  await payment.save();

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, MESSAGES.PAYMENT_DELETED));
});
