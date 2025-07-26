// Updated financeRoutes.js according to updated controllers with clean protectFinance structure, asyncHandler usage, and accurate middleware chain

import express from "express";
import {
  createFinance,
  getFinance,
  getFinances,
  getFinanceById,
  updateFinance,
  updateFinanceById,
  deleteFinanceById,
} from "../controllers/financeController.js";
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
import {
  createAdminValidation,
  updateAdminValidation,
} from "../validations/adminValidation.js";

const router = express.Router();

/**
 * @route   POST /api/finances
 * @desc    Create a finance profile for an existing user
 * @access  Private (superadmin, admin with "manage_finance")
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_finance"),
  upload.single("profilePic"),
  validateResource(createAdminValidation),
  asyncHandler(createFinance)
);

/**
 * @route   GET /api/finances/me
 * @desc    Retrieve the authenticated finance profile
 * @access  Private (finance only)
 */
router.get(
  "/me",
  protect,
  authorizeRoles(ROLES.FINANCE),
  attachAdminProfile,
  asyncHandler(getFinance)
);

/**
 * @route   PUT /api/finances/me
 * @desc    Update the authenticated finance profile
 * @access  Private (finance only)
 */
router.put(
  "/me",
  protect,
  authorizeRoles(ROLES.FINANCE),
  attachAdminProfile,
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateFinance)
);

/**
 * @route   GET /api/finances
 * @desc    Retrieve all finance profiles
 * @access  Private (superadmin, admin with "manage_finance")
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_finance"),
  asyncHandler(getFinances)
);

/**
 * @route   GET /api/finances/:financeId
 * @desc    Retrieve a finance profile by ID
 * @access  Private (superadmin, admin with "manage_finance")
 */
router.get(
  "/:financeId",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_finance"),
  asyncHandler(getFinanceById)
);

/**
 * @route   PUT /api/finances/:financeId
 * @desc    Update a finance's contact info and permissions by ID
 * @access  Private (superadmin, admin with "manage_finance")
 */
router.put(
  "/:financeId",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_finance"),
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateFinanceById)
);

/**
 * @route   DELETE /api/finances/:financeId
 * @desc    Soft delete a finance profile by ID
 * @access  Private (superadmin, admin with "manage_finance")
 */
router.delete(
  "/:financeId",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_finance"),
  asyncHandler(deleteFinanceById)
);

export default router;
