// /backend/controllers/addressController.js

import Address from "../models/addressSchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Create a new address
// @route   POST /api/addresses
// @access  Private
export const createAddress = async (req, res) => {
  const address = await Address.create({
    ...req.body,
    user: req.user._id,
  });

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, address, MESSAGES.ADDRESS.CREATED)
    );
};

// @desc    Get all addresses of logged-in user
// @route   GET /api/addresses
// @access  Private
export const getAddresses = async (req, res) => {
  const addresses = await Address.find({
    user: req.user._id,
    deleted: false,
  });

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, addresses, MESSAGES.ADDRESS.ALL_FETCHED)
    );
};

// @desc    Get single address by ID
// @route   GET /api/addresses/:id
// @access  Private
export const getAddressById = async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!address) {
    throw ApiError.notFound(MESSAGES.ADDRESS.NOT_FOUND);
  }

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, address, MESSAGES.ADDRESS.FETCHED));
};

// @desc    Update an existing address by ID
// @route   PUT /api/addresses/:id
// @access  Private
export const updateAddress = async (req, res) => {
  const address = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, deleted: false },
    req.body,
    { new: true, runValidators: true }
  );

  if (!address) {
    throw ApiError.notFound(MESSAGES.ADDRESS.NOT_FOUND);
  }

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, address, MESSAGES.ADDRESS.UPDATED));
};

// @desc    Soft delete an address by ID
// @route   DELETE /api/addresses/:id
// @access  Private
export const deleteAddress = async (req, res) => {
  const address = await Address.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id, deleted: false },
    { deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!address) {
    throw ApiError.notFound(MESSAGES.ADDRESS.NOT_FOUND);
  }

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, MESSAGES.ADDRESS.DELETED));
};
