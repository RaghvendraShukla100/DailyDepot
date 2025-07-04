import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: { type: Number, required: true, min: 1 },
    selectedSize: { type: String },
    selectedColor: { type: String },
    priceAtAdded: { type: Number, required: true }, // snapshot of price at time of adding
    status: { type: String, enum: ["active", "removed"], default: "active" },
    isSavedForLater: { type: Boolean, default: false },
    appliedCoupon: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Coupon",
      default: null,
    },
    notes: { type: String, trim: true },
    deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem;
