// /backend/controllers/productController.js

import Product from "../models/productSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import logger from "../utils/logger.js";
import fs from "fs";
import { ROLES } from "../constants/roles.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Seller/Admin)
 */
export const createProduct = async (req, res) => {
  const images =
    req.files
      ?.filter((file) => file.mimetype.startsWith("image"))
      .map((file) => ({
        url: file.path,
        alt: file.originalname || "",
      })) || [];

  const videos =
    req.files
      ?.filter((file) => file.mimetype.startsWith("video"))
      .map((file) => ({
        url: file.path,
        alt: file.originalname || "",
      })) || [];

  const product = await Product.create({
    ...req.body,
    images,
    videos,
    createdBy: req.user._id,
  });

  logger.info(`Product created by userId=${req.user._id}`);

  res
    .status(201)
    .json(new ApiResponse(201, product, MESSAGES.PRODUCT.CREATED_SUCCESS));
};

/**
 * @desc    Get all products with filtering, pagination, sorting
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const sort = req.query.sort || "-createdAt";
  const keyword = req.query.keyword || "";

  const filter = {
    deleted: false,
    name: { $regex: keyword, $options: "i" },
  };

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(limit)
    .populate("createdBy", "name email");

  logger.info(`Fetched products page=${page} limit=${limit}`);

  res.status(200).json(
    new ApiResponse(
      200,
      {
        products,
        total,
        page,
        totalPages: Math.ceil(total / limit),
      },
      MESSAGES.PRODUCT.ALL_FETCHED
    )
  );
};

/**
 * @desc    Get a product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "createdBy",
    "name email"
  );

  if (!product || product.deleted) {
    throw ApiError.notFound(MESSAGES.PRODUCT.NOT_FOUND);
  }

  logger.info(`Product fetched productId=${req.params.id}`);

  res.status(200).json(new ApiResponse(200, product, MESSAGES.PRODUCT.FETCHED));
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private (Seller/Admin)
 */
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || product.deleted) {
    throw ApiError.notFound(MESSAGES.PRODUCT.NOT_FOUND);
  }

  // Only owner (seller) or admin can update
  if (
    req.user.role === ROLES.SELLER &&
    product.createdBy.toString() !== req.user._id.toString()
  ) {
    throw ApiError.forbidden(MESSAGES.AUTH.UNAUTHORIZED);
  }

  // Handle new uploads by removing old files
  if (req.files?.length) {
    product.images.forEach((img) => {
      fs.unlink(img.url, (err) => {
        if (err) logger.error("Error deleting old image:", err);
      });
    });
    product.videos.forEach((vid) => {
      fs.unlink(vid.url, (err) => {
        if (err) logger.error("Error deleting old video:", err);
      });
    });

    product.images = req.files
      .filter((file) => file.mimetype.startsWith("image"))
      .map((file) => ({
        url: file.path,
        alt: file.originalname || "",
      }));

    product.videos = req.files
      .filter((file) => file.mimetype.startsWith("video"))
      .map((file) => ({
        url: file.path,
        alt: file.originalname || "",
      }));
  }

  Object.assign(product, req.body);
  await product.save();

  logger.info(`Product updated productId=${req.params.id}`);

  res
    .status(200)
    .json(new ApiResponse(200, product, MESSAGES.PRODUCT.UPDATED_SUCCESS));
};

/**
 * @desc    Soft delete a product
 * @route   DELETE /api/products/:id
 * @access  Private (Seller/Admin)
 */
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || product.deleted) {
    throw ApiError.notFound(MESSAGES.PRODUCT.NOT_FOUND);
  }

  // Only owner (seller) or admin can delete
  if (
    req.user.role === ROLES.SELLER &&
    product.createdBy.toString() !== req.user._id.toString()
  ) {
    throw ApiError.forbidden(MESSAGES.AUTH.UNAUTHORIZED);
  }

  product.deleted = true;
  product.deletedAt = new Date();
  await product.save();

  logger.info(`Product soft-deleted productId=${req.params.id}`);

  res
    .status(200)
    .json(new ApiResponse(200, null, MESSAGES.PRODUCT.DELETED_SUCCESS));
};
