// /backend/routes/cartRoutes.js

import express from "express";
import {
  getUserCartController,
  addToCartController,
  updateCartItemController,
  removeFromCartController,
  toggleSaveForLaterController,
} from "../controllers/cartController.js";

import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  addToCartSchema,
  updateCartItemSchema,
} from "../validations/cartValidation.js";

const router = express.Router();

/**
 * @route   GET /api/cart
 * @desc    Get logged-in user's cart
 * @access  User
 */
router.get("/", protect, getUserCartController);

/**
 * @route   POST /api/cart/add
 * @desc    Add item to cart
 * @access  User
 */
router.post(
  "/add",
  protect,
  validateResource(addToCartSchema),
  addToCartController
);

/**
 * @route   PUT /api/cart/update/:id
 * @desc    Update cart item quantity/selection
 * @access  User
 */
router.put(
  "/update/:id",
  protect,
  validateResource(updateCartItemSchema),
  updateCartItemController
);

/**
 * @route   DELETE /api/cart/remove/:id
 * @desc    Remove item from cart
 * @access  User
 */
router.delete("/remove/:id", protect, removeFromCartController);

/**
 * @route   POST /api/cart/save-for-later/:id
 * @desc    Toggle save for later on cart item
 * @access  User
 */
router.post("/save-for-later/:id", protect, toggleSaveForLaterController);

export default router;
