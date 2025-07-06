import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Category from "../models/categorySchema.js";

/**
 * Seed Categories:
 * Creates demo categories with parent-child hierarchy for storefront testing.
 */
const seedCategories = async () => {
  try {
    console.log("🌱 Seeding Categories...");

    // Clear existing categories
    await Category.deleteMany();

    // Create parent categories
    const parents = await Category.insertMany([
      {
        name: "Fashion",
        slug: "fashion",
        description: "Clothing, footwear, and accessories.",
        image: { url: "https://via.placeholder.com/600x600.png?text=Fashion" },
        isFeatured: true,
      },
      {
        name: "Electronics",
        slug: "electronics",
        description: "Gadgets, devices, and accessories.",
        image: {
          url: "https://via.placeholder.com/600x600.png?text=Electronics",
        },
        isFeatured: true,
      },
      {
        name: "Home & Kitchen",
        slug: "home-kitchen",
        description: "Home decor, kitchen essentials, and furniture.",
        image: {
          url: "https://via.placeholder.com/600x600.png?text=Home+%26+Kitchen",
        },
        isFeatured: false,
      },
    ]);

    // Create child categories with parent references
    await Category.insertMany([
      {
        name: "Men's Clothing",
        slug: "mens-clothing",
        description: "Shirts, jeans, t-shirts, and more.",
        parentCategory: parents[0]._id,
        image: {
          url: "https://via.placeholder.com/600x600.png?text=Men's+Clothing",
        },
        isFeatured: false,
      },
      {
        name: "Women's Clothing",
        slug: "womens-clothing",
        description: "Dresses, tops, jeans, and more.",
        parentCategory: parents[0]._id,
        image: {
          url: "https://via.placeholder.com/600x600.png?text=Women's+Clothing",
        },
        isFeatured: false,
      },
      {
        name: "Mobile Phones",
        slug: "mobile-phones",
        description: "Latest smartphones and mobile accessories.",
        parentCategory: parents[1]._id,
        image: {
          url: "https://via.placeholder.com/600x600.png?text=Mobile+Phones",
        },
        isFeatured: true,
      },
      {
        name: "Laptops",
        slug: "laptops",
        description: "Latest laptops for personal and professional use.",
        parentCategory: parents[1]._id,
        image: { url: "https://via.placeholder.com/600x600.png?text=Laptops" },
        isFeatured: false,
      },
    ]);

    console.log("✅ Categories seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
  }
};

export default seedCategories;
