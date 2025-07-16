// /backend/controllers/productController.js

import ApiResponse from "../utils/ApiResponse.js";
import { MESSAGES } from "../constants/messages.js";
import {
  createProductService,
  getProductsService,
  getProductByIdService,
  updateProductService,
  deleteProductService,
} from "../services/productServices.js";

/**
 * @desc    Create a new product
 * @route   POST /api/products
 * @access  Private (Seller/Admin)
 */
export const createProduct = async (req, res) => {
  // Call the service layer to handle business logic and DB insertion
  const product = await createProductService(req.body, req.files, req.user);

  // Send a structured success response
  res
    .status(201)
    .json(
      new ApiResponse(201, product, MESSAGES.PRODUCT.CREATED_SUCCESS)
    );
};

/**
 * @desc    Get all products with filtering, pagination, and sorting
 * @route   GET /api/products
 * @access  Public
 */
export const getProducts = async (req, res) => {
  // Delegate pagination, sorting, and filtering to the service
  const data = await getProductsService(req.query);

  // Return structured success response
  res
    .status(200)
    .json(
      new ApiResponse(200, data, MESSAGES.PRODUCT.ALL_FETCHED)
    );
};

/**
 * @desc    Get a single product by its ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res) => {
  // Fetch product by ID via service with populated user details
  const product = await getProductByIdService(req.params.id);

  // Return structured success response
  res
    .status(200)
    .json(
      new ApiResponse(200, product, MESSAGES.PRODUCT.FETCHED)
    );
};

/**
 * @desc    Update a product
 * @route   PUT /api/products/:id
 * @access  Private (Seller/Admin)
 */
export const updateProduct = async (req, res) => {
  // Update the product, replacing images/videos if new uploads provided
  const product = await updateProductService(
    req.params.id,
    req.body,
    req.files,
    req.user
  );

  // Return structured success response
  res
    .status(200)
    .json(
      new ApiResponse(200, product, MESSAGES.PRODUCT.UPDATED_SUCCESS)
    );
};

/**
 * @desc    Soft delete a product (mark as deleted, not hard-delete)
 * @route   DELETE /api/products/:id
 * @access  Private (Seller/Admin)
 */
export const deleteProduct = async (req, res) => {
  // Soft delete the product via the service
  await deleteProductService(req.params.id, req.user);

  // Return structured success response
  res
    .status(200)
    .json(
      new ApiResponse(200, null, MESSAGES.PRODUCT.DELETED_SUCCESS)
    );
};
