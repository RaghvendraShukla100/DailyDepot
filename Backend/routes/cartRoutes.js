import express from "express";
import {
  getUserCartItemsController,
  addToCartController,
  updateCartItemController,
  removeCartItemController,
  toggleSaveForLaterController,
} from "../controllers/cartController.js";

import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  addToCartValidation,
  updateCartItemValidation,
} from "../validations/cartValidation.js";

const router = express.Router();

/**
 * @route   GET /api/cart
 * @desc    Get logged-in user's cart items
 * @access  Private (User)
 */
router.get("/", protect, getUserCartItemsController);

/**
 * @route   POST /api/cart/add
 * @desc    Add item to cart
 * @access  Private (User)
 */
router.post(
  "/add",
  protect,
  validateResource(addToCartValidation),
  addToCartController
);

/**
 * @route   PUT /api/cart/update/:id
 * @desc    Update cart item quantity or options
 * @access  Private (User)
 */
router.put(
  "/update/:id",
  protect,
  validateResource(updateCartItemValidation),
  updateCartItemController
);

/**
 * @route   DELETE /api/cart/remove/:id
 * @desc    Remove item from cart (soft delete)
 * @access  Private (User)
 */
router.delete("/remove/:id", protect, removeCartItemController);

/**
 * @route   POST /api/cart/save-for-later/:id
 * @desc    Toggle save for later on cart item
 * @access  Private (User)
 */
router.post("/save-for-later/:id", protect, toggleSaveForLaterController);

export default router;
