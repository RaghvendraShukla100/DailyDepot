// /backend/routes/addressRoutes.js

import express from "express";
import {
  createAddressController,
  getAddressesController,
  getAddressByIdController,
  updateAddressController,
  deleteAddressController,
} from "../controllers/addressController.js";

import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createAddressSchema,
  updateAddressSchema,
} from "../validations/addressValidation.js";

const router = express.Router();

/**
 * @route   GET /api/addresses
 * @desc    Get all addresses of logged-in user
 * @access  Private
 */
router.get("/", protect, getAddressesController);

/**
 * @route   GET /api/addresses/:id
 * @desc    Get single address by ID
 * @access  Private
 */
router.get("/:id", protect, getAddressByIdController);

/**
 * @route   POST /api/addresses
 * @desc    Create a new address
 * @access  Private
 */
router.post(
  "/",
  protect,
  validateResource(createAddressSchema),
  createAddressController
);

/**
 * @route   PUT /api/addresses/:id
 * @desc    Update an address
 * @access  Private
 */
router.put(
  "/:id",
  protect,
  validateResource(updateAddressSchema),
  updateAddressController
);

/**
 * @route   DELETE /api/addresses/:id
 * @desc    Delete (soft) an address
 * @access  Private
 */
router.delete("/:id", protect, deleteAddressController);

export default router;
