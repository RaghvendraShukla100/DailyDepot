import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Product from "../models/productSchema.js";
import Category from "../models/categorySchema.js";
import Brand from "../models/brandSchema.js";

/**
 * Seed Products:
 * Creates realistic demo products for storefront testing.
 */
const seedProducts = async () => {
  try {
    console.log("Seeding Products...");

    // Clear existing products
    await Product.deleteMany();

    // Fetch sample categories and brands for references
    const categories = await Category.find().limit(2);
    const brands = await Brand.find().limit(2);

    if (!categories.length || !brands.length) {
      console.log("❌ Please seed categories and brands first.");
      process.exit(1);
    }

    // Prepare product data
    const products = [
      {
        name: "Ultra Comfort Running Shoes",
        description:
          "Lightweight, breathable running shoes with responsive cushioning.",
        category: categories[0]._id,
        brand: brands[0]._id,
        price: 3999,
        discount: 15,
        stock: 50,
        sold: 10,
        colors: ["black", "white", "blue"],
        sizes: ["7", "8", "9", "10"],
        images: [
          {
            url: "https://via.placeholder.com/600x600.png?text=Running+Shoes",
            alt: "Running Shoes Front",
          },
          {
            url: "https://via.placeholder.com/600x600.png?text=Running+Shoes+Side",
            alt: "Running Shoes Side",
          },
        ],
        ratingsAverage: 4.3,
        ratingsCount: 25,
        sku: "SHOES-001",
        tags: ["running", "shoes", "sports"],
        weight: 0.8,
        dimensions: { length: 30, width: 20, height: 10 },
        meta: {
          title: "Ultra Comfort Running Shoes",
          description:
            "Breathable and comfortable running shoes for everyday workouts.",
          keywords: ["running shoes", "sports shoes", "gym shoes"],
        },
      },
      {
        name: "Classic Cotton T-Shirt",
        description:
          "Premium cotton t-shirt with a soft finish and relaxed fit.",
        category: categories[0]._id,
        brand: brands[1]._id,
        price: 799,
        discount: 10,
        stock: 100,
        sold: 30,
        colors: ["white", "black", "grey"],
        sizes: ["S", "M", "L", "XL"],
        images: [
          {
            url: "https://via.placeholder.com/600x600.png?text=Cotton+T-Shirt",
            alt: "Cotton T-Shirt Front",
          },
        ],
        ratingsAverage: 4.7,
        ratingsCount: 45,
        sku: "TSHIRT-001",
        tags: ["t-shirt", "casual wear", "cotton"],
        weight: 0.2,
        dimensions: { length: 25, width: 20, height: 2 },
        meta: {
          title: "Classic Cotton T-Shirt",
          description: "Soft premium cotton t-shirt for daily comfort.",
          keywords: ["cotton t-shirt", "casual wear", "daily wear"],
        },
      },
      {
        name: "Bluetooth Over-Ear Headphones",
        description:
          "Noise-cancelling headphones with deep bass and long battery life.",
        category: categories[1]._id,
        brand: brands[0]._id,
        price: 4999,
        discount: 20,
        stock: 40,
        sold: 12,
        colors: ["black", "grey"],
        images: [
          {
            url: "https://via.placeholder.com/600x600.png?text=Headphones",
            alt: "Headphones Front",
          },
        ],
        ratingsAverage: 4.5,
        ratingsCount: 33,
        sku: "HEADPHONES-001",
        tags: ["headphones", "electronics", "audio"],
        weight: 0.5,
        dimensions: { length: 18, width: 15, height: 8 },
        meta: {
          title: "Bluetooth Over-Ear Headphones",
          description:
            "Noise-cancelling over-ear headphones with superior sound.",
          keywords: ["headphones", "bluetooth headphones", "noise cancelling"],
        },
      },
      {
        name: "Digital Sports Watch",
        description:
          "Water-resistant digital watch with stopwatch and alarm features.",
        category: categories[1]._id,
        brand: brands[1]._id,
        price: 1299,
        discount: 5,
        stock: 60,
        sold: 18,
        colors: ["black", "blue"],
        images: [
          {
            url: "https://via.placeholder.com/600x600.png?text=Sports+Watch",
            alt: "Sports Watch Display",
          },
        ],
        ratingsAverage: 4.2,
        ratingsCount: 20,
        sku: "WATCH-001",
        tags: ["watch", "sports", "accessories"],
        weight: 0.1,
        dimensions: { length: 10, width: 8, height: 4 },
        meta: {
          title: "Digital Sports Watch",
          description:
            "Durable sports watch with essential features for workouts.",
          keywords: ["sports watch", "digital watch", "water resistant"],
        },
      },
    ];

    // Insert products
    await Product.insertMany(products);

    console.log("✅ Products seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding products:", error);
    process.exit(1);
  }
};

export default seedProducts;
