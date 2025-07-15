import express from "express";
import {
  createAddress,
  getAddresses,
  getAddressById,
  updateAddress,
  deleteAddress,
} from "../controllers/addressController.js";
import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createAddressValidation,
  updateAddressValidation,
} from "../validations/addressValidation.js";

const router = express.Router();

/**
 * @route   GET /api/addresses
 * @desc    Retrieve all addresses of the logged-in user
 * @access  Private
 */
router.get("/", protect, asyncHandler(getAddresses));

/**
 * @route   GET /api/addresses/:id
 * @desc    Retrieve a single address by its ID
 * @access  Private
 */
router.get("/:id", protect, asyncHandler(getAddressById));

/**
 * @route   POST /api/addresses
 * @desc    Create a new address for the logged-in user
 * @access  Private
 */
router.post(
  "/",
  protect,
  validateResource(createAddressValidation),
  asyncHandler(createAddress)
);

/**
 * @route   PUT /api/addresses/:id
 * @desc    Update an existing address by its ID
 * @access  Private
 */
router.put(
  "/:id",
  protect,
  validateResource(updateAddressValidation),
  asyncHandler(updateAddress)
);

/**
 * @route   DELETE /api/addresses/:id
 * @desc    Soft delete an address by its ID
 * @access  Private
 */
router.delete("/:id", protect, asyncHandler(deleteAddress));

export default router;
