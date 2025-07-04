import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Order" }, // optional linkage to order
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, trim: true },
    images: [{ url: String, public_id: String }], // user-uploaded images with the review
    videos: [{ url: String, public_id: String }], // user-uploaded videos with the review
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // users who liked the review
    status: { type: String, enum: ["visible", "hidden"], default: "visible" },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

reviewSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
