import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  getReviews,
  getReviewById,
  createReview,
  updateReview,
  softDeleteReview,
} from "../controllers/reviewController.js";

import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createReviewValidation,
  updateReviewValidation,
} from "../validations/reviewValidation.js";

const router = express.Router();

/**
 * @route   GET /api/reviews
 * @desc    Get all reviews with optional filtering
 * @access  Public
 */
router.get("/", asyncHandler(getReviews));

/**
 * @route   GET /api/reviews/:id
 * @desc    Get a single review by ID
 * @access  Public
 */
router.get("/:id", asyncHandler(getReviewById));

/**
 * @route   POST /api/reviews
 * @desc    Create a new review
 * @access  Private (User)
 */
router.post(
  "/",
  protect,
  validateResource(createReviewValidation),
  asyncHandler(createReview)
);

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update a review
 * @access  Private (User who wrote it or Admin)
 */
router.put(
  "/:id",
  protect,
  validateResource(updateReviewValidation),
  asyncHandler(updateReview)
);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Soft-delete a review
 * @access  Private (User who wrote it or Admin)
 */
router.delete("/:id", protect, asyncHandler(softDeleteReview));

export default router;
