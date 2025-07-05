// Backend/controllers/inventoryController.js

import Inventory from "../models/inventorySchema.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

// @desc    Create a new inventory entry
// @route   POST /api/inventories
// @access  Admin/Seller
export const createInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.create(req.body);

  res
    .status(STATUS_CODES.CREATED)
    .json(
      new ApiResponse(
        STATUS_CODES.CREATED,
        inventory,
        "Inventory created successfully."
      )
    );
});

// @desc    Get all inventory entries
// @route   GET /api/inventories
// @access  Admin/Seller
export const getInventories = asyncHandler(async (req, res) => {
  const inventories = await Inventory.find({ deleted: false }).populate(
    "product supplier"
  );

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, inventories));
});

// @desc    Get a single inventory entry by ID
// @route   GET /api/inventories/:id
// @access  Admin/Seller
export const getInventoryById = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findById(req.params.id)
    .where({ deleted: false })
    .populate("product supplier");

  if (!inventory) {
    throw ApiError.notFound("Inventory");
  }

  res.status(STATUS_CODES.OK).json(new ApiResponse(STATUS_CODES.OK, inventory));
});

// @desc    Update inventory entry by ID
// @route   PUT /api/inventories/:id
// @access  Admin/Seller
export const updateInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findById(req.params.id).where({
    deleted: false,
  });

  if (!inventory) {
    throw ApiError.notFound("Inventory");
  }

  Object.keys(req.body).forEach((field) => {
    inventory[field] = req.body[field];
  });

  const updatedInventory = await inventory.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(
        STATUS_CODES.OK,
        updatedInventory,
        "Inventory updated successfully."
      )
    );
});

// @desc    Soft delete inventory entry by ID
// @route   DELETE /api/inventories/:id
// @access  Admin/Seller
export const deleteInventory = asyncHandler(async (req, res) => {
  const inventory = await Inventory.findById(req.params.id).where({
    deleted: false,
  });

  if (!inventory) {
    throw ApiError.notFound("Inventory");
  }

  inventory.deleted = true;
  inventory.deletedAt = new Date();
  await inventory.save();

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, "Inventory deleted successfully.")
    );
});
