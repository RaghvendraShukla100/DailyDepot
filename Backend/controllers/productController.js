// Backend/controllers/productController.js

import asyncHandler from "../middlewares/asyncHandler.js";
import Product from "../models/productModel.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/cloudinary.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private (Admin, Seller)
export const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        product,
        "Product created successfully."
      )
    );
});

// @desc    Get all products with filters, pagination, search
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const queryObj = { deleted: false };

  if (req.query.category) {
    queryObj.category = req.query.category;
  }

  if (req.query.brand) {
    queryObj.brand = req.query.brand;
  }

  if (req.query.search) {
    const regex = new RegExp(req.query.search, "i");
    queryObj.$or = [{ name: regex }, { description: regex }, { tags: regex }];
  }

  const total = await Product.countDocuments(queryObj);

  const products = await Product.find(queryObj)
    .populate("category brand reviews")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      products,
      "Products fetched successfully.",
      {
        total,
        page,
        pages: Math.ceil(total / limit),
      }
    )
  );
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate(
    "category brand reviews"
  );

  if (!product || product.deleted) {
    throw ApiError.notFound("Product");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, product, "Product fetched successfully.")
    );
});

// @desc    Update product by ID
// @route   PUT /api/products/:id
// @access  Private (Admin, Seller)
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || product.deleted) {
    throw ApiError.notFound("Product");
  }

  Object.assign(product, req.body);
  await product.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, product, "Product updated successfully.")
    );
});

// @desc    Soft delete product
// @route   DELETE /api/products/:id
// @access  Private (Admin, Seller)
export const softDeleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || product.deleted) {
    throw ApiError.notFound("Product");
  }

  product.deleted = true;
  product.deletedAt = new Date();
  await product.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Product deleted successfully.")
    );
});

// @desc    Upload product images
// @route   POST /api/products/:id/images
// @access  Private (Admin, Seller)
export const uploadProductImages = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || product.deleted) {
    throw ApiError.notFound("Product");
  }

  if (!req.files || req.files.length === 0) {
    throw ApiError.badRequest("No images provided.");
  }

  const uploadedImages = [];

  for (const file of req.files) {
    const uploadResult = await uploadToCloudinary(file.path, "products");
    uploadedImages.push({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id, // For deletion support
      alt: file.originalname || "Product image",
    });
  }

  product.images.push(...uploadedImages);
  await product.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        product.images,
        "Images uploaded successfully."
      )
    );
});

// @desc    Remove product image
// @route   DELETE /api/products/:id/images/:imageId
// @access  Private (Admin, Seller)
export const removeProductImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product || product.deleted) {
    throw ApiError.notFound("Product");
  }

  const imageIndex = product.images.findIndex(
    (img) => img._id.toString() === req.params.imageId
  );

  if (imageIndex === -1) {
    throw ApiError.notFound("Image");
  }

  // Optional: delete from Cloudinary if using
  // const publicId = product.images[imageIndex].public_id;
  // if (publicId) {
  //   await deleteFromCloudinary(publicId);
  // }

  product.images.splice(imageIndex, 1);
  await product.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        product.images,
        "Image removed successfully."
      )
    );
});
