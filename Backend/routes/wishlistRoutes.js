// /backend/routes/wishlistRoutes.js

import express from "express";
import asyncHandler from "../middlewares/asyncHandler.js";
import {
  createWishlist,
  getUserWishlist,
  updateWishlist,
  deleteWishlist,
  addProductToWishlist,
  removeProductFromWishlist,
} from "../controllers/wishlistController.js";

import { protect } from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createWishlistValidation,
  updateWishlistValidation,
  modifyWishlistProductValidation,
} from "../validations/wishlistValidation.js";

const router = express.Router();

/**
 * @route   GET /api/wishlists
 * @desc    Get logged-in user's wishlist
 * @access  User
 */
router.get("/", protect, asyncHandler(getUserWishlist));

/**
 * @route   POST /api/wishlists
 * @desc    Create a new wishlist
 * @access  User
 */
router.post(
  "/",
  protect,
  validateResource(createWishlistValidation),
  asyncHandler(createWishlist)
);

/**
 * @route   PUT /api/wishlists/:id
 * @desc    Update wishlist (name, visibility)
 * @access  User
 */
router.put(
  "/:id",
  protect,
  validateResource(updateWishlistValidation),
  asyncHandler(updateWishlist)
);

/**
 * @route   DELETE /api/wishlists/:id
 * @desc    Delete wishlist
 * @access  User
 */
router.delete("/:id", protect, asyncHandler(deleteWishlist));

/**
 * @route   POST /api/wishlists/:id/add
 * @desc    Add product to wishlist
 * @access  User
 */
router.post(
  "/:id/add",
  protect,
  validateResource(modifyWishlistProductValidation),
  asyncHandler(addProductToWishlist)
);

/**
 * @route   POST /api/wishlists/:id/remove
 * @desc    Remove product from wishlist
 * @access  User
 */
router.post(
  "/:id/remove",
  protect,
  validateResource(modifyWishlistProductValidation),
  asyncHandler(removeProductFromWishlist)
);

export default router;
