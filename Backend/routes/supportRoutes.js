// /backend/routes/supportRoutes.js

import express from "express";
import {
  createSupport,
  getSupport,
  getSupports,
  getSupportById,
  updateSupport,
  deleteSupport,
  deleteSupportById,
} from "../controllers/supportController.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { protect, authorizeRoles, attachAdminProfile } from "../middlewares/authMiddleware.js";
import checkPermissions from "../middlewares/checkPermissions.js";
import upload from "../middlewares/uploadMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import { ROLES } from "../constants/roles.js";
// we are using admin validation since all admin, support, and finance is admin only with different permission level
import {
  createAdminValidation,
  updateAdminValidation,
} from "../validations/adminValidation.js";

const router = express.Router();

/**
 * @route   POST /api/supports
 * @desc    Create a new support profile for an existing user
 * @access  Private (superadmin, admin with "manage_support")
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkPermissions("manage_support"),
  upload.single("profilePic"),
  validateResource(createAdminValidation),
  asyncHandler(createSupport)
);

/**
 * @route   GET /api/supports/me
 * @desc    Retrieve the authenticated support's profile
 * @access  Private (support)
 */
router.get(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  checkPermissions("read_supports"),
  attachAdminProfile,
  asyncHandler(getSupport)
);

/**
 * @route   PUT /api/supports/me
 * @desc    Update the authenticated support's profile
 * @access  Private (support)
 */
router.put(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  checkPermissions("manage_support"),
  attachAdminProfile,
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateSupport)
);

/**
 * @route   DELETE /api/supports/me
 * @desc    Soft delete the authenticated support's profile
 * @access  Private (support)
 */
router.delete(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  checkPermissions("manage_support"),
  attachAdminProfile,
  asyncHandler(deleteSupport)
);

/**
 * @route   GET /api/supports
 * @desc    Retrieve all support profiles
 * @access  Private (superadmin, admin with "manage_support")
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkPermissions("manage_support"),
  asyncHandler(getSupports)
);

/**
 * @route   GET /api/supports/:supportId
 * @desc    Retrieve a support profile by ID
 * @access  Private (superadmin, admin with "manage_support")
 */
router.get(
  "/:supportId",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkPermissions("manage_support"),
  asyncHandler(getSupportById)
);

/**
 * @route   DELETE /api/supports/:supportId
 * @desc    Soft delete a support profile by ID
 * @access  Private (superadmin, admin with "manage_support")
 */
router.delete(
  "/:supportId",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkPermissions("manage_support"),
  asyncHandler(deleteSupportById)
);

export default router;
