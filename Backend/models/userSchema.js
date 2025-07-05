import mongoose from "mongoose";
import bcrypt from "bcryptjs";

// User Schema for DailyDepot with comprehensive fields and soft delete handling
const userSchema = new mongoose.Schema(
  {
    name: {
      first: { type: String, required: true, trim: true },
      last: { type: String, required: true, trim: true },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    phone: { type: String, unique: true, sparse: true, trim: true },
    password: { type: String, required: true, select: false }, // Password excluded by default from queries for security
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
    const salt = await bcrypt.genSalt(12); // Using 12 rounds for enhanced security
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
