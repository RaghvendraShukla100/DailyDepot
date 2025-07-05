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
    console.log("Seeding Categories...");

    // Clear existing categories
    await Category.deleteMany();

    // Create parent categories
    const parents = await Category.insertMany([
      {
        name: "Fashion",
        description: "Clothing, footwear, and accessories.",
        image: "https://via.placeholder.com/600x600.png?text=Fashion",
        isFeatured: true,
        meta: {
          title: "Fashion - DailyDepot",
          description: "Latest fashion clothing and accessories.",
          keywords: ["fashion", "clothing", "footwear"],
        },
      },
      {
        name: "Electronics",
        description: "Gadgets, devices, and accessories.",
        image: "https://via.placeholder.com/600x600.png?text=Electronics",
        isFeatured: true,
        meta: {
          title: "Electronics - DailyDepot",
          description: "Latest gadgets and electronics.",
          keywords: ["electronics", "gadgets", "devices"],
        },
      },
      {
        name: "Home & Kitchen",
        description: "Home decor, kitchen essentials, and furniture.",
        image: "https://via.placeholder.com/600x600.png?text=Home+%26+Kitchen",
        isFeatured: false,
        meta: {
          title: "Home & Kitchen - DailyDepot",
          description: "Essentials for your home and kitchen.",
          keywords: ["home", "kitchen", "furniture"],
        },
      },
    ]);

    // Create child categories with parent references
    await Category.insertMany([
      {
        name: "Men's Clothing",
        description: "Shirts, jeans, t-shirts, and more.",
        parent: parents[0]._id,
        image: "https://via.placeholder.com/600x600.png?text=Men's+Clothing",
        isFeatured: false,
        meta: {
          title: "Men's Clothing - DailyDepot",
          description: "Men's fashion clothing collection.",
          keywords: ["men clothing", "shirts", "jeans"],
        },
      },
      {
        name: "Women's Clothing",
        description: "Dresses, tops, jeans, and more.",
        parent: parents[0]._id,
        image: "https://via.placeholder.com/600x600.png?text=Women's+Clothing",
        isFeatured: false,
        meta: {
          title: "Women's Clothing - DailyDepot",
          description: "Women's fashion clothing collection.",
          keywords: ["women clothing", "dresses", "tops"],
        },
      },
      {
        name: "Mobile Phones",
        description: "Latest smartphones and mobile accessories.",
        parent: parents[1]._id,
        image: "https://via.placeholder.com/600x600.png?text=Mobile+Phones",
        isFeatured: true,
        meta: {
          title: "Mobile Phones - DailyDepot",
          description: "Smartphones and accessories.",
          keywords: ["mobile", "smartphones", "accessories"],
        },
      },
      {
        name: "Laptops",
        description: "Latest laptops for personal and professional use.",
        parent: parents[1]._id,
        image: "https://via.placeholder.com/600x600.png?text=Laptops",
        isFeatured: false,
        meta: {
          title: "Laptops - DailyDepot",
          description: "High-performance laptops.",
          keywords: ["laptops", "notebooks", "computers"],
        },
      },
    ]);

    console.log("✅ Categories seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
};

export default seedCategories;
