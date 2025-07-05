// /backend/routes/reviewRoutes.js

import express from "express";
import {
  getReviewsController,
  getReviewByIdController,
  createReviewController,
  updateReviewController,
  softDeleteReviewController,
} from "../controllers/reviewController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createReviewValidation,
  updateReviewValidation,
} from "../validations/reviewValidation.js";

const router = express.Router();

/**
 * @route   GET /api/reviews
 * @desc    Get all reviews, optionally filter by product/user/rating
 * @access  Public
 */
router.get("/", getReviewsController);

/**
 * @route   GET /api/reviews/:id
 * @desc    Get a review by ID
 * @access  Public
 */
router.get("/:id", getReviewByIdController);

/**
 * @route   POST /api/reviews
 * @desc    Create a review
 * @access  User
 */
router.post(
  "/",
  protect,
  validateResource(createReviewValidation),
  createReviewController
);

/**
 * @route   PUT /api/reviews/:id
 * @desc    Update a review
 * @access  User/Admin
 */
router.put(
  "/:id",
  protect,
  validateResource(updateReviewValidation),
  updateReviewController
);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Soft-delete a review
 * @access  User/Admin
 */
router.delete("/:id", protect, softDeleteReviewController);

export default router;
