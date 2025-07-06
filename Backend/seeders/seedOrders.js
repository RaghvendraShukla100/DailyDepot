import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";
import Product from "../models/productSchema.js";
import Address from "../models/addressSchema.js";
import Seller from "../models/sellerSchema.js";

/**
 * Seed Orders:
 * Adds test orders for simulating dashboard data, user order histories, and testing payment and delivery workflows.
 */

// Prevent accidental production seeding
if (process.env.NODE_ENV === "production") {
  console.log("⚠️ Seeding orders is disabled in production.");
}

const seedOrders = async () => {
  try {
    console.log("🌱 Seeding Orders...");

    // Clear existing orders
    await Order.deleteMany();

    // Fetch required users, products, sellers, addresses
    const users = await User.find().limit(5);
    const products = await Product.find().limit(10).populate("brand category");
    const sellers = await Seller.find().limit(3);
    const addresses = await Address.find().limit(5);

    if (
      !users.length ||
      !products.length ||
      !sellers.length ||
      !addresses.length
    ) {
      console.log(
        "⚠️ Users, products, sellers, or addresses missing. Please seed them first."
      );
    }

    const orders = [];

    for (let i = 0; i < 10; i++) {
      const user = users[i % users.length];
      const address = addresses[i % addresses.length];

      const orderItems = [];
      const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per order

      for (let j = 0; j < numItems; j++) {
        const product = products[(i + j) % products.length];
        const seller = sellers[j % sellers.length];
        const quantity = Math.floor(Math.random() * 3) + 1; // 1-3 quantity
        const priceAtPurchase =
          product.price - (product.price * (product.discount || 0)) / 100;

        orderItems.push({
          product: product._id,
          seller: seller._id,
          quantity,
          priceAtPurchase,
          selectedSize: product.sizes?.length ? product.sizes[0] : undefined,
          selectedColor: product.colors?.length ? product.colors[0] : undefined,
        });
      }

      const totalAmount = orderItems.reduce(
        (total, item) => total + item.priceAtPurchase * item.quantity,
        0
      );

      orders.push({
        user: user._id,
        items: orderItems,
        shippingAddress: address._id,
        paymentStatus: "paid",
        paymentMethod: "card",
        orderStatus: "processing",
        deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        totalAmount,
        notes: "Test order for seeding.",
      });
    }

    await Order.insertMany(orders);

    const insertedOrders = await Order.find()
      .populate("user", "email")
      .limit(5);
    console.table(
      insertedOrders.map((order) => ({
        OrderID: order._id.toString(),
        User: order.user?.email,
        Total: order.totalAmount,
        Status: order.orderStatus,
      }))
    );

    console.log(`✅ Seeded ${orders.length} orders successfully.`);
  } catch (error) {
    console.error("❌ Error seeding orders:", error);
  }
};

export default seedOrders;
