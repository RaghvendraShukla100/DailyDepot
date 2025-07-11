// /backend/controllers/reviewController.js

import Review from "../models/reviewSchema.js";
import Product from "../models/productSchema.js";
import Order from "../models/orderSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import { ROLES } from "../constants/roles.js";

/**
 * @desc    Create a new review (only verified buyers)
 * @route   POST /api/reviews
 * @access  Private (User)
 */
export const createReview = async (req, res, next) => {
  try {
    const { product: productId, rating, comment, images, videos } = req.body;

    if (!productId || rating === undefined) {
      throw ApiError.badRequest(
        MESSAGES.REVIEW.PRODUCT_ID_RATING_REQUIRED ||
          "Product ID and rating are required."
      );
    }

    const product = await Product.findById(productId);
    if (!product || product.deleted) {
      throw ApiError.notFound(
        MESSAGES.PRODUCT.NOT_FOUND || "Product not found."
      );
    }

    const order = await Order.findOne({
      user: req.user._id,
      status: "delivered",
      "items.product": productId,
    });

    if (!order) {
      throw ApiError.forbidden(
        MESSAGES.REVIEW.NOT_VERIFIED_PURCHASE ||
          "You can only review products you have purchased and received."
      );
    }

    const existingReview = await Review.findOne({
      user: req.user._id,
      product: productId,
      deleted: false,
    });
    if (existingReview) {
      throw ApiError.badRequest(
        MESSAGES.REVIEW.ALREADY_REVIEWED ||
          "You have already reviewed this product."
      );
    }

    const review = await Review.create({
      user: req.user._id,
      product: productId,
      order: order._id,
      rating,
      comment,
      images,
      videos,
    });

    const reviews = await Review.find({ product: productId, deleted: false });
    const ratingsCount = reviews.length;
    const ratingsAverage = ratingsCount
      ? reviews.reduce((acc, r) => acc + r.rating, 0) / ratingsCount
      : 0;

    product.ratingsAverage = ratingsAverage;
    product.ratingsCount = ratingsCount;
    await product.save();

    res
      .status(STATUS_CODES.CREATED)
      .json(
        new ApiResponse(
          STATUS_CODES.CREATED,
          review,
          MESSAGES.REVIEW.CREATED || "Review created successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all reviews
 * @route   GET /api/reviews
 * @access  Public
 */
export const getReviews = async (req, res, next) => {
  try {
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
      new ApiResponse(
        STATUS_CODES.OK,
        reviews,
        MESSAGES.REVIEW.FETCHED || "Reviews fetched successfully.",
        {
          total,
          page: parseInt(page),
          pages: Math.ceil(total / limit),
        }
      )
    );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get a single review by ID
 * @route   GET /api/reviews/:id
 * @access  Public
 */
export const getReviewById = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id).populate(
      "user product"
    );

    if (!review || review.deleted) {
      throw ApiError.notFound(MESSAGES.REVIEW.NOT_FOUND || "Review not found.");
    }

    res
      .status(STATUS_CODES.OK)
      .json(
        new ApiResponse(
          STATUS_CODES.OK,
          review,
          MESSAGES.REVIEW.FETCHED_SINGLE || "Review fetched successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update a review
 * @route   PUT /api/reviews/:id
 * @access  Private (User who wrote the review)
 */
export const updateReview = async (req, res, next) => {
  try {
    const { rating, comment, images, videos, status } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review || review.deleted) {
      throw ApiError.notFound(MESSAGES.REVIEW.NOT_FOUND || "Review not found.");
    }

    if (!review.user.equals(req.user._id)) {
      throw ApiError.forbidden(
        MESSAGES.REVIEW.UPDATE_FORBIDDEN ||
          "You can only update your own reviews."
      );
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

    const product = await Product.findById(review.product);
    product.ratingsAverage = ratingsAverage;
    product.ratingsCount = ratingsCount;
    await product.save();

    res
      .status(STATUS_CODES.OK)
      .json(
        new ApiResponse(
          STATUS_CODES.OK,
          review,
          MESSAGES.REVIEW.UPDATED || "Review updated successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Soft delete a review
 * @route   DELETE /api/reviews/:id
 * @access  Private (User who wrote it, Admin)
 */
export const softDeleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review || review.deleted) {
      throw ApiError.notFound(MESSAGES.REVIEW.NOT_FOUND || "Review not found.");
    }

    if (req.user.role !== ROLES.ADMIN && !review.user.equals(req.user._id)) {
      throw ApiError.forbidden(
        MESSAGES.REVIEW.DELETE_FORBIDDEN ||
          "You can only delete your own reviews."
      );
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

    const product = await Product.findById(review.product);
    product.ratingsAverage = ratingsAverage;
    product.ratingsCount = ratingsCount;
    await product.save();

    res
      .status(STATUS_CODES.OK)
      .json(
        new ApiResponse(
          STATUS_CODES.OK,
          null,
          MESSAGES.REVIEW.DELETED || "Review deleted successfully."
        )
      );
  } catch (error) {
    next(error);
  }
};
