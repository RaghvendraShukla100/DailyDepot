import Address from "../models/addressSchema.js";
import asyncHandler from "../middlewares/asyncHandlerMiddleware.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Create a new address
// @route   POST /api/addresses
// @access  Private
export const createAddressController = asyncHandler(async (req, res) => {
  const address = await Address.create({ ...req.body, user: req.user._id });
  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        address,
        MESSAGES.ADDRESS.CREATED || "Address added successfully."
      )
    );
});

// @desc    Get all addresses of logged-in user
// @route   GET /api/addresses
// @access  Private
export const getAddressesController = asyncHandler(async (req, res) => {
  const addresses = await Address.find({ user: req.user._id, deleted: false });
  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, addresses));
});

// @desc    Get single address by ID
// @route   GET /api/addresses/:id
// @access  Private
export const getAddressByIdController = asyncHandler(async (req, res) => {
  const address = await Address.findOne({
    _id: req.params.id,
    user: req.user._id,
    deleted: false,
  });

  if (!address) {
    throw ApiError.notFound(
      MESSAGES.GENERAL.NOT_FOUND.replace("resource", "Address")
    );
  }

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, address));
});

// @desc    Update an address
// @route   PUT /api/addresses/:id
// @access  Private
export const updateAddressController = asyncHandler(async (req, res) => {
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
      new ApiResponse(
        STATUS_CODES.OK,
        address,
        MESSAGES.ADDRESS.UPDATED || "Address updated successfully."
      )
    );
});

// @desc    Delete (soft) an address
// @route   DELETE /api/addresses/:id
// @access  Private
export const deleteAddressController = asyncHandler(async (req, res) => {
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
      new ApiResponse(
        STATUS_CODES.OK,
        null,
        MESSAGES.ADDRESS.DELETED || "Address deleted successfully."
      )
    );
});
