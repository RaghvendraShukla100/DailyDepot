import mongoose from "mongoose";

// Order Schema for managing user orders with multi-seller and soft-delete support
const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user placing the order
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        }, // Product ordered
        seller: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Seller",
          required: true,
        }, // Seller of the product
        quantity: { type: Number, required: true, min: 1 }, // Quantity ordered
        priceAtPurchase: { type: Number, required: true }, // Product price at the time of purchase
        selectedSize: { type: String }, // Selected size (if applicable)
        selectedColor: { type: String }, // Selected color (if applicable)
      },
    ],
    shippingAddress: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    }, // Shipping address
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    }, // Payment status
    paymentMethod: {
      type: String,
      enum: ["card", "cod", "upi", "netbanking"],
      required: true,
    }, // Payment method
    orderStatus: {
      type: String,
      enum: [
        "processing",
        "shipped",
        "out_for_delivery",
        "delivered",
        "cancelled",
        "returned",
      ],
      default: "processing",
    }, // Current order status
    deliveryDate: { type: Date }, // Expected delivery date
    totalAmount: { type: Number, required: true }, // Total order amount
    appliedCoupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }, // Applied coupon reference (if any)
    trackingNumber: { type: String }, // Courier tracking number
    notes: { type: String, trim: true }, // Additional notes for the order
    deleted: { type: Boolean, default: false }, // Soft delete flag
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } }, // Auto-index for TTL on soft-deleted data
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Soft delete handler before saving
orderSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  } else if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
