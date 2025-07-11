// /backend/controllers/wishlistController.js

import Wishlist from "../models/wishlistSchema.js";
import Product from "../models/productSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// @desc    Create a new wishlist
// @route   POST /api/wishlists
// @access  Private
export const createWishlist = async (req, res) => {
  const { name, isPublic, products } = req.body;

  const wishlist = await Wishlist.create({
    user: req.user._id,
    name: name || "My Wishlist",
    isPublic: isPublic || false,
    products: products || [],
  });

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        wishlist,
        "Wishlist created successfully."
      )
    );
};

// @desc    Get all wishlists for the authenticated user
// @route   GET /api/wishlists
// @access  Private
export const getUserWishlist = async (req, res) => {
  const wishlists = await Wishlist.find({
    user: req.user._id,
    deleted: false,
  }).populate("products.product");

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      wishlists,
      "Wishlists retrieved successfully.",
      {
        count: wishlists.length,
      }
    )
  );
};

// @desc    Get a single wishlist by ID
// @route   GET /api/wishlists/:id
// @access  Private
export const getWishlistById = async (req, res) => {
  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  }).populate("products.product");

  if (!wishlist) {
    throw ApiError.notFound("Wishlist");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        wishlist,
        "Wishlist retrieved successfully."
      )
    );
};

// @desc    Add a product to a wishlist
// @route   POST /api/wishlists/:id/add
// @access  Private
export const addProductToWishlist = async (req, res) => {
  const { productId, selectedSize, selectedColor, notes } = req.body;

  const product = await Product.findById(productId);
  if (!product || product.deleted) {
    throw ApiError.notFound("Product");
  }

  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    throw ApiError.notFound("Wishlist");
  }

  const alreadyExists = wishlist.products.some((p) =>
    p.product.equals(productId)
  );
  if (alreadyExists) {
    throw ApiError.badRequest("Product already in wishlist.");
  }

  wishlist.products.push({
    product: productId,
    selectedSize,
    selectedColor,
    notes,
  });

  await wishlist.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, wishlist, "Product added to wishlist.")
    );
};

// @desc    Remove a product from a wishlist
// @route   POST /api/wishlists/:id/remove
// @access  Private
export const removeProductFromWishlist = async (req, res) => {
  const { productId } = req.body;

  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    throw ApiError.notFound("Wishlist");
  }

  const initialLength = wishlist.products.length;
  wishlist.products = wishlist.products.filter(
    (p) => !p.product.equals(productId)
  );

  if (wishlist.products.length === initialLength) {
    throw ApiError.notFound("Product not found in wishlist.");
  }

  await wishlist.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        wishlist,
        "Product removed from wishlist."
      )
    );
};

// @desc    Update wishlist (name, isPublic)
// @route   PUT /api/wishlists/:id
// @access  Private
export const updateWishlist = async (req, res) => {
  const { name, isPublic } = req.body;

  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    throw ApiError.notFound("Wishlist");
  }

  if (name !== undefined) wishlist.name = name;
  if (isPublic !== undefined) wishlist.isPublic = isPublic;

  await wishlist.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        wishlist,
        "Wishlist updated successfully."
      )
    );
};

// @desc    Soft delete a wishlist
// @route   DELETE /api/wishlists/:id
// @access  Private
export const deleteWishlist = async (req, res) => {
  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    throw ApiError.notFound("Wishlist");
  }

  wishlist.deleted = true;
  wishlist.deletedAt = new Date();
  await wishlist.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Wishlist deleted successfully.")
    );
};
