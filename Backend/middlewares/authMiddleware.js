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
  // 1️⃣ Extract token from Authorization header

  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;
  // console.log("Reached till the protect middleware", token);

  if (!token) {
    throw new ApiError(401, MESSAGES.AUTH.TOKEN_MISSING);
  }

  // 2️⃣ Verify token with expiration handling
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded token in auhMiddleware is : ", decoded);
  } catch (error) {
    throw new ApiError(401, MESSAGES.AUTH.TOKEN_INVALID);
  }
  // console.log("Decoded Data : ", decoded);

  // 3️⃣ Fetch user without password
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new ApiError(401, MESSAGES.USER.NOT_FOUND);
  }

  // Optional: block check for suspended users
  if (user.isBlocked) {
    throw new ApiError(403, MESSAGES.USER.BLOCKED);
  }

  req.user = user;

  // 4️⃣ If user is an admin, fetch admin profile and attach designation
  if (user.role === "admin") {
    const admin = await Admin.findOne({ user: user._id });
    if (!admin) {
      throw ApiError.forbidden("Admin profile not found.");
    }
    req.admin = admin;
    req.user.designation = admin.designation;
  }

  // 5️⃣ Continue to next middleware
  next();
});

/**
 * @desc    Authorize user based on allowed roles or bypass if superadmin
 * @param   {...string} roles
 * @route   Middleware
 * @access  Private
 */
export const authorizeRoles =
  (...roles) =>
  (req, res, next) => {
    // console.log(
    //   "============================================================================================="
    // );

    // console.log("REQUIRED ROLES : ", roles);
    // console.log("USER DATA : ", req.user);
    // console.log("ADMIN DATA : ", req.admin);
    // console.log(
    //   "============================================================================================="
    // );

    if (req.admin && req.admin.designation === "superadmin") return next();
    if (!roles.includes(req.user.role))
      throw new ApiError(403, MESSAGES.AUTH.UNAUTHORIZED);
    next();
  };

/**
 * @desc    Attach seller profile to req if user is a seller
 * @route   Middleware
 * @access  Private (Seller only)
 */
export const attachSellerProfile = asyncHandler(async (req, res, next) => {
  if (req.user.role !== ROLES.SELLER)
    throw new ApiError(403, MESSAGES.AUTH.UNAUTHORIZED);
  const seller = await Seller.findOne({ user: req.user._id });
  if (!seller) throw new ApiError(404, MESSAGES.SELLER.NOT_FOUND);
  req.seller = seller;
  next();
});

/**
 * @desc    Attach admin profile to req if user is an admin or superadmin
 * @route   Middleware
 * @access  Private (Admin only)
 */
export const attachAdminProfile = asyncHandler(async (req, res, next) => {
  if (req.user.role !== ROLES.ADMIN) {
    throw new ApiError(403, MESSAGES.AUTH.UNAUTHORIZED);
  }
  const admin = await Admin.findOne({ user: req.user._id });
  if (!admin) throw new ApiError(404, MESSAGES.ADMIN.NOT_FOUND);
  req.admin = admin;

  next();
});
