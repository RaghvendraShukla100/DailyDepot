import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    images: [{ url: String, public_id: String }],
    videos: [{ url: String, public_id: String }],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: { type: String, enum: ["visible", "hidden"], default: "visible" },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Soft delete handler
reviewSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

// Virtual for verified purchase
reviewSchema.virtual("verifiedPurchase").get(function () {
  return !!this.order;
});

// Ensure a user can review a product only once
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

const Review = mongoose.model("Review", reviewSchema);
export default Review;
