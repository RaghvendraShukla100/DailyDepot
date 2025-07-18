// /backend/controllers/financeController.js

import * as financeService from "../services/financeService.js";
import ApiResponse from "../utils/apiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

/**
 * @desc    Create a new finance profile for an existing user
 * @route   POST /api/finances
 * @access  Private (Superadmin/Admin with permissions)
 */
export const createFinance = async (req, res, next) => {
  try {
    const creator = req.admin; // injected via protect middleware
    const data = req.body;

    const finance = await financeService.createFinanceService(creator, data);

    logger.info(`Finance created by ${creator._id} for user ${data.userId}`);

    res
      .status(STATUS_CODES.CREATED)
      .json(new ApiResponse(STATUS_CODES.CREATED, finance, MESSAGES.FINANCE.CREATED));
  } catch (error) {
    logger.error(`Error creating finance: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get all finance profiles
 * @route   GET /api/finances
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getFinances = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, ...filters } = req.query;
    const skip = (page - 1) * limit;

    const finances = await financeService.getFinancesService(filters, { limit, skip });

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, finances, MESSAGES.FINANCE.FETCHED_ALL));
  } catch (error) {
    logger.error(`Error fetching finances: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Get a single finance profile by ID
 * @route   GET /api/finances/:financeId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getFinanceById = async (req, res, next) => {
  try {
    const { financeId } = req.params;

    const finance = await financeService.getFinanceByIdService(financeId);

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, finance, MESSAGES.FINANCE.FETCHED_SINGLE));
  } catch (error) {
    logger.error(`Error fetching finance ${req.params.financeId}: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Update a finance's contact info and permissions
 * @route   PUT /api/finances/:financeId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const updateFinance = async (req, res, next) => {
  try {
    const { financeId } = req.params;
    const updater = req.admin;
    const data = req.body;

    const updatedFinance = await financeService.updateFinanceService(financeId, updater, data);

    logger.info(`Finance ${financeId} updated by ${updater._id}`);

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, updatedFinance, MESSAGES.FINANCE.UPDATED));
  } catch (error) {
    logger.error(`Error updating finance ${req.params.financeId}: ${error.message}`);
    next(error);
  }
};

/**
 * @desc    Soft delete a finance profile
 * @route   DELETE /api/finances/:financeId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const deleteFinance = async (req, res, next) => {
  try {
    const { financeId } = req.params;

    const deletedFinance = await financeService.deleteFinanceService(financeId);

    logger.info(`Finance ${financeId} soft deleted.`);

    res
      .status(STATUS_CODES.OK)
      .json(new ApiResponse(STATUS_CODES.OK, deletedFinance, MESSAGES.FINANCE.DELETED));
  } catch (error) {
    logger.error(`Error deleting finance ${req.params.financeId}: ${error.message}`);
    next(error);
  }
};
