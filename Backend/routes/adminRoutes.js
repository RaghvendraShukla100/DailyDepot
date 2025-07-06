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
import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/admins
 * @desc    Create admin profile (user must be logged in)
 * @access  Private
 */
router.post("/", protect, createAdmin);

/**
 * @route   GET /api/admins/me
 * @desc    Get current admin profile
 * @access  Private (admin)
 */
router.get("/me", protect, getAdmin);

/**
 * @route   PUT /api/admins/me
 * @desc    Update current admin profile
 * @access  Private (admin)
 */
router.put("/me", protect, updateAdmin);

/**
 * @route   DELETE /api/admins/me
 * @desc    Delete (soft delete) current admin profile
 * @access  Private (admin)
 */
router.delete("/me", protect, removeAdmin);

/**
 * @route   GET /api/admins
 * @desc    Get all admins
 * @access  Private/Admin
 */
router.get("/", protect, authorizeRoles("admin"), getAllAdmins);

/**
 * @route   GET /api/admins/:id
 * @desc    Get admin by ID
 * @access  Private/Admin
 */
router.get("/:id", protect, authorizeRoles("admin"), getAdminById);

/**
 * @route   DELETE /api/admins/:id
 * @desc    Soft delete admin by ID
 * @access  Private/Admin
 */
router.delete("/:id", protect, authorizeRoles("admin"), removeAdminById);

export default router;
