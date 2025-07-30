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
    imageUrl: {
      type: String,
      trim: true,
      default: null, // optional coupon image
    },
    discountType: {
      type: String,
      enum: ["percentage", "flat"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    maxDiscountAmount: { type: Number, default: null },
    minOrderAmount: { type: Number, default: 0 },

    usageLimit: { type: Number, default: null }, // total allowed uses
    usedCount: { type: Number, default: 0 }, // total usage counter

    usedBy: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        usedCount: {
          type: Number,
          default: 1,
        },
      },
    ],

    usersUsed: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // optional simplified record

    validFrom: { type: Date, required: true },
    validTill: { type: Date, required: true },

    isStackable: { type: Boolean, default: false }, // stackable with other coupons
    status: {
      type: String,
      enum: ["active", "expired", "inactive"],
      default: "active",
    },

    applicableProducts: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    ],
    applicableCategories: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ],
    applicableUserIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },

    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

// Soft delete auto expiry
couponSchema.pre("save", function (next) {
  if (this.deleted) {
    if (!this.deletedAt) {
      const oneMonthLater = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
      this.deletedAt = oneMonthLater;
    }
  } else {
    this.deletedAt = null;
  }
  next();
});

// Unique index on code
couponSchema.index({ code: 1 }, { unique: true });

const Coupon = mongoose.model("Coupon", couponSchema);
export default Coupon;
