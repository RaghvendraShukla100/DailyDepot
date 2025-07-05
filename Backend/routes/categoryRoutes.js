import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "../controllers/categoryController.js";
import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResourceMiddleware.js";
import {
  createCategorySchema,
  updateCategorySchema,
} from "../validations/categoryValidation.js";

const router = express.Router();

// Public - Get all categories
router.get("/", getAllCategories);

// Public - Get category by ID
router.get("/:id", getCategoryById);

// Admin only - Create category
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(createCategorySchema),
  createCategory
);

// Admin only - Update category
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(updateCategorySchema),
  updateCategoryById
);

// Admin only - Delete category
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  deleteCategoryById
);

export default router;
