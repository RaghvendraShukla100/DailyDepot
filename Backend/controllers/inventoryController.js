import Inventory from "../models/inventorySchema.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc    Create a new inventory entry
 * @route   POST /api/inventories
 * @access  Private (Admin/Seller)
 */
export const createInventory = async (req, res) => {
  const inventory = await Inventory.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        inventory,
        MESSAGES.INVENTORY.CREATED_SUCCESS
      )
    );
};

/**
 * @desc    Get all inventory entries
 * @route   GET /api/inventories
 * @access  Private (Admin/Seller)
 */
export const getInventories = async (req, res) => {
  const inventories = await Inventory.find({ deleted: false }).populate(
    "product supplier"
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        inventories,
        MESSAGES.INVENTORY.FETCHED_SUCCESS
      )
    );
};

/**
 * @desc    Get a single inventory entry by ID
 * @route   GET /api/inventories/:id
 * @access  Private (Admin/Seller)
 */
export const getInventoryById = async (req, res) => {
  const inventory = await Inventory.findById(req.params.id)
    .where({ deleted: false })
    .populate("product supplier");

  if (!inventory) {
    throw ApiError.notFound(MESSAGES.INVENTORY.NOT_FOUND);
  }

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        inventory,
        MESSAGES.INVENTORY.RETRIEVED_SUCCESS
      )
    );
};

/**
 * @desc    Update inventory entry by ID
 * @route   PUT /api/inventories/:id
 * @access  Private (Admin/Seller)
 */
export const updateInventory = async (req, res) => {
  const inventory = await Inventory.findById(req.params.id).where({
    deleted: false,
  });

  if (!inventory) {
    throw ApiError.notFound(MESSAGES.INVENTORY.NOT_FOUND);
  }

  const updatableFields = [
    "product",
    "supplier",
    "quantity",
    "location",
    "status",
    "notes",
  ];

  updatableFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      inventory[field] = req.body[field];
    }
  });

  const updatedInventory = await inventory.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        updatedInventory,
        MESSAGES.INVENTORY.UPDATED_SUCCESS
      )
    );
};

/**
 * @desc    Soft delete inventory entry by ID
 * @route   DELETE /api/inventories/:id
 * @access  Private (Admin/Seller)
 */
export const deleteInventory = async (req, res) => {
  const inventory = await Inventory.findById(req.params.id).where({
    deleted: false,
  });

  if (!inventory) {
    throw ApiError.notFound(MESSAGES.INVENTORY.NOT_FOUND);
  }

  inventory.deleted = true;
  inventory.deletedAt = new Date();
  await inventory.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.INVENTORY.DELETED_SUCCESS)
    );
};
