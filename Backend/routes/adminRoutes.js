// /backend/routes/adminRoutes.js

import express from "express";
import {
  getAdminProfileController,
  updateAdminProfileController,
  getAllUsersController,
  deleteUserByIdController,
  getAllSellersController,
  deleteSellerByIdController,
} from "../controllers/adminController.js";

import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import { updateAdminProfileSchema } from "../validations/adminValidation.js";

const router = express.Router();

/**
 * @route   GET /api/admins/profile
 * @desc    Get admin's own profile
 * @access  Private (Admin)
 */
router.get(
  "/profile",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  getAdminProfileController
);

/**
 * @route   PUT /api/admins/profile
 * @desc    Update admin's own profile
 * @access  Private (Admin)
 */
router.put(
  "/profile",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(updateAdminProfileSchema),
  updateAdminProfileController
);

/**
 * @route   GET /api/admins/users
 * @desc    Get all users
 * @access  Private (Admin)
 */
router.get("/users", protect, authorizeRoles("admin"), getAllUsersController);

/**
 * @route   DELETE /api/admins/users/:id
 * @desc    Delete user by ID
 * @access  Private (Admin)
 */
router.delete(
  "/users/:id",
  protect,
  authorizeRoles("admin"),
  deleteUserByIdController
);

/**
 * @route   GET /api/admins/sellers
 * @desc    Get all sellers
 * @access  Private (Admin)
 */
router.get(
  "/sellers",
  protect,
  authorizeRoles("admin"),
  getAllSellersController
);

/**
 * @route   DELETE /api/admins/sellers/:id
 * @desc    Delete seller by ID
 * @access  Private (Admin)
 */
router.delete(
  "/sellers/:id",
  protect,
  authorizeRoles("admin"),
  deleteSellerByIdController
);

export default router;
