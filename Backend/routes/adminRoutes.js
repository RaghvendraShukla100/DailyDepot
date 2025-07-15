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
 * @desc    Create an admin profile for the authenticated user
 * @access  Private (User)
 * @permission manage_admins
 */
router.post(
  "/",
  protect,
  authorizeRoles(ROLES.USER),
  checkPermissions("manage_admins"),
  upload.single("profilePic"),
  validateResource(createAdminValidation),
  asyncHandler(createAdmin)
);

/**
 * @route   GET /api/admins/me
 * @desc    Retrieve the authenticated admin's profile
 * @access  Private (Admin)
 * @permission read_admins
 */
router.get(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  checkPermissions("read_admins"),
  attachAdminProfile,
  asyncHandler(getAdmin)
);

/**
 * @route   PUT /api/admins/me
 * @desc    Update the authenticated admin's profile
 * @access  Private (Admin)
 * @permission manage_admins
 */
router.put(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  attachAdminProfile,
  upload.single("profilePic"),
  validateResource(updateAdminValidation),
  asyncHandler(updateAdmin)
);

/**
 * @route   DELETE /api/admins/me
 * @desc    Soft delete the authenticated admin's profile
 * @access  Private (Admin)
 * @permission manage_admins
 */
router.delete(
  "/me",
  protect,
  authorizeRoles(ROLES.ADMIN, ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  attachAdminProfile,
  asyncHandler(removeAdmin)
);

/**
 * @route   GET /api/admins
 * @desc    Retrieve all admins
 * @access  Private (Superadmin)
 * @permission manage_admins
 */
router.get(
  "/",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(getAllAdmins)
);

/**
 * @route   GET /api/admins/:id
 * @desc    Retrieve an admin by ID
 * @access  Private (Superadmin)
 * @permission manage_admins
 */
router.get(
  "/:id",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(getAdminById)
);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Soft delete an admin by ID
 * @access  Private (Superadmin)
 * @permission manage_admins
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles(ROLES.SUPERADMIN),
  checkPermissions("manage_admins"),
  asyncHandler(removeAdminById)
);

export default router;
