import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Brand from "../models/brandSchema.js";

/**
 * Seed Brands:
 * Adds demo brands for testing filtering, brand listings, and product associations.
 */
const seedBrands = async () => {
  try {
    console.log("Seeding Brands...");

    // Clear existing brands
    await Brand.deleteMany();

    const brands = [
      {
        name: "Apple",
        description: "Innovative consumer electronics and software products.",
        logo: "https://logo.clearbit.com/apple.com",
        website: "https://www.apple.com",
        isFeatured: true,
        meta: {
          title: "Apple - DailyDepot",
          description: "Buy Apple products online at best prices.",
          keywords: ["apple", "iphone", "macbook", "ipad"],
        },
      },
      {
        name: "Nike",
        description: "Leading brand in sportswear and footwear.",
        logo: "https://logo.clearbit.com/nike.com",
        website: "https://www.nike.com",
        isFeatured: true,
        meta: {
          title: "Nike - DailyDepot",
          description: "Shop Nike shoes and apparel.",
          keywords: ["nike", "shoes", "sportswear", "running"],
        },
      },
      {
        name: "Samsung",
        description: "Wide range of electronics and appliances.",
        logo: "https://logo.clearbit.com/samsung.com",
        website: "https://www.samsung.com",
        isFeatured: true,
        meta: {
          title: "Samsung - DailyDepot",
          description: "Explore Samsung mobiles and appliances.",
          keywords: ["samsung", "smartphones", "appliances", "tv"],
        },
      },
      {
        name: "Adidas",
        description: "Sports clothing, footwear, and accessories.",
        logo: "https://logo.clearbit.com/adidas.com",
        website: "https://www.adidas.com",
        isFeatured: false,
        meta: {
          title: "Adidas - DailyDepot",
          description: "Shop Adidas clothing and shoes.",
          keywords: ["adidas", "sportswear", "shoes", "clothing"],
        },
      },
      {
        name: "Sony",
        description:
          "Electronics, gaming consoles, and entertainment products.",
        logo: "https://logo.clearbit.com/sony.com",
        website: "https://www.sony.com",
        isFeatured: false,
        meta: {
          title: "Sony - DailyDepot",
          description: "Shop Sony electronics and PlayStation products.",
          keywords: ["sony", "playstation", "electronics", "tv"],
        },
      },
      {
        name: "Puma",
        description: "Athletic and casual footwear, apparel, and accessories.",
        logo: "https://logo.clearbit.com/puma.com",
        website: "https://www.puma.com",
        isFeatured: false,
        meta: {
          title: "Puma - DailyDepot",
          description: "Buy Puma shoes and sportswear online.",
          keywords: ["puma", "sportswear", "shoes", "apparel"],
        },
      },
      {
        name: "Dell",
        description: "Laptops, desktops, and computer accessories.",
        logo: "https://logo.clearbit.com/dell.com",
        website: "https://www.dell.com",
        isFeatured: true,
        meta: {
          title: "Dell - DailyDepot",
          description: "Shop Dell laptops and accessories.",
          keywords: ["dell", "laptops", "computers", "pc"],
        },
      },
      {
        name: "Levi's",
        description: "Denim jeans and casual apparel for men and women.",
        logo: "https://logo.clearbit.com/levi.com",
        website: "https://www.levi.com",
        isFeatured: false,
        meta: {
          title: "Levi's - DailyDepot",
          description: "Buy Levi's jeans and apparel online.",
          keywords: ["levis", "jeans", "denim", "clothing"],
        },
      },
    ];

    await Brand.insertMany(brands);

    console.log("✅ Brands seeded successfully.");
  } catch (error) {
    console.error("❌ Error seeding brands:", error);
    process.exit(1);
  }
};

export default seedBrands;
