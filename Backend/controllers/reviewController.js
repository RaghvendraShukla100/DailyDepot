// Backend/controllers/reviewController.js

import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";
import Review from "../models/reviewSchema.js";
import Product from "../models/productSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private (User)
export const createReviewController = asyncHandler(async (req, res) => {
  const { product, rating, comment, images, videos } = req.body;

  if (!product || !rating) {
    throw ApiError.badRequest("Product and rating are required.");
  }

  const productRecord = await Product.findById(product);
  if (!productRecord || productRecord.deleted) {
    throw ApiError.notFound("Product");
  }

  const existingReview = await Review.findOne({
    user: req.user._id,
    product,
    deleted: false,
  });
  if (existingReview) {
    throw ApiError.badRequest("You have already reviewed this product.");
  }

  const review = await Review.create({
    user: req.user._id,
    product,
    rating,
    comment,
    images,
    videos,
  });

  const reviews = await Review.find({ product, deleted: false });
  const ratingsCount = reviews.length;
  const ratingsAverage =
    reviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount;

  productRecord.ratingsAverage = ratingsAverage;
  productRecord.ratingsCount = ratingsCount;
  await productRecord.save();

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        review,
        "Review created successfully."
      )
    );
});

// @desc    Get all reviews
// @route   GET /api/reviews
// @access  Public
export const getReviewsController = asyncHandler(async (req, res) => {
  const { product, user, rating, page = 1, limit = 10 } = req.query;

  const filter = { deleted: false };
  if (product) filter.product = product;
  if (user) filter.user = user;
  if (rating) filter.rating = rating;

  const skip = (page - 1) * limit;
  const total = await Review.countDocuments(filter);

  const reviews = await Review.find(filter)
    .populate("user product")
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(parseInt(limit));

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(STATUS_CODES.OK, reviews, "Reviews fetched successfully.", {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    })
  );
});

// @desc    Get a single review
// @route   GET /api/reviews/:id
// @access  Public
export const getReviewByIdController = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id).populate("user product");

  if (!review || review.deleted) {
    throw ApiError.notFound("Review");
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, review, "Review fetched successfully.")
    );
});

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private (User who wrote the review)
export const updateReviewController = asyncHandler(async (req, res) => {
  const { rating, comment, images, videos, status } = req.body;

  const review = await Review.findById(req.params.id);

  if (!review || review.deleted) {
    throw ApiError.notFound("Review");
  }

  if (!review.user.equals(req.user._id)) {
    throw ApiError.forbidden("You can only update your own reviews.");
  }

  if (rating !== undefined) review.rating = rating;
  if (comment !== undefined) review.comment = comment;
  if (images !== undefined) review.images = images;
  if (videos !== undefined) review.videos = videos;
  if (status !== undefined) review.status = status;

  await review.save();

  const reviews = await Review.find({
    product: review.product,
    deleted: false,
  });
  const ratingsCount = reviews.length;
  const ratingsAverage = ratingsCount
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount
    : 0;

  const productRecord = await Product.findById(review.product);
  productRecord.ratingsAverage = ratingsAverage;
  productRecord.ratingsCount = ratingsCount;
  await productRecord.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, review, "Review updated successfully.")
    );
});

// @desc    Delete a review (soft delete)
// @route   DELETE /api/reviews/:id
// @access  Private (User who wrote it, Admin)
export const softDeleteReviewController = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review || review.deleted) {
    throw ApiError.notFound("Review");
  }

  if (req.user.role !== "admin" && !review.user.equals(req.user._id)) {
    throw ApiError.forbidden("You can only delete your own reviews.");
  }

  review.deleted = true;
  review.deletedAt = new Date();
  await review.save();

  const reviews = await Review.find({
    product: review.product,
    deleted: false,
  });
  const ratingsCount = reviews.length;
  const ratingsAverage = ratingsCount
    ? reviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount
    : 0;

  const productRecord = await Product.findById(review.product);
  productRecord.ratingsAverage = ratingsAverage;
  productRecord.ratingsCount = ratingsCount;
  await productRecord.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Review deleted successfully.")
    );
});
