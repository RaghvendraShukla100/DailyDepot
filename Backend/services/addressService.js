// /backend/services/addressService.js

import Address from "../models/addressSchema.js";
import ApiError from "../utils/ApiError.js";
import { MESSAGES } from "../constants/messages.js";
import { STATUS_CODES } from "../constants/statusCodes.js";

export const createAddress = async (userId, data) => {
  try {
    return await Address.create({ ...data, user: userId });
  } catch (error) {
    throw new ApiError(STATUS_CODES.BAD_REQUEST, error.message);
  }
};

export const getAddresses = async (userId) => {
  const addresses = await Address.find({ user: userId, deleted: false });
  return addresses;
};

export const getAddressById = async (userId, addressId) => {
  const address = await Address.findOne({
    _id: addressId,
    user: userId,
    deleted: false,
  });

  if (!address) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND);
  }

  return address;
};

export const updateAddress = async (userId, addressId, data) => {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, user: userId, deleted: false },
    data,
    { new: true, runValidators: true }
  );

  if (!address) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND);
  }

  return address;
};

export const deleteAddress = async (userId, addressId) => {
  const address = await Address.findOneAndUpdate(
    { _id: addressId, user: userId, deleted: false },
    { deleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!address) {
    throw new ApiError(STATUS_CODES.NOT_FOUND, MESSAGES.ADDRESS.NOT_FOUND);
  }

  return address;
};
