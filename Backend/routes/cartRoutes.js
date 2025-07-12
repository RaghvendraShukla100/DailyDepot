import express from "express";
import {
  getUserCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  toggleSaveForLater,
} from "../controllers/cartController.js";

import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
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
router.get("/", protect, getUserCartItems);

/**
 * @route   POST /api/cart/add
 * @desc    Add item to cart
 * @access  Private (User)
 */
router.post("/add", protect, validateResource(addToCartValidation), addToCart);

/**
 * @route   PUT /api/cart/update/:id
 * @desc    Update cart item quantity or options
 * @access  Private (User)
 */
router.put(
  "/update/:id",
  protect,
  validateResource(updateCartItemValidation),
  updateCartItem
);

/**
 * @route   DELETE /api/cart/remove/:id
 * @desc    Remove item from cart (soft delete)
 * @access  Private (User)
 */
router.delete("/remove/:id", protect, removeCartItem);

/**
 * @route   POST /api/cart/save-for-later/:id
 * @desc    Toggle save for later on cart item
 * @access  Private (User)
 */
router.post("/save-for-later/:id", protect, toggleSaveForLater);

export default router;
