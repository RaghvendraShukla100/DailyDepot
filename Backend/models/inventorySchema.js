import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      unique: true,
    },
    sku: { type: String, required: true, unique: true, trim: true },
    batchNumber: { type: String, trim: true }, // track batches for recalls/expiry
    quantity: { type: Number, required: true, min: 0 },
    reserved: { type: Number, default: 0, min: 0 }, // reserved for pending orders
    warehouseLocation: { type: String, trim: true },
    supplier: { type: mongoose.Schema.Types.ObjectId, ref: "Supplier" }, // track supplier for auditing
    restockDate: { type: Date },
    lowStockThreshold: { type: Number, default: 5 },
    expiryDate: { type: Date }, // useful for perishable categories
    status: {
      type: String,
      enum: ["in_stock", "out_of_stock", "discontinued"],
      default: "in_stock",
    },
    notes: { type: String, trim: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

inventorySchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Inventory = mongoose.model("Inventory", inventorySchema);
export default Inventory;
