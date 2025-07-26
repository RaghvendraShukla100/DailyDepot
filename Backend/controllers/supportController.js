// /backend/controllers/supportController.js

import * as supportService from "../services/supportService.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Create a new support profile for an existing user
 * @route   POST /api/supports
 * @access  Private (Superadmin/Admin with permissions)
 */
export const createSupport = async (req, res, next) => {
  const creator = req.admin; // injected via protect middleware
  const data = req.body;

  const support = await supportService.createSupportService(creator, data);

  logger.info(`Support created by ${creator._id} for user ${data.userId}`);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, support, MESSAGES.SUPPORT.CREATED)
    );
};

/**
 * @desc    Get all supports with optional filters and pagination
 * @route   GET /api/supports
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getSupports = async (req, res, next) => {
  const { page = 1, limit = 20, ...filters } = req.query;
  const skip = (page - 1) * limit;

  const supports = await supportService.getSupportsService(filters, {
    limit,
    skip,
  });

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, supports, MESSAGES.SUPPORT.FETCHED_ALL)
    );
};

/**
 * @desc    Get a single support by ID
 * @route   GET /api/supports/:supportId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getSupportById = async (req, res, next) => {
  const { supportId } = req.params;

  const support = await supportService.getSupportByIdService(supportId);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, support, MESSAGES.SUPPORT.FETCHED_SINGLE)
    );
};

/**
 * @desc    Update the authenticated support's own profile
 * @route   PUT /api/supports/:id
 * @access  Private (Support)
 */
export const updateSupportById = async (req, res, next) => {
  const admin = req.admin; // authenticated admin document
  const updater = req.admin;
  const data = req.body;

  const updatedSupport = await supportService.updateSupportService(
    admin._id,
    updater,
    data
  );

  logger.info(`Support ${admin._id} updated their own profile`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, updatedSupport, MESSAGES.SUPPORT.UPDATED)
    );
};

/**
 * @desc    Soft delete a support and downgrade user's role
 * @route   DELETE /api/supports/:supportId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const deleteSupportById = async (req, res, next) => {
  const { supportId } = req.params;

  const deletedSupport = await supportService.deleteSupportService(supportId);

  logger.info(`Support ${supportId} soft deleted.`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, deletedSupport, MESSAGES.SUPPORT.DELETED)
    );
};

//=========================================================================================
//                      supports ownn controller
//=========================================================================================

/**
 * @desc    Get the authenticated support's own profile
 * @route   GET /api/supports/me
 * @access  Private (Support)
 */
export const getSupport = async (req, res, next) => {
  const admin = req.admin; // attached by attachAdminProfile middleware
  console.log(admin);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, admin, MESSAGES.SUPPORT.FETCHED_SINGLE)
    );
};

/**
 * @desc    Update the authenticated support's own profile
 * @route   PUT /api/supports/me
 * @access  Private (Support)
 */
export const updateSupport = async (req, res, next) => {
  try {
    const admin = req.admin; // authenticated admin document
    const updater = req.admin;
    const data = req.body;

    const updatedSupport = await supportService.updateSupportService(
      admin._id,
      updater,
      data
    );

    logger.info(`Support ${admin._id} updated their own profile`);

    res
      .status(STATUS_CODES.OK)
      .json(
        new ApiResponse(
          STATUS_CODES.OK,
          updatedSupport,
          MESSAGES.SUPPORT.UPDATED
        )
      );
  } catch (error) {
    logger.error(`Error updating own support profile: ${error.message}`);
    next(error);
  }
};
