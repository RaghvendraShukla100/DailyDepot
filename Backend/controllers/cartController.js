// Backend/controllers/cartController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import CartItem from "../models/cartItemSchema.js";
import Product from "../models/productSchema.js";
import Coupon from "../models/couponSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Add an item to the cart
// @route   POST /api/cart
// @access  Private
export const addToCart = asyncHandler(async (req, res) => {
  const {
    productId,
    quantity,
    selectedSize,
    selectedColor,
    appliedCoupon,
    notes,
  } = req.body;

  const product = await Product.findById(productId);
  if (!product || product.deleted) {
    throw ApiError.notFound("Product");
  }

  const existingItem = await CartItem.findOne({
    user: req.user._id,
    product: productId,
    selectedSize,
    selectedColor,
    status: "active",
    deleted: false,
  });

  if (existingItem) {
    existingItem.quantity += quantity;
    await existingItem.save();

    return res
      .status(STATUS_CODES.OK)
      .json(
        new ApiResponse(
          STATUS_CODES.OK,
          existingItem,
          "Cart item quantity updated."
        )
      );
  }

  const cartItem = await CartItem.create({
    user: req.user._id,
    product: productId,
    quantity,
    selectedSize,
    selectedColor,
    priceAtAdded: product.price,
    appliedCoupon: appliedCoupon || null,
    notes,
  });

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, cartItem, "Product added to cart.")
    );
});

// @desc    Get all cart items for the authenticated user
// @route   GET /api/cart
// @access  Private
export const getUserCartItems = asyncHandler(async (req, res) => {
  const cartItems = await CartItem.find({
    user: req.user._id,
    deleted: false,
    status: "active",
  }).populate("product appliedCoupon");

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, cartItems));
});

// @desc    Update a cart item's quantity or options
// @route   PUT /api/cart/:id
// @access  Private
export const updateCartItem = asyncHandler(async (req, res) => {
  const { quantity, selectedSize, selectedColor, notes, appliedCoupon } =
    req.body;

  const cartItem = await CartItem.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
    status: "active",
  });

  if (!cartItem) {
    throw ApiError.notFound("Cart item");
  }

  if (quantity !== undefined) cartItem.quantity = quantity;
  if (selectedSize !== undefined) cartItem.selectedSize = selectedSize;
  if (selectedColor !== undefined) cartItem.selectedColor = selectedColor;
  if (notes !== undefined) cartItem.notes = notes;

  if (appliedCoupon) {
    const coupon = await Coupon.findById(appliedCoupon);
    if (!coupon || coupon.status !== "active" || coupon.deleted) {
      throw ApiError.badRequest("Invalid coupon.");
    }
    cartItem.appliedCoupon = appliedCoupon;
  }

  await cartItem.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        cartItem,
        "Cart item updated successfully."
      )
    );
});

// @desc    Remove a cart item (soft delete)
// @route   DELETE /api/cart/:id
// @access  Private
export const removeCartItem = asyncHandler(async (req, res) => {
  const cartItem = await CartItem.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
    status: "active",
  });

  if (!cartItem) {
    throw ApiError.notFound("Cart item");
  }

  cartItem.deleted = true;
  cartItem.deletedAt = new Date();
  cartItem.status = "removed";
  await cartItem.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Cart item removed successfully.")
    );
});

// @desc    Clear entire cart
// @route   DELETE /api/cart
// @access  Private
export const clearCart = asyncHandler(async (req, res) => {
  await CartItem.updateMany(
    { user: req.user._id, deleted: false, status: "active" },
    { $set: { deleted: true, deletedAt: new Date(), status: "removed" } }
  );

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, "Cart cleared successfully."));
});
export const toggleSaveForLater = asyncHandler(async (req, res) => {
  const cartItem = await CartItem.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
    status: "active",
  });

  if (!cartItem) {
    throw ApiError.notFound("Cart item");
  }

  cartItem.savedForLater = !cartItem.savedForLater;
  await cartItem.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        cartItem,
        `Cart item ${
          cartItem.savedForLater ? "saved for later" : "moved back to cart"
        } successfully.`
      )
    );
});
