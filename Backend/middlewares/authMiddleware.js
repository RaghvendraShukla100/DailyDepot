import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import Seller from "../models/sellerSchema.js";
import Admin from "../models/adminSchema.js";
import asyncHandler from "./asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/roles.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * @desc    Protect routes by verifying JWT and attaching user to req
 * @route   Middleware
 * @access  Private
 */
export const protect = asyncHandler(async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    throw new ApiError(401, MESSAGES.AUTH.TOKEN_MISSING);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, MESSAGES.USER.NOT_FOUND);
  }

  req.user = user;
  next();
});

/**
 * @desc    Authorize user based on allowed roles
 * @param   {...string} roles - Allowed roles
 * @route   Middleware
 * @access  Private
 */
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, MESSAGES.AUTH.UNAUTHORIZED);
    }
    next();
  };

/**
 * @desc    Attach seller profile to req if user is a seller
 * @route   Middleware
 * @access  Private (Seller only)
 */
export const attachSellerProfile = asyncHandler(async (req, res, next) => {
  if (req.user.role !== ROLES.SELLER) {
    throw new ApiError(403, MESSAGES.AUTH.UNAUTHORIZED);
  }

  const seller = await Seller.findOne({ user: req.user._id });

  if (!seller) {
    throw new ApiError(404, MESSAGES.SELLER.NOT_FOUND);
  }

  req.seller = seller;
  next();
});

/**
 * @desc    Attach admin profile to req if user is an admin
 * @route   Middleware
 * @access  Private (Admin only)
 */
export const attachAdminProfile = asyncHandler(async (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    throw new ApiError(403, MESSAGES.AUTH.UNAUTHORIZED);
  }

  const admin = await Admin.findOne({ user: req.user._id });

  if (!admin) {
    throw new ApiError(404, MESSAGES.ADMIN.NOT_FOUND);
  }

  req.admin = admin;
  next();
});
