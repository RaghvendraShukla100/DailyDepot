import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    storeName: { type: String, required: true, trim: true },
    storeDescription: { type: String, trim: true },
    logoUrl: { type: String, trim: true },
    bannerUrl: { type: String, trim: true }, // for store banner
    gstNumber: { type: String, trim: true },
    panNumber: { type: String, trim: true },
    documents: [
      {
        type: {
          type: String,
          enum: ["gst_certificate", "pan_card", "address_proof", "other"],
        },
        url: { type: String, trim: true },
        verified: { type: Boolean, default: false },
      },
    ],
    bankAccount: {
      accountHolderName: { type: String, trim: true },
      accountNumber: { type: String, trim: true },
      ifscCode: { type: String, trim: true },
      bankName: { type: String, trim: true },
      branchName: { type: String, trim: true },
      upiId: { type: String, trim: true }, // for faster payouts
    },
    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
    contactEmail: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
    supportContact: { type: String, trim: true },
    isVerified: { type: Boolean, default: false },
    verifiedAt: { type: Date },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    totalReviews: { type: Number, default: 0 },
    totalProducts: { type: Number, default: 0 },
    totalSales: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended"],
      default: "active",
    },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

sellerSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
