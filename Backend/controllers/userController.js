import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import User from "../models/userSchema.js";
import { STATUS_CODES } from "../constants/statusCodes.js";
import { MESSAGES } from "../constants/messages.js";
import logger from "../utils/logger.js";
import generateToken from "../utils/generateToken.js";

import {
  registerUserValidation,
  updateUserProfileValidation,
  loginUserValidation,
} from "../validations/userValidation.js";

/**
 * @desc    Register a new user
 * @route   POST /api/user/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = registerUserValidation.parse(req.body);

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw ApiError.conflict(MESSAGES.USER.ALREADY_EXISTS);
  }

  const [first, ...last] = name.trim().split(" ");

  const user = await User.create({
    name: { first, last: last.join(" ") },
    email,
    password, // raw password
  });

  const token = generateToken(user._id);

  logger.info(`New user registered with email=${email}`);

  res.status(STATUS_CODES.CREATED).json(
    new ApiResponse(
      STATUS_CODES.CREATED,
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
      MESSAGES.AUTH.REGISTER_SUCCESS
    )
  );
});

/**
 * @desc    Login user and get JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw ApiError.badRequest("Email and password are required.");
  }

  const user = await User.findOne({ email }).select(
    "+password name email role"
  );

  if (!user) {
    throw ApiError.unauthorized(MESSAGES.AUTH.LOGIN_FAIL);
  }

  // LOG HERE:
  console.log("Retrieved user:", {
    id: user._id,
    email: user.email,
    password: user.password,
    name: user.name,
  });

  if (!user.password) {
    logger.error(`Login failed: Missing password in DB for user ${email}`);
    throw ApiError.internal(
      "Password missing in user record. Please contact support."
    );
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw ApiError.unauthorized(MESSAGES.AUTH.LOGIN_FAIL);
  }

  const token = generateToken(user._id);

  logger.info(`User logged in with email=${email}`);

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        token,
      },
      MESSAGES.AUTH.LOGIN_SUCCESS
    )
  );
});

/**
 * @desc    Fetch the currently logged-in user's profile
 * @route   GET /api/users/profile
 * @access  Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  logger.info(`User profile fetched for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, user, MESSAGES.USER.PROFILE_FETCHED)
    );
});

/**
 * @desc    Update the currently logged-in user's profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
  const data = updateUserProfileValidation.parse(req.body);
  const user = await User.findById(req.user._id);

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  if (data.name) {
    const [first, ...last] = data.name.trim().split(" ");
    user.name.first = first || user.name.first;
    user.name.last = last.join(" ") || user.name.last;
  }
  if (data.bio) user.bio = data.bio;
  if (data.phone) user.phone = data.phone;
  if (data.address) user.addresses.push(data.address);

  await user.save();

  logger.info(`User profile updated for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, user, MESSAGES.USER.PROFILE_UPDATED)
    );
});

/**
 * @desc    Soft delete the currently logged-in user's account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
export const deleteUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  user.deleted = true;
  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();

  logger.info(`User account soft-deleted for userId=${req.user._id}`);

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.USER.DELETED_SUCCESS)
    );
});

/**
 * @desc    Fetch all non-deleted users (Admin only) with pagination
 * @route   GET /api/users
 * @access  Private/Admin
 */
export const getAllUsers = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 20;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    User.find({ deleted: { $ne: true } })
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    User.countDocuments({ deleted: { $ne: true } }),
  ]);

  logger.info(
    `Admin userId=${req.user._id} fetched users page=${page} limit=${limit}`
  );

  res.status(STATUS_CODES.OK).json(
    new ApiResponse(
      STATUS_CODES.OK,
      {
        users,
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      MESSAGES.USER.ALL_FETCHED
    )
  );
});

/**
 * @desc    Fetch a specific user by ID (Admin only)
 * @route   GET /api/users/:id
 * @access  Private/Admin
 */
export const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  logger.info(`Admin userId=${req.user._id} fetched userId=${req.params.id}`);

  res
    .status(STATUS_CODES.OK)
    .json(new ApiResponse(STATUS_CODES.OK, user, MESSAGES.USER.FETCHED));
});

/**
 * @desc    Soft delete a specific user by ID (Admin only)
 * @route   DELETE /api/users/:id
 * @access  Private/Admin
 */
export const deleteUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    throw ApiError.notFound(MESSAGES.USER.NOT_FOUND);
  }

  user.deleted = true;
  user.status = "deleted";
  user.deletedAt = new Date();
  await user.save();

  logger.info(
    `Admin userId=${req.user._id} soft-deleted userId=${req.params.id}`
  );

  res
    .status(STATUS_CODES.OK)
    .json(
      new ApiResponse(STATUS_CODES.OK, null, MESSAGES.USER.DELETED_SUCCESS)
    );
});
