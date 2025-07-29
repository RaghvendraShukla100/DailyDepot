import mongoose from "mongoose";
import Brand from "../models/brandSchema.js";
import ApiError from "../utils/apiError.js";
import { MESSAGES } from "../constants/messages.js";

/**
 * ✅ Create a new brand
 */
export const createBrandService = async (data) => {
  const brand = await Brand.create(data);
  return brand;
};

/**
 * ✅ Get all non-deleted brands
 */
export const getBrandsService = async () => {
  const brands = await Brand.find({ deleted: { $ne: true } }).sort({
    createdAt: -1,
  });
  return brands;
};

/**
 * ✅ Get brand by ID (with validation)
 */
export const getBrandByIdService = async (brandId) => {
  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    throw ApiError.badRequest("Invalid brand ID.");
  }

  const brand = await Brand.findById(brandId);
  if (!brand || brand.deleted) {
    throw ApiError.notFound(MESSAGES.BRAND.NOT_FOUND);
  }

  return brand;
};

/**
 * ✅ Update a brand by ID (partial fields)
 */
export const updateBrandService = async (brandId, updateData) => {
  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    throw ApiError.badRequest("Invalid brand ID.");
  }

  const brand = await Brand.findById(brandId);
  if (!brand || brand.deleted) {
    throw ApiError.notFound(MESSAGES.BRAND.NOT_FOUND);
  }

  // Selectively update fields
  if (updateData.name !== undefined) brand.name = updateData.name;
  if (updateData.slug !== undefined) brand.slug = updateData.slug;
  if (updateData.description !== undefined)
    brand.description = updateData.description;
  if (updateData.logo !== undefined) brand.logo = updateData.logo;
  if (updateData.status !== undefined) brand.status = updateData.status;

  await brand.save();
  return brand;
};

/**
 * ✅ Soft delete a brand by ID
 */
export const deleteBrandService = async (brandId) => {
  if (!mongoose.Types.ObjectId.isValid(brandId)) {
    throw ApiError.badRequest("Invalid brand ID.");
  }

  const brand = await Brand.findById(brandId);
  if (!brand || brand.deleted) {
    throw ApiError.notFound(MESSAGES.BRAND.NOT_FOUND);
  }

  brand.deleted = true;
  brand.status = "deleted";
  brand.deletedAt = new Date();
  await brand.save();

  return;
};
