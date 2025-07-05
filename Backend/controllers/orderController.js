// Backend/controllers/orderController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import Order from "../models/orderModel.js";
import Product from "../models/productModel.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { sendOrderConfirmationEmail } from "../services/mailService.js"; // optional

// @desc    Create a new order
// @route   POST /api/orders
// @access  Private (User)
export const createOrder = asyncHandler(async (req, res) => {
  const {
    items,
    shippingAddress,
    paymentMethod,
    totalAmount,
    appliedCoupon,
    notes,
  } = req.body;

  if (!items || items.length === 0) {
    throw ApiError.badRequest("No order items provided.");
  }

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || product.deleted) {
      throw ApiError.notFound(`Product (${item.product})`);
    }
    if (product.stock < item.quantity) {
      throw ApiError.badRequest(
        `Insufficient stock for product: ${product.name}`
      );
    }
  }

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    totalAmount,
    appliedCoupon,
    notes,
  });

  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity, sold: item.quantity },
    });
  }

  // Optionally send email
  // await sendOrderConfirmationEmail(req.user.email, order);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, order, "Order placed successfully.")
    );
});

// @desc    Get all orders (admin/seller/user)
// @route   GET /api/orders
// @access  Private
export const getOrders = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const queryObj = { deleted: false };

  if (req.user.role === "user") {
    queryObj.user = req.user._id;
  }

  if (req.query.status) {
    queryObj.orderStatus = req.query.status;
  }

  const total = await Order.countDocuments(queryObj);

  const orders = await Order.find(queryObj)
    .populate("user items.product shippingAddress appliedCoupon items.seller")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, orders, "Orders retrieved successfully.", {
      total,
      page,
      pages: Math.ceil(total / limit),
    })
  );
});

// @desc    Get a single order by ID
// @route   GET /api/orders/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user items.product shippingAddress appliedCoupon items.seller"
  );

  if (!order || order.deleted) {
    throw ApiError.notFound("Order");
  }

  if (req.user.role === "user" && !order.user._id.equals(req.user._id)) {
    throw ApiError.forbidden("Unauthorized to access this order.");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, order, "Order retrieved successfully.")
    );
});

// @desc    Update order status (Admin / Seller)
// @route   PUT /api/orders/:id/status
// @access  Private (Admin, Seller)
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const { orderStatus, deliveryDate, notes } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order || order.deleted) {
    throw ApiError.notFound("Order");
  }

  order.orderStatus = orderStatus || order.orderStatus;
  order.deliveryDate = deliveryDate || order.deliveryDate;
  order.notes = notes || order.notes;

  await order.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        order,
        "Order status updated successfully."
      )
    );
});

// @desc    Update payment status
// @route   PUT /api/orders/:id/payment-status
// @access  Private (Admin)
export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const { paymentStatus } = req.body;

  const order = await Order.findById(req.params.id);
  if (!order || order.deleted) {
    throw ApiError.notFound("Order");
  }

  order.paymentStatus = paymentStatus || order.paymentStatus;

  await order.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        order,
        "Payment status updated successfully."
      )
    );
});

// @desc    Soft delete order
// @route   DELETE /api/orders/:id
// @access  Private (Admin, User)
export const softDeleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order || order.deleted) {
    throw ApiError.notFound("Order");
  }

  if (req.user.role === "user" && !order.user._id.equals(req.user._id)) {
    throw ApiError.forbidden("Unauthorized to delete this order.");
  }

  order.deleted = true;
  order.deletedAt = new Date();
  await order.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Order deleted successfully.")
    );
});
