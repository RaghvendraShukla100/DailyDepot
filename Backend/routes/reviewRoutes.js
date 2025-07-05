// /backend/routes/reviewRoutes.js

import express from "express";
import {
  getAllReviewsController,
  getReviewByIdController,
  createReviewController,
  updateReviewController,
  deleteReviewController,
} from "../controllers/reviewController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createReviewSchema,
  updateReviewSchema,
} from "../validations/reviewValidation.js";

const router = express.Router();

/**
 * @route   GET /api/reviews
 * @desc    Get all reviews, optionally filter by product/user
 * @access  Public/Admin
 */
router.get("/", getAllReviewsController);

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
  validateResource(createReviewSchema),
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
  validateResource(updateReviewSchema),
  updateReviewController
);

/**
 * @route   DELETE /api/reviews/:id
 * @desc    Soft-delete a review
 * @access  User/Admin
 */
router.delete("/:id", protect, deleteReviewController);

export default router;
