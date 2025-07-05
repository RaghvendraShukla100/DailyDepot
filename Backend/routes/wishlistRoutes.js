// /backend/routes/wishlistRoutes.js

import express from "express";
import {
  createWishlistController,
  getUserWishlistController,
  updateWishlistController,
  deleteWishlistController,
  addProductToWishlistController,
  removeProductFromWishlistController,
} from "../controllers/wishlistController.js";

import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createWishlistSchema,
  updateWishlistSchema,
  addWishlistItemSchema,
  updateWishlistItemSchema,
} from "../validations/wishlistValidation.js";

const router = express.Router();

/**
 * @route   GET /api/wishlists
 * @desc    Get logged-in user's wishlist
 * @access  User
 */
router.get("/", protect, getUserWishlistController);

/**
 * @route   POST /api/wishlists
 * @desc    Create a new wishlist
 * @access  User
 */
router.post(
  "/",
  protect,
  validateResource(createWishlistSchema),
  createWishlistController
);

/**
 * @route   PUT /api/wishlists/:id
 * @desc    Update wishlist (name, visibility)
 * @access  User
 */
router.put(
  "/:id",
  protect,
  validateResource(updateWishlistSchema),
  updateWishlistController
);

/**
 * @route   DELETE /api/wishlists/:id
 * @desc    Delete wishlist
 * @access  User
 */
router.delete("/:id", protect, deleteWishlistController);

/**
 * @route   POST /api/wishlists/:id/add
 * @desc    Add product to wishlist
 * @access  User
 */
router.post(
  "/:id/add",
  protect,
  validateResource(modifyWishlistProductSchema),
  addProductToWishlistController
);

/**
 * @route   POST /api/wishlists/:id/remove
 * @desc    Remove product from wishlist
 * @access  User
 */
router.post(
  "/:id/remove",
  protect,
  validateResource(modifyWishlistProductSchema),
  removeProductFromWishlistController
);

export default router;
