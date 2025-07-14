import * as addressService from "../services/addressService.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

// @desc    Create a new address
// @route   POST /api/addresses
// @access  Private
export const createAddress = async (req, res) => {
  const address = await addressService.createAddress(req.user._id, req.body);
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
  const addresses = await addressService.getAddresses(req.user._id);
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
  const address = await addressService.getAddressById(
    req.user._id,
    req.params.id
  );
  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, address, MESSAGES.ADDRESS.FETCHED));
};

// @desc    Update an existing address by ID
// @route   PUT /api/addresses/:id
// @access  Private
export const updateAddress = async (req, res) => {
  const address = await addressService.updateAddress(
    req.user._id,
    req.params.id,
    req.body
  );
  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, address, MESSAGES.ADDRESS.UPDATED));
};

// @desc    Soft delete an address by ID
// @route   DELETE /api/addresses/:id
// @access  Private
export const deleteAddress = async (req, res) => {
  await addressService.deleteAddress(req.user._id, req.params.id);
  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, null, MESSAGES.ADDRESS.DELETED));
};
