// /backend/routes/userRoutes.js

import express from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  getAllUsers,
  getUserById,
  deleteUserById,
} from "../controllers/userController.js";
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post("/register", registerUser);

/**
 * @route   POST /api/users/login
 * @desc    Login user and get JWT
 * @access  Public
 */
router.post("/login", loginUser);

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private (User)
 */
router.get("/profile", protect, authorizeRoles(ROLES.USER), getUserProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update current user profile
 * @access  Private (User)
 */
router.put("/profile", protect, authorizeRoles(ROLES.USER), updateUserProfile);

/**
 * @route   DELETE /api/users/profile
 * @desc    Soft delete current user account
 * @access  Private (User)
 */
router.delete(
  "/profile",
  protect,
  authorizeRoles(ROLES.USER),
  deleteUserProfile
);

/**
 * @route   GET /api/users
 * @desc    Get all users (Admin only)
 * @access  Private (Admin)
 */
router.get("/", protect, authorizeRoles(ROLES.ADMIN), getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID (Admin only)
 * @access  Private (Admin)
 */
router.get("/:id", protect, authorizeRoles(ROLES.ADMIN), getUserById);

/**
 * @route   DELETE /api/users/:id
 * @desc    Soft delete user by ID (Admin only)
 * @access  Private (Admin)
 */
router.delete("/:id", protect, authorizeRoles(ROLES.ADMIN), deleteUserById);

export default router;
