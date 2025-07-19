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
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import { ROLES } from "../constants/roles.js";
import validateResource from "../middlewares/validateResource.js";
import upload from "../middlewares/uploadMiddleware.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { ADMIN_DESIGNATIONS } from "../constants/designation.js";
import checkPermissions from "../middlewares/checkPermissions.js";
import checkDesignation from "../middlewares/checkDesignation.js";
import {
  createAdminValidation,
  updateAdminValidation,
} from "../validations/adminValidation.js";

const router = express.Router();

// ======================================================================
//                           SUPERADMIN ROUTES
// ======================================================================

/**
 * @desc    Retrieve the authenticated superadmin/admin's profile
 * @route   GET /api/admins/me
 * @access  Private (Superadmin, Admin)
 */
router.get(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN),
  checkPermissions("manage_superadmin"),
  asyncHandler(getSuperAdmin)
);

/**
 * @desc    Update the authenticated superadmin/admin's profile
 * @route   PUT /api/admins/me
 * @access  Private (Superadmin, Admin)
 */
router.put(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN),
  checkPermissions("manage_admins"),
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateSuperAdmin)
);

/**
 * @desc    Soft delete the authenticated superadmin/admin's profile
 * @route   DELETE /api/admins/me
 * @access  Private (Superadmin, Admin)
 */
router.delete(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(deleteSuperAdmin)
);

// ======================================================================
//                           ADMIN ROUTES
// ======================================================================

/**
 * @desc    Create a new admin profile
 * @route   POST /api/admins
 * @access  Private (Superadmin)
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN),
  checkPermissions("manage_admins"),
  upload.single("profilePic"),
  validateResource(createAdminValidation),
  asyncHandler(createAdmin)
);

/**
 * @desc    Retrieve all admins
 * @route   GET /api/admins
 * @access  Private (Superadmin, Admin with "manage_admins" permission)
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(getAdmins)
);

/**
 * @desc    Retrieve an admin by ID
 * @route   GET /api/admins/:id
 * @access  Private (Superadmin, Admin with "manage_admins" permission)
 */
router.get(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(getAdminById)
);

/**
 * @desc    Update an admin by ID
 * @route   PUT /api/admins/:id
 * @access  Private (Superadmin, Admin with "manage_admins" permission)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN, ADMIN_DESIGNATIONS.ADMIN),
  checkPermissions("manage_admins"),
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateAdmin)
);

/**
 * @desc    Soft delete an admin by ID
 * @route   DELETE /api/admins/:id
 * @access  Private (Superadmin only)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.ADMIN),
  checkDesignation(ADMIN_DESIGNATIONS.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(deleteAdmin)
);
export default router;
