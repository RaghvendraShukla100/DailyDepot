// backend/models/addressModel.js
import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    fullName: { type: String, required: true, trim: true },
    phone: {
      type: String,
      required: true,
      trim: true,
      match: /^[6-9]\d{9}$/,
    },
    email: {
      type: String,
      trim: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    addressLine1: { type: String, required: true, trim: true },
    addressLine2: { type: String, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, required: true, trim: true },
    country: { type: String, required: true, trim: true, default: "India" },
    postalCode: {
      type: String,
      required: true,
      trim: true,
      match: /^[1-9][0-9]{5}$/,
    },
    landmark: { type: String, trim: true },
    addressType: {
      type: String,
      enum: ["home", "work", "other"],
      default: "home",
    },
    isDefault: { type: Boolean, default: false },
    geoLocation: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number], // [longitude, latitude]
        required: true,
        validate: {
          validator: function (value) {
            return value.length === 2;
          },
          message: "Coordinates must be an array of [longitude, latitude]",
        },
      },
      accuracy: {
        type: Number,
        min: 0,
      },
    },
    notes: { type: String, trim: true },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    verificationTokenExpiry: { type: Date },
    tag: {
      type: String,
      enum: ["primary", "secondary", "billing", "shipping"],
      default: "shipping",
    },
    deleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
      index: {
        expireAfterSeconds: 2592000, // 30 days in seconds
        partialFilterExpression: { deleted: true }, // Only auto-delete if deleted is true
      },
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Indexes for optimized queries
addressSchema.index({ geoLocation: "2dsphere" });
addressSchema.index({ user: 1, isDefault: 1 });
addressSchema.index({ user: 1, deleted: 1 });

// Virtual field for combined address display
addressSchema.virtual("fullAddress").get(function () {
  return `${
    this.addressLine1
  }, ${this.addressLine2 ? this.addressLine2 + ", " : ""}${this.city}, ${this.state}, ${this.postalCode}, ${this.country}`;
});

// Soft delete handler
addressSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

// Static utility for soft delete
addressSchema.statics.softDelete = async function (id) {
  return this.findByIdAndUpdate(id, { deleted: true, deletedAt: new Date() });
};

const Address = mongoose.model("Address", addressSchema);
export default Address;
