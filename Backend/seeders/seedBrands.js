// backend/seeders/seedBrands.js

import Brand from "../models/brandSchema.js";

if (process.env.NODE_ENV === "production") {
  console.log("⚠️ Seeding brands is disabled in production.");
}

const seedBrands = async () => {
  try {
    console.log("🌱 Seeding Brands...");

    await Brand.deleteMany();

    const brandsData = [
      {
        name: "Apple",
        description: "Innovative consumer electronics and software products.",
        logo: { url: "https://logo.clearbit.com/apple.com" },
        website: "https://www.apple.com",
        isFeatured: true,
      },
      {
        name: "Nike",
        description: "Leading brand in sportswear and footwear.",
        logo: { url: "https://logo.clearbit.com/nike.com" },
        website: "https://www.nike.com",
        isFeatured: true,
      },
      {
        name: "Samsung",
        description: "Wide range of electronics and appliances.",
        logo: { url: "https://logo.clearbit.com/samsung.com" },
        website: "https://www.samsung.com",
        isFeatured: true,
      },
      {
        name: "Adidas",
        description: "Sports clothing, footwear, and accessories.",
        logo: { url: "https://logo.clearbit.com/adidas.com" },
        website: "https://www.adidas.com",
        isFeatured: false,
      },
      {
        name: "Sony",
        description:
          "Electronics, gaming consoles, and entertainment products.",
        logo: { url: "https://logo.clearbit.com/sony.com" },
        website: "https://www.sony.com",
        isFeatured: false,
      },
      {
        name: "Puma",
        description: "Athletic and casual footwear, apparel, and accessories.",
        logo: { url: "https://logo.clearbit.com/puma.com" },
        website: "https://www.puma.com",
        isFeatured: false,
      },
      {
        name: "Dell",
        description: "Laptops, desktops, and computer accessories.",
        logo: { url: "https://logo.clearbit.com/dell.com" },
        website: "https://www.dell.com",
        isFeatured: true,
      },
      {
        name: "Levi's",
        description: "Denim jeans and casual apparel for men and women.",
        logo: { url: "https://logo.clearbit.com/levi.com" },
        website: "https://www.levi.com",
        isFeatured: false,
      },
    ];

    // Auto-generate slug
    const brandsToInsert = brandsData.map((brand) => ({
      ...brand,
      slug: brand.name.toLowerCase().replace(/ /g, "-"),
    }));

    const insertedBrands = await Brand.insertMany(brandsToInsert);

    console.table(
      insertedBrands.map((brand) => ({
        Name: brand.name,
        Slug: brand.slug,
        Featured: brand.isFeatured,
        Website: brand.website,
      }))
    );

    console.log(`✅ Seeded ${insertedBrands.length} brands successfully.`);
  } catch (error) {
    console.error("❌ Error seeding brands:", error.message);
  }
};

export default seedBrands;
