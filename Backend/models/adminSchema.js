import mongoose from "mongoose";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\+?[0-9]{10,15}$/;

const adminSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    designation: {
      type: String,
      enum: ["superadmin", "admin", "support", "finance"],
      default: "support",
    },

    permissions: {
      type: [String],
      enum: [
        "manage_users",
        "manage_orders",
        "manage_products",
        "manage_admins",
        "manage_superadmin",
        "manage_support",
        "manage_payments",
        "manage_finance",
        "read_users",
        "read_orders",
        "read_products",
        "read_payments",
      ],

      default: ["manage_orders"],
    },

    contactEmail: {
      type: String,
      trim: true,
      match: [emailRegex, "Invalid contact email format."],
    },
    contactPhone: {
      type: String,
      trim: true,
      match: [phoneRegex, "Invalid contact phone format."],
    },
    profilePic: { type: String, trim: true },
    lastLoginAt: { type: Date },
    lastLoginIP: { type: String, trim: true },
    isActive: { type: Boolean, default: true },
    notes: { type: String, trim: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

adminSchema.pre("save", function (next) {
  this.deletedAt = this.deleted ? this.deletedAt || new Date() : null;
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
