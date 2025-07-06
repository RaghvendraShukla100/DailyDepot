// /backend/models/userSchema.js

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// Email regex for basic structure validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone regex (10-digit Indian mobile + general support)
const phoneRegex = /^\+?[0-9]{10,15}$/;

// Password regex: min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special character
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&^_-])[A-Za-z\d@$!%*?#&^_-]{8,}$/;

const userSchema = new mongoose.Schema(
  {
    name: {
      first: {
        type: String,
        required: [true, "First name is required."],
        trim: true,
      },
      last: {
        type: String,
        required: [true, "Last name is required."],
        trim: true,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return emailRegex.test(v);
        },
        message: "Please enter a valid email address.",
      },
    },
    phone: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      validate: {
        validator: function (v) {
          if (!v) return true; // allow empty if not provided
          return phoneRegex.test(v);
        },
        message: "Please enter a valid phone number.",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required."],
      select: false,
      validate: {
        validator: function (v) {
          return passwordRegex.test(v);
        },
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
      },
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    dob: { type: Date },
    profilePic: { type: String, trim: true },
    bio: { type: String, trim: true },
    addresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Wishlist" }],
    cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "CartItem" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
    role: { type: String, enum: ["user", "seller", "admin"], default: "user" },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "blocked", "deleted"],
      default: "active",
    },
    lastLoginAt: { type: Date },
    lastLoginIP: { type: String },
    loginCount: { type: Number, default: 0 },
    deviceTokens: [{ type: String }],
    preferences: {
      theme: { type: String, enum: ["light", "dark"], default: "light" },
      language: { type: String, default: "en" },
    },
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
    emailVerificationToken: { type: String },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
    isSubscribedToNewsletter: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Hash password before saving if modified
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
  }
  // Handle soft delete timestamp
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  } else if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

// Compare entered password with stored hash
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Virtual field for user's full name
userSchema.virtual("fullName").get(function () {
  return `${this.name.first} ${this.name.last}`;
});

const User = mongoose.model("User", userSchema);
export default User;
