import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: {
      type: String,
      enum: [
        "order_update",
        "promotion",
        "wishlist_back_in_stock",
        "price_drop",
        "general",
        "delivery_update",
        "payment_update",
        "refund_update",
      ],
      required: true,
    },
    title: { type: String, required: true, trim: true },
    message: { type: String, required: true, trim: true },
    iconUrl: { type: String, trim: true }, // for rich notifications
    imageUrl: { type: String, trim: true }, // promotional or contextual image
    relatedResource: {
      id: { type: mongoose.Schema.Types.ObjectId },
      model: { type: String, trim: true }, // e.g., 'Order', 'Product'
    },
    read: { type: Boolean, default: false },
    deliveryMethod: {
      type: [String],
      enum: ["push", "email", "sms"],
      default: ["push"],
    },
    priority: {
      type: String,
      enum: ["low", "normal", "high"],
      default: "normal",
    },
    scheduledAt: { type: Date },
    sentAt: { type: Date },
    expiresAt: { type: Date }, // auto-hide or remove notifications after expiry
    metadata: { type: Object }, // for additional structured data if needed
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

notificationSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Notification = mongoose.model("Notification", notificationSchema);
export default Notification;
