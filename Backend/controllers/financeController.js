import * as financeService from "../services/financeSrevice.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";

// ===============================
//       Finance Controllers
// ===============================

/**
 * @desc    Create a new finance profile for an existing user
 * @route   POST /api/finances
 * @access  Private (Superadmin/Admin with permissions)
 */
export const createFinance = async (req, res) => {
  const creator = req.admin;
  const data = req.body;
  console.log("Data in the controller is  : ", data);
  const finance = await financeService.createFinanceService(creator, data);

  logger.info(`Finance created by ${creator._id} for user ${data.userId}`);
  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(STATUS_CODES.CREATED, finance, MESSAGES.FINANCE.CREATED)
    );
};

/**
 * @desc    Get all finance profiles
 * @route   GET /api/finances
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getFinances = async (req, res) => {
  const { page = 1, limit = 20, ...filters } = req.query;
  const skip = (page - 1) * limit;
  const finances = await financeService.getFinancesService(filters, {
    limit,
    skip,
  });
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, finances, MESSAGES.FINANCE.FETCHED_ALL)
    );
};

/**
 * @desc    Get a single finance profile by ID
 * @route   GET /api/finances/:financeId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getFinanceById = async (req, res) => {
  const { financeId } = req.params;
  const finance = await financeService.getFinanceByIdService(financeId);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, finance, MESSAGES.FINANCE.FETCHED_SINGLE)
    );
};

/**
 * @desc    Update a finance's contact info and permissions by ID
 * @route   PUT /api/finances/:financeId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const updateFinanceById = async (req, res) => {
  const { financeId } = req.params;
  const updater = req.admin;
  const data = req.body;
  const profilePic = req.file.path;

  //   console.log(
  //     `=================================================================
  //                     finance controller debug
  // =================================================================`
  //   );

  //   console.log("FINANCE ID : ", financeId);
  //   console.log("DATA : ", data);
  //   console.log("PROFILE PIC : ", profilePic);
  //   console.log(
  //     `=================================================================`
  //   );

  const updatedFinance = await financeService.updateFinanceServiceById(
    financeId,
    updater,
    data,
    profilePic
  );
  logger.info(`Finance ${financeId} updated by ${updater._id}`);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, updatedFinance, MESSAGES.FINANCE.UPDATED)
    );
};

/**
 * @desc    Soft delete a finance profile
 * @route   DELETE /api/finances/:financeId
 * @access  Private (Superadmin/Admin with permissions)
 */
export const deleteFinanceById = async (req, res) => {
  const { financeId } = req.params;
  const deletedFinance = await financeService.deleteFinanceService(financeId);
  logger.info(`Finance ${financeId} soft deleted.`);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, deletedFinance, MESSAGES.FINANCE.DELETED)
    );
};

/**
 * @desc    Get the logged-in finance user's profile
 * @route   GET /api/finances/me
 * @access  Private (Superadmin/Admin with permissions)
 */
export const getFinance = async (req, res) => {
  const financeId = req.finance._id;
  const finance = await financeService.getFinanceByIdService(financeId);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, finance, MESSAGES.FINANCE.FETCHED_SINGLE)
    );
};

/**
 * @desc    Update a finance's contact info and permissions
 * @route   PUT /api/finances/me
 * @access  Private (Superadmin/Admin with permissions)
 */
export const updateFinance = async (req, res) => {
  const financeId = req.finance._id;
  const updater = req.admin;
  const data = req.body;
  const updatedFinance = await financeService.updateFinanceServiceById(
    financeId,
    updater,
    data
  );
  logger.info(`Finance ${financeId} updated by ${updater._id}`);
  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, updatedFinance, MESSAGES.FINANCE.UPDATED)
    );
};
