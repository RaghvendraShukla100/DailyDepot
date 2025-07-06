import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  getCategoryByIdController,
  updateCategoryByIdController,
  deleteCategoryByIdController,
} from "../controllers/categoryController.js";
import {
  protect,
  authorizeRoles,
  attachAdminProfile,
} from "../middlewares/authMiddleware.js";
import validateResource from "../middlewares/validateResource.js";
import {
  createCategoryValidation,
  updateCategoryValidation,
} from "../validations/categoryValidation.js";

const router = express.Router();

// Public - Get all categories
router.get("/", getAllCategoriesController);

// Public - Get category by ID
router.get("/:id", getCategoryByIdController);

// Admin only - Create category
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(createCategoryValidation),
  createCategoryController
);

// Admin only - Update category
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  validateResource(updateCategoryValidation),
  updateCategoryByIdController
);

// Admin only - Delete category
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  attachAdminProfile,
  deleteCategoryByIdController
);

export default router;
