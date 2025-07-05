// /backend/routes/userRoutes.js

import express from "express";
import {
  getUserProfileController,
  updateUserProfileController,
  deleteUserProfileController,
  getAllUsersController,
  getUserByIdController,
  deleteUserByIdController,
} from "../controllers/userController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import { updateUserProfileSchema } from "../validations/userValidation.js";

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user's profile
 * @access  Private (User)
 */
router.get("/profile", protect, getUserProfileController);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user's profile
 * @access  Private (User)
 */
router.put(
  "/profile",
  protect,
  validateResource(updateUserProfileSchema),
  updateUserProfileController
);

/**
 * @route   DELETE /api/users/profile
 * @desc    Soft delete current user's account
 * @access  Private (User)
 */
router.delete("/profile", protect, deleteUserProfileController);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (Admin)
 */
router.get("/", protect, authorizeRoles("admin"), getAllUsersController);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin)
 */
router.get("/:id", protect, authorizeRoles("admin"), getUserByIdController);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user by ID
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteUserByIdController
);

export default router;
