// /backend/routes/userRoutes.js

import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../controllers/userController.js";
import { authenticate } from "../middlewares/authMiddleware.js";
import { authorizeRoles } from "../middlewares/roleMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private (User)
 */
router.get(
  "/profile",
  authenticate,
  authorizeRoles(ROLES.USER),
  getUserProfile
);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile
 * @access  Private (User)
 */
router.put(
  "/profile",
  authenticate,
  authorizeRoles(ROLES.USER),
  updateUserProfile
);

/**
 * @route   DELETE /api/users/profile
 * @desc    Soft delete current user account
 * @access  Private (User)
 */
router.delete(
  "/profile",
  authenticate,
  authorizeRoles(ROLES.USER),
  deleteUserProfile
);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Private (Admin)
 */
router.get("/", authenticate, authorizeRoles(ROLES.ADMIN), getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Private (Admin)
 */
router.get("/:id", authenticate, authorizeRoles(ROLES.ADMIN), getUserById);

/**
 * @route   DELETE /api/users/:id
 * @desc    Soft delete user by ID
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  authenticate,
  authorizeRoles(ROLES.ADMIN),
  deleteUserById
);

export default router;
