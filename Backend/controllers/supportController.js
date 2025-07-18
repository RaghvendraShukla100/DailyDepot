// /backend/controllers/supportController.js

import * as supportService from "../services/supportService.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Create a new support profile for an existing user
 * @route   POST /api/supports
 * @access  Private (Superadmin/Admin with permissions)
 */
export const createSupport = async (req, res, next) => {
  try {
    const creator = req.admin; // injected via protect middleware
    const data = req.body;

    const support = await supportService.createSupportService(creator, data);

    logger.info(`Support created by ${creator._id} for user ${data.userId}`);

    res
      .status(STATUS_CODES.CREATED)
      .json(new ApiResponse(STATUS_CODES.CREATED, support, MESSAGES.SUPPORT.CREATED));
  } catch (error) {
    logger.error(`Error creating support: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get all supports with optional filters and pagination
 * @route   GET /api/supports
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getSupports = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, ...filters } = req.query;
    const skip = (page - 1) * limit;

    const supports = await supportService.getSupportsService(filters, { limit, skip });

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, supports, MESSAGES.SUPPORT.FETCHED_ALL));
  } catch (error) {
    logger.error(`Error fetching supports: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get a single support by ID
 * @route   GET /api/supports/:supportId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getSupportById = async (req, res, next) => {
  try {
    const { supportId } = req.params;

    const support = await supportService.getSupportByIdService(supportId);

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, support, MESSAGES.SUPPORT.FETCHED_SINGLE));
  } catch (error) {
    logger.error(`Error fetching support ${req.params.supportId}: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update a support's contact info and permissions
 * @route   PUT /api/supports/:supportId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const updateSupport = async (req, res, next) => {
  try {
    const { supportId } = req.params;
    const updater = req.admin;
    const data = req.body;

    const updatedSupport = await supportService.updateSupportService(supportId, updater, data);

    logger.info(`Support ${supportId} updated by ${updater._id}`);

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, updatedSupport, MESSAGES.SUPPORT.UPDATED));
  } catch (error) {
    logger.error(`Error updating support ${req.params.supportId}: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Soft delete a support and downgrade user's role
 * @route   DELETE /api/supports/:supportId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const deleteSupport = async (req, res, next) => {
  try {
    const { supportId } = req.params;

    const deletedSupport = await supportService.deleteSupportService(supportId);

    logger.info(`Support ${supportId} soft deleted.`);

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, deletedSupport, MESSAGES.SUPPORT.DELETED));
  } catch (error) {
    logger.error(`Error deleting support ${req.params.supportId}: ${error.message}`);
    next(error);
  }
};
