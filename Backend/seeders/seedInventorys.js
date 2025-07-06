// /backend/seeders/seedInventory.js

import Product from "../models/productSchema.js";
import Inventory from "../models/inventorySchema.js";

const seedInventory = async () => {
  try {
    console.log("🌱 Seeding Inventory...");

    const products = await Product.find().limit(10);
    if (products.length === 0) {
      console.log("⚠️ Products missing. Please seed products first.");
      return;
    }

    await Inventory.deleteMany();

    const inventories = products.map((product, index) => ({
      product: product._id,
      sku: `SKU-${product._id.toString().slice(-5)}-${index}`,
      batchNumber: `BATCH-${index + 100}`,
      quantity: Math.floor(Math.random() * 100) + 10,
      reserved: Math.floor(Math.random() * 5),
      warehouseLocation: `Warehouse-${(index % 3) + 1}`,
      restockDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
      lowStockThreshold: 5,
      expiryDate:
        Math.random() < 0.3
          ? new Date(Date.now() + 1000 * 60 * 60 * 24 * 365)
          : undefined,
      status: "in_stock",
      notes: "Auto-seeded inventory for testing.",
    }));

    const inserted = await Inventory.insertMany(inventories);

    console.log(`✅ Seeded ${inserted.length} inventories successfully.`);

    console.table(
      inserted.map((inv, idx) => ({
        SNo: idx + 1,
        InventoryID: inv._id.toString(),
        ProductID: inv.product.toString(),
        SKU: inv.sku,
        Quantity: inv.quantity,
        Reserved: inv.reserved,
        Location: inv.warehouseLocation,
        Status: inv.status,
      }))
    );
  } catch (error) {
    console.error("❌ Error seeding inventories:", error);
  }
};

export default seedInventory;
