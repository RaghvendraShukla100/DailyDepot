// /backend/services/productServices.js

import Product from "../models/productSchema.js";
import ApiError from "../utils/ApiError.js";
import fs from "fs";
import { ROLES } from "../constants/roles.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * Create a new product with images and videos handling
 * @param {Object} body - Request body data from client
 * @param {Array} files - Uploaded files (images/videos)
 * @param {Object} user - Authenticated user object
 * @returns {Promise<Object>} - The newly created product document
 */
export const createProductService = async (body, files, user) => {
  const images = files?.images?.map(file => ({
    url: file.path,
    alt: file.originalname || "",
  })) || [];

  const videos = files?.videos?.map(file => ({
    url: file.path,
    alt: file.originalname || "",
  })) || [];

  const product = await Product.create({
    ...body,
    images,
    videos,
    createdBy: user._id,
  });

  logger.info(`Product created by userId=${user._id}`);
  return product;
};


/**
 * Retrieve products with optional pagination, filtering, and sorting
 * @param {Object} query - Query parameters from the client
 * @returns {Promise<Object>} - Paginated and filtered product data
 */
export const getProductsService = async (query) => {
  const page = parseInt(query.page, 10) || 1;
  const limit = parseInt(query.limit, 10) || 10;
  const sort = query.sort || "-createdAt";
  const keyword = query.keyword || "";

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
  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

/**
 * Retrieve a single product by its ID
 * @param {String} id - The product's MongoDB ObjectId
 * @returns {Promise<Object>} - The fetched product document
 */
export const getProductByIdService = async (id) => {
  const product = await Product.findById(id).populate("createdBy", "name email");

  if (!product || product.deleted) {
    throw ApiError.notFound(MESSAGES.PRODUCT.NOT_FOUND);
  }

  logger.info(`Product fetched productId=${id}`);
  return product;
};

/**
 * Update an existing product and handle new uploads if provided
 * @param {String} id - Product ID to update
 * @param {Object} body - Updated product fields
 * @param {Array} files - New uploaded files (images/videos)
 * @param {Object} user - Authenticated user object
 * @returns {Promise<Object>} - The updated product document
 */

export const updateProductService = async (id, body, files, user) => {
  const product = await Product.findById(id);
  if (!product || product.deleted) throw ApiError.notFound(MESSAGES.PRODUCT.NOT_FOUND);

  if (user.role === ROLES.SELLER && product.createdBy.toString() !== user._id.toString()) {
    throw ApiError.forbidden(MESSAGES.AUTH.UNAUTHORIZED);
  }

  if (files?.images?.length || files?.videos?.length) {
    product.images.forEach(img => fs.unlink(img.url, err => { if (err) logger.error("Error deleting old image:", err); }));
    product.videos.forEach(vid => fs.unlink(vid.url, err => { if (err) logger.error("Error deleting old video:", err); }));

    product.images = files?.images?.map(file => ({ url: file.path, alt: file.originalname || "" })) || [];
    product.videos = files?.videos?.map(file => ({ url: file.path, alt: file.originalname || "" })) || [];
  }

  Object.assign(product, body);
  await product.save();
  logger.info(`Product updated productId=${id}`);
  return product;
};


/**
 * Soft delete a product by marking it as deleted
 * @param {String} id - Product ID to delete
 * @param {Object} user - Authenticated user object
 * @returns {Promise<void>}
 */
export const deleteProductService = async (id, user) => {
  const product = await Product.findById(id);

  if (!product || product.deleted) {
    throw ApiError.notFound(MESSAGES.PRODUCT.NOT_FOUND);
  }

  // Ensure only the owner (seller) or admin can delete
  if (user.role === ROLES.SELLER && product.createdBy.toString() !== user._id.toString()) {
    throw ApiError.forbidden(MESSAGES.AUTH.UNAUTHORIZED);
  }

  product.deleted = true;
  product.deletedAt = new Date();
  await product.save();

  logger.info(`Product soft-deleted productId=${id}`);
};
