// Backend/controllers/wishlistController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import Wishlist from "../models/wishlistModel.js";
import Product from "../models/productModel.js";

// @desc    Create a new wishlist
// @route   POST /api/wishlists
// @access  Private
export const createWishlist = asyncHandler(async (req, res) => {
  const { name, isPublic, products } = req.body;

  const wishlist = await Wishlist.create({
    user: req.user._id,
    name: name || "My Wishlist",
    isPublic: isPublic || false,
    products: products || [],
  });

  res.status(201).json({
    success: true,
    message: "Wishlist created successfully.",
    data: wishlist,
  });
});

// @desc    Get all wishlists for the authenticated user
// @route   GET /api/wishlists
// @access  Private
export const getUserWishlists = asyncHandler(async (req, res) => {
  const wishlists = await Wishlist.find({
    user: req.user._id,
    deleted: false,
  }).populate("products.product");

  res.status(200).json({
    success: true,
    count: wishlists.length,
    data: wishlists,
  });
});

// @desc    Get a single wishlist by ID
// @route   GET /api/wishlists/:id
// @access  Private
export const getWishlistById = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  }).populate("products.product");

  if (!wishlist) {
    res.status(404);
    throw new Error("Wishlist not found.");
  }

  res.status(200).json({
    success: true,
    data: wishlist,
  });
});

// @desc    Add a product to a wishlist
// @route   POST /api/wishlists/:id/products
// @access  Private
export const addProductToWishlist = asyncHandler(async (req, res) => {
  const { productId, selectedSize, selectedColor, notes } = req.body;

  const product = await Product.findById(productId);
  if (!product || product.deleted) {
    res.status(404);
    throw new Error("Product not found.");
  }

  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    res.status(404);
    throw new Error("Wishlist not found.");
  }

  const alreadyExists = wishlist.products.some((p) =>
    p.product.equals(productId)
  );
  if (alreadyExists) {
    res.status(400);
    throw new Error("Product already in wishlist.");
  }

  wishlist.products.push({
    product: productId,
    selectedSize,
    selectedColor,
    notes,
  });

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product added to wishlist.",
    data: wishlist,
  });
});

// @desc    Remove a product from a wishlist
// @route   DELETE /api/wishlists/:wishlistId/products/:productId
// @access  Private
export const removeProductFromWishlist = asyncHandler(async (req, res) => {
  const { wishlistId, productId } = req.params;

  const wishlist = await Wishlist.findOne({
    _id: wishlistId,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    res.status(404);
    throw new Error("Wishlist not found.");
  }

  const initialLength = wishlist.products.length;
  wishlist.products = wishlist.products.filter(
    (p) => !p.product.equals(productId)
  );

  if (wishlist.products.length === initialLength) {
    res.status(404);
    throw new Error("Product not found in wishlist.");
  }

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Product removed from wishlist.",
    data: wishlist,
  });
});

// @desc    Update wishlist (name, isPublic, etc.)
// @route   PUT /api/wishlists/:id
// @access  Private
export const updateWishlist = asyncHandler(async (req, res) => {
  const { name, isPublic } = req.body;

  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    res.status(404);
    throw new Error("Wishlist not found.");
  }

  if (name !== undefined) wishlist.name = name;
  if (isPublic !== undefined) wishlist.isPublic = isPublic;

  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Wishlist updated successfully.",
    data: wishlist,
  });
});

// @desc    Soft delete a wishlist
// @route   DELETE /api/wishlists/:id
// @access  Private
export const softDeleteWishlist = asyncHandler(async (req, res) => {
  const wishlist = await Wishlist.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!wishlist) {
    res.status(404);
    throw new Error("Wishlist not found.");
  }

  wishlist.deleted = true;
  wishlist.deletedAt = new Date();
  await wishlist.save();

  res.status(200).json({
    success: true,
    message: "Wishlist deleted successfully.",
  });
});
