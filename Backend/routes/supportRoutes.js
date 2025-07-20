import express from "express";
import {
  createSupport,
  getSupports,
  getSupportById,
  updateSupportById,
  deleteSupportById,
  updateSupport,
  getSupport,
} from "../controllers/supportController.js";

import asyncHandler from "../middlewares/asyncHandler.js";
import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";
import checkPermissions from "../middlewares/checkPermissions.js";
import upload from "../middlewares/uploadMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import checkDesignation from "../middlewares/checkDesignation.js";
import { ROLES } from "../constants/roles.js";
import { ADMIN_DESIGNATIONS } from "../constants/designation.js";

// using admin validation since all admin, support, and finance are admin with different permission levels
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
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_support"),
  upload.single("profilePic"),
  validateResource(createAdminValidation),
  asyncHandler(createSupport)
);

/**
 * @route   GET /api/supports
 * @desc    Retrieve all support profiles
 * @access  Private (superadmin, admin with "manage_support")
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
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
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),

  checkPermissions("manage_support"),
  asyncHandler(getSupportById)
);

/**
 * @route   PUT /api/supports/:supportId
 * @desc    Update the authenticated support's profile
 * @access  Private (support)
 */
router.put(
  "/:supportId",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  checkDesignation(
    ADMIN_DESIGNATIONS.SUPERADMIN,
    ADMIN_DESIGNATIONS.ADMIN,
    ADMIN_DESIGNATIONS.SUPPORT
  ),
  checkPermissions("manage_support"),
  attachAdminProfile,
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateSupportById)
);

/**
 * @route   DELETE /api/supports/:supportId
 * @desc    Soft delete a support profile by ID
 * @access  Private (superadmin, admin with "manage_support")
 */
router.delete(
  "/:supportId",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_support"),
  asyncHandler(deleteSupportById)
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
  checkDesignation(
    ADMIN_DESIGNATIONS.SUPERADMIN,
    ADMIN_DESIGNATIONS.ADMIN,
    ADMIN_DESIGNATIONS.SUPPORT
  ),
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
  checkDesignation(
    ADMIN_DESIGNATIONS.SUPERADMIN,
    ADMIN_DESIGNATIONS.ADMIN,
    ADMIN_DESIGNATIONS.SUPPORT
  ),
  checkPermissions("manage_support"),
  attachAdminProfile,
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateSupport)
);

export default router;
