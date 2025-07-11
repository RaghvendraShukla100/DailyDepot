// /backend/routes/adminRoutes.js

import express from "express";
import {
  createAdmin,
  getAdmin,
  updateAdmin,
  removeAdmin,
  getAllAdmins,
  getAdminById,
  removeAdminById,
} from "../controllers/adminController.js";
import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
import validateRequest from "../middlewares/validateRequest.js";
import upload from "../middlewares/uploadMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createAdminValidation,
  updateAdminValidation,
} from "../validations/adminValidation.js";

const router = express.Router();

/**
 * @route   POST /api/admins
 * @desc    Create an admin profile for the authenticated user
 * @access  Private (User)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.USER),
  upload.single("profilePic"),
  validateRequest(createAdminValidation),
  asyncHandler(createAdmin)
);

/**
 * @route   GET /api/admins/me
 * @desc    Retrieve the authenticated admin's profile
 * @access  Private (Admin)
 */
router.get(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN),
  attachAdminProfile,
  asyncHandler(getAdmin)
);

/**
 * @route   PUT /api/admins/me
 * @desc    Update the authenticated admin's profile
 * @access  Private (Admin)
 */
router.put(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN),
  attachAdminProfile,
  upload.single("profilePic"),
  validateRequest(updateAdminValidation),
  asyncHandler(updateAdmin)
);

/**
 * @route   DELETE /api/admins/me
 * @desc    Soft delete the authenticated admin's profile
 * @access  Private (Admin)
 */
router.delete(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN),
  attachAdminProfile,
  asyncHandler(removeAdmin)
);

/**
 * @route   GET /api/admins
 * @desc    Retrieve all admins (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(getAllAdmins)
);

/**
 * @route   GET /api/admins/:id
 * @desc    Retrieve an admin by ID (Admin only)
 * @access  Private (Admin)
 */
router.get(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(getAdminById)
);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Soft delete an admin by ID (Admin only)
 * @access  Private (Admin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  asyncHandler(removeAdminById)
);

export default router;
