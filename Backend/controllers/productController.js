// /backend/controllers/productController.js

import Product from "../models/productSchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import ApiError from "../utils/ApiError.js";
import fs from "fs";
import path from "path";
import {
  createProductValidation,
  updateProductValidation,
} from "../validations/productValidation.js";
import { ROLES } from "../constants/roles.js";

/**
 * @desc Create a new product
 * @route POST /api/products
 * @access Private (seller/admin)
 */
export const createProduct = asyncHandler(async (req, res) => {
  // Validate using zod
  const validatedData = createProductValidation.parse(req.body);

  // Construct media array from uploaded files
  const media =
    req.files?.map((file) => ({
      url: file.path, // Local path
      type: file.mimetype.startsWith("video") ? "video" : "image",
    })) || [];

  const product = await Product.create({
    ...validatedData,
    media,
    createdBy: req.user._id,
  });

  res.status(STATUS_CODES.CREATED).json({
    message: "Product created successfully.",
    product,
  });
});

/**
 * @desc Get all products with filtering, pagination, sorting
 * @route GET /api/products
 * @access Public
 */
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "-createdAt";
  const keyword = req.query.keyword || "";

  const query = {
    deleted: false,
    name: { $regex: keyword, $options: "i" },
  };

  const total = await Product.countDocuments(query);
  const products = await Product.find(query)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("createdBy", "name email");

  res.status(STATUS_CODES.OK).json({
    total,
    page,
    pages: Math.ceil(total / limit),
    products,
  });
});

/**
 * @desc Get single product by ID
 * @route GET /api/products/:id
 * @access Public
 */
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "createdBy",
    "name email"
  );

  if (!product || product.deleted) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.GENERAL.NOT_FOUND);
  }

  res.status(STATUS_CODES.OK).json(product);
});

/**
 * @desc Update a product
 * @route PUT /api/products/:id
 * @access Private (seller/admin)
 */
export const updateProduct = asyncHandler(async (req, res) => {
  const validatedData = updateProductValidation.parse(req.body);

  const product = await Product.findById(req.params.id);
  if (!product || product.deleted) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.GENERAL.NOT_FOUND);
  }

  // Authorization: only owner (seller) or admin can update
  if (
    req.user.role === ROLES.SELLER &&
    product.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.AUTH.UNAUTHORIZED);
  }

  // Handle media replacement if new files are uploaded
  if (req.files?.length) {
    // Remove old local files
    for (const file of product.media) {
      fs.unlink(file.url, (err) => {
        if (err) console.error("Error deleting file:", err);
      });
    }
    product.media = req.files.map((file) => ({
      url: file.path,
      type: file.mimetype.startsWith("video") ? "video" : "image",
    }));
  }

  // Update fields
  Object.assign(product, validatedData);
  await product.save();

  res.status(STATUS_CODES.OK).json({
    message: "Product updated successfully.",
    product,
  });
});

/**
 * @desc Delete (soft delete) a product
 * @route DELETE /api/products/:id
 * @access Private (seller/admin)
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product || product.deleted) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.GENERAL.NOT_FOUND);
  }

  // Authorization: only owner (seller) or admin can delete
  if (
    req.user.role === ROLES.SELLER &&
    product.createdBy.toString() !== req.user._id.toString()
  ) {
    throw new ApiError(STATUS_CODES.FORBIDDEN, MESSAGES.AUTH.UNAUTHORIZED);
  }

  product.deleted = true;
  product.deletedAt = new Date();
  await product.save();

  res.status(STATUS_CODES.OK).json({
    message: "Product deleted successfully.",
  });
});
