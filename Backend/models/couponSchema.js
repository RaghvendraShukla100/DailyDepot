import mongoose from "mongoose";

const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    description: { type: String, trim: true },
    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },
    discountValue: { type: Number, required: true },
    maxDiscountAmount: { type: Number },
    minOrderAmount: { type: Number },
    validFrom: { type: Date, required: true },
    validTill: { type: Date, required: true },
    usageLimit: { type: Number }, // total allowed uses
    usedCount: { type: Number, default: 0 },
    usersUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    applicableCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ], // restrict coupon to specific categories
    applicableProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ], // restrict coupon to specific products
    isStackable: { type: Boolean, default: false }, // allow stacking with other coupons if business allows
    status: {
      type: String,
      enum: ["active", "expired", "inactive"],
      default: "active",
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

couponSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
