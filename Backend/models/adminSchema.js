// /backend/models/adminSchema.js

import mongoose from "mongoose";

// Email regex for structure validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone regex for 10–15 digit phone numbers with optional +
const phoneRegex = /^\+?[0-9]{10,15}$/;

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "support", "finance"],
      default: "admin",
    },

    permissions: [{ type: String }], // extend for granular RBAC if needed

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

    profilePic: { type: String, trim: true },
    lastLoginAt: { type: Date },
    lastLoginIP: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    notes: { type: String, trim: true },

    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

// Handle soft delete timestamp management
adminSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  } else if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
