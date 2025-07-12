import express from "express";
import {
  createInventory,
  getInventories,
  getInventoryById,
  updateInventory,
  deleteInventory,
} from "../controllers/inventoryController.js";

import { protect, authorizeRoles } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createInventoryValidation,
  updateInventoryValidation,
} from "../validations/inventoryValidation.js";
import asyncHandler from "../middlewares/asyncHandler.js";

const router = express.Router();

/**
 * @route   POST /api/inventories
 * @desc    Create a new inventory entry
 * @access  Private (Admin, Seller)
 */
router.post(
  "/",
  protect,
  authorizeRoles("admin", "seller"),
  validateResource(createInventoryValidation),
  asyncHandler(createInventory)
);

/**
 * @route   GET /api/inventories
 * @desc    Get all inventory entries
 * @access  Private (Admin, Seller)
 */
router.get(
  "/",
  protect,
  authorizeRoles("admin", "seller"),
  asyncHandler(getInventories)
);

/**
 * @route   GET /api/inventories/:id
 * @desc    Get a single inventory entry by ID
 * @access  Private (Admin, Seller)
 */
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "seller"),
  asyncHandler(getInventoryById)
);

/**
 * @route   PUT /api/inventories/:id
 * @desc    Update an inventory entry by ID
 * @access  Private (Admin, Seller)
 */
router.put(
  "/:id",
  protect,
  authorizeRoles("admin", "seller"),
  validateResource(updateInventoryValidation),
  asyncHandler(updateInventory)
);

/**
 * @route   DELETE /api/inventories/:id
 * @desc    Soft delete an inventory entry by ID
 * @access  Private (Admin, Seller)
 */
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin", "seller"),
  asyncHandler(deleteInventory)
);

export default router;
