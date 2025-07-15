import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
import validateResource from "../middlewares/validateResource.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { updateUserProfileValidation } from "../validations/userValidation.js";

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Retrieve the authenticated user's profile
 * @access  Private
 */
router.get("/profile", protect, asyncHandler(getUserProfile));

/**
 * @route   PUT /api/users/profile
 * @desc    Update the authenticated user's profile
 * @access  Private
 */
router.put(
  "/profile",
  protect,
  validateResource(updateUserProfileValidation),
  asyncHandler(updateUserProfile)
);

/**
 * @route   DELETE /api/users/profile
 * @desc    Soft delete the authenticated user's account
 * @access  Private
 */
router.delete("/profile", protect, asyncHandler(deleteUserProfile));

/**
 * @route   GET /api/users
 * @desc    Retrieve all users (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(getAllUsers)
);

/**
 * @route   GET /api/users/:id
 * @desc    Retrieve a user by ID (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(getUserById)
);

/**
 * @route   DELETE /api/users/:id
 * @desc    Soft delete a user by ID (Admin only)
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(deleteUserById)
);

export default router;
