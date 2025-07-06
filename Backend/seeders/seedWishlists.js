// /backend/seeders/seedWishlist.js

import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import Wishlist from "../models/wishlistSchema.js";

const seedWishlist = async () => {
  try {
    console.log("🌱 Seeding Wishlists...");

    const users = await User.find().limit(5);
    const products = await Product.find().limit(5);

    if (users.length === 0 || products.length === 0) {
      console.log("⚠️ Users or products missing. Please seed them first.");
      return;
    }

    await Wishlist.deleteMany();

    const wishlists = [];

    for (let i = 0; i < 5; i++) {
      const user = users[i % users.length];

      const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts
        .slice(0, Math.floor(Math.random() * 3) + 2) // 2-4 products
        .map((product) => ({
          product: product._id,
          addedAt: new Date(),
          selectedSize: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
          selectedColor: ["Red", "Blue", "Green", "Black", "White"][
            Math.floor(Math.random() * 5)
          ],
          notes: Math.random() < 0.5 ? "For festival purchase" : "",
        }));

      wishlists.push({
        user: user._id,
        products: selectedProducts,
        isPublic: Math.random() < 0.5,
        name: `Wishlist ${i + 1}`,
      });
    }

    const inserted = await Wishlist.insertMany(wishlists);

    console.log(`✅ Seeded ${inserted.length} wishlists successfully.`);
    console.table(
      inserted.map((wl, idx) => ({
        SNo: idx + 1,
        User: wl.user.toString(),
        Products: wl.products.length,
        Public: wl.isPublic,
        Name: wl.name,
      }))
    );
  } catch (error) {
    console.error("❌ Error seeding wishlists:", error);
  }
};

export default seedWishlist;
