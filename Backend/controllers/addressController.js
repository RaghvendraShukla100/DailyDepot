// /backend/controllers/addressController.js

import Address from "../models/addressSchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Add a new address
// @route   POST /api/addresses
// @access  Private
export const addAddress = asyncHandler(async (req, res) => {
  const address = await Address.create({ ...req.body, user: req.user._id });
  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        address,
        "Address added successfully."
      )
    );
});

// @desc    Get all addresses for logged-in user
// @route   GET /api/addresses
// @access  Private
export const getAddresses = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id, deleted: false });
  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, addresses));
});

// @desc    Update an address
// @route   PUT /api/addresses/:id
// @access  Private
export const updateAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, deleted: false },
    req.body,
    { new: true, runValidators: true }
  );

  if (!address) {
    throw ApiError.notFound(
      MESSAGES.GENERAL.NOT_FOUND.replace("resource", "Address")
    );
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, address, "Address updated successfully.")
    );
});

// @desc    Delete an address (soft delete)
// @route   DELETE /api/addresses/:id
// @access  Private
export const deleteAddress = asyncHandler(async (req, res) => {
  const address = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, deleted: false },
    { deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!address) {
    throw ApiError.notFound(
      MESSAGES.GENERAL.NOT_FOUND.replace("resource", "Address")
    );
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Address deleted successfully.")
    );
});
