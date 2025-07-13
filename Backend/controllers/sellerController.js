import * as sellerService from "../services/sellerService.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc Create seller profile (user must exist)
 * @route POST /api/sellers
 * @access Private
 */
export const createSeller = async (req, res) => {
  const seller = await sellerService.createSellerProfile(
    req.user._id,
    req.body
  );
  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        seller,
        MESSAGES.SELLER.CREATED_SUCCESS
      )
    );
};

/**
 * @desc Get current seller profile
 * @route GET /api/sellers/me
 * @access Private (Seller)
 */
export const getSeller = async (req, res) => {
  const seller = await sellerService.getSellerProfileByUserId(req.user._id);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.FETCHED_SUCCESS)
    );
};

/**
 * @desc Update current seller profile
 * @route PUT /api/sellers/me
 * @access Private (Seller)
 */
export const updateSeller = async (req, res) => {
  const seller = await sellerService.updateSellerProfileByUserId(
    req.user._id,
    req.body
  );
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.UPDATED_SUCCESS)
    );
};

/**
 * @desc Soft delete current seller profile
 * @route DELETE /api/sellers/me
 * @access Private (Seller)
 */
export const removeSeller = async (req, res) => {
  const seller = await sellerService.softDeleteSellerByUserId(req.user._id);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.DELETED_SUCCESS)
    );
};

/**
 * @desc Get all sellers (Admin) with pagination
 * @route GET /api/sellers
 * @access Private (Admin)
 */
export const getAllSellers = async (req, res) => {
  const { sellers, pagination } = await sellerService.getAllSellers(req.query);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        { sellers, ...pagination },
        MESSAGES.SELLER.ALL_FETCHED
      )
    );
};

/**
 * @desc Get seller by ID (Admin)
 * @route GET /api/sellers/:id
 * @access Private (Admin)
 */
export const getSellerById = async (req, res) => {
  const seller = await sellerService.getSellerProfile(req.params.id);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.FETCHED_SUCCESS)
    );
};

/**
 * @desc Delete seller by ID (Admin - soft delete)
 * @route DELETE /api/sellers/:id
 * @access Private (Admin)
 */
export const removeSellerById = async (req, res) => {
  const seller = await sellerService.softDeleteSellerById(req.params.id);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, seller, MESSAGES.SELLER.DELETED_SUCCESS)
    );
};
