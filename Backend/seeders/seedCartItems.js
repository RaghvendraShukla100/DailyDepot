// /backend/seeders/seedCartItems.js

import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import CartItem from "../models/cartItemSchema.js";

const seedCartItems = async () => {
  try {
    console.log("🌱 Seeding Cart Items...");

    const users = await User.find();
    const products = await Product.find();

    if (users.length === 0 || products.length === 0) {
      console.log("⚠️ Users or products missing. Please seed them first.");
      return;
    }

    await CartItem.deleteMany();

    const cartItems = [];

    for (let user of users) {
      const numberOfItems = Math.floor(Math.random() * 3) + 1; // 1-3 items
      const shuffledProducts = products.sort(() => 0.5 - Math.random());
      const selectedProducts = shuffledProducts.slice(0, numberOfItems);

      for (let product of selectedProducts) {
        cartItems.push({
          user: user._id,
          product: product._id,
          quantity: Math.floor(Math.random() * 3) + 1,
          priceAtAdded: product.price,
          selectedSize: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
          selectedColor: ["Red", "Blue", "Green", "Black", "White"][
            Math.floor(Math.random() * 5)
          ],
          status: "active",
          isSavedForLater: Math.random() < 0.3,
          notes: Math.random() < 0.2 ? "Priority delivery" : "",
        });
      }
    }

    const inserted = await CartItem.insertMany(cartItems);

    console.log(`✅ Seeded ${inserted.length} cart items successfully.`);
    console.table(
      inserted.map((item, idx) => ({
        SNo: idx + 1,
        User: item.user.toString(),
        Product: item.product.toString(),
        Quantity: item.quantity,
        SavedForLater: item.isSavedForLater,
      }))
    );
  } catch (error) {
    console.error("❌ Error seeding cart items:", error);
  }
};

export default seedCartItems;
