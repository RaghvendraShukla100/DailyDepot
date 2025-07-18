import express from "express";
import {
  createAdmin,
  getAdmins,
  getAdminById,
  updateAdmin,
  deleteAdmin,
  getSuperAdmin,
  updateSuperAdmin,
  deleteSuperAdmin,
} from "../controllers/adminController.js";
import {
  protect,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
import validateResource from "../middlewares/validateResource.js";
import upload from "../middlewares/uploadMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import checkPermissions from "../middlewares/checkPermissions.js";
import {
  createAdminValidation,
  updateAdminValidation,
} from "../validations/adminValidation.js";

const router = express.Router();

/**
 * @route   POST /api/admins
 * @desc    Create a new admin/support/finance profile
 * @access  Private (Superadmin/Admin with manage_admins)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkPermissions("manage_admins"),
  upload.single("profilePic"),
  validateResource(createAdminValidation),
  asyncHandler(createAdmin)
);

/**
 * @route   GET /api/admins/me
 * @desc    Retrieve the authenticated superadmin's profile
 * @access  Private (Superadmin)
 */
router.get(
  "/me",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  asyncHandler(getSuperAdmin)
);

/**
 * @route   PUT /api/admins/me
 * @desc    Update the authenticated superadmin's profile
 * @access  Private (Superadmin)
 */
router.put(
  "/me",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateSuperAdmin)
);

/**
 * @route   DELETE /api/admins/me
 * @desc    Soft delete the authenticated superadmin's profile (safe fallback)
 * @access  Private (Superadmin)
 */
router.delete(
  "/me",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  asyncHandler(deleteSuperAdmin)
);

/**
 * @route   GET /api/admins
 * @desc    Retrieve all admins
 * @access  Private (Superadmin)
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(getAdmins)
);

/**
 * @route   GET /api/admins/:id
 * @desc    Retrieve an admin by ID
 * @access  Private (Superadmin)
 */
router.get(
  "/:id",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(getAdminById)
);

/**
 * @route   PUT /api/admins/:id
 * @desc    Update an admin by ID
 * @access  Private (Superadmin/Admin with manage_admins)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.SUPERADMIN, ROLES.ADMIN),
  checkPermissions("manage_admins"),
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateAdmin)
);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Soft delete an admin by ID
 * @access  Private (Superadmin)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(deleteAdmin)
);

export default router;
