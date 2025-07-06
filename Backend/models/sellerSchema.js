// /backend/models/sellerSchema.js

import mongoose from "mongoose";

// Basic regex patterns:
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;
const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/;
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;

const sellerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    storeName: {
      type: String,
      required: [true, "Store name is required."],
      trim: true,
    },
    storeDescription: { type: String, trim: true },
    logoUrl: { type: String, trim: true },
    bannerUrl: { type: String, trim: true }, // for store banner

    gstNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // allow empty
          return gstRegex.test(v);
        },
        message: "Invalid GST number format.",
      },
    },
    panNumber: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // allow empty
          return panRegex.test(v);
        },
        message: "Invalid PAN number format.",
      },
    },

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
      upiId: { type: String, trim: true },
    },

    address: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },

    contactEmail: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // allow empty
          return emailRegex.test(v);
        },
        message: "Invalid contact email format.",
      },
    },

    contactPhone: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return phoneRegex.test(v);
        },
        message: "Invalid contact phone format.",
      },
    },

    supportContact: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true;
          return phoneRegex.test(v);
        },
        message: "Invalid support contact phone format.",
      },
    },

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

// Handle soft delete timestamps
sellerSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  } else if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Seller = mongoose.model("Seller", sellerSchema);
export default Seller;
