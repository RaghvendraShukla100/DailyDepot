import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true, default: "" },
    images: [
      {
        url: { type: String, trim: true },
        public_id: { type: String, trim: true },
      },
    ],
    videos: [
      {
        url: { type: String, trim: true },
        public_id: { type: String, trim: true },
      },
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    status: {
      type: String,
      enum: ["visible", "hidden"],
      default: "visible",
      index: true,
    },
    deleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Soft delete handling
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

// Ensure one user can only review a product once
reviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Clean JSON output for frontend
reviewSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
