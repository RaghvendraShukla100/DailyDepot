import mongoose from "mongoose";

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
    permissions: [{ type: String }], // granular permission system if needed
    contactEmail: { type: String, trim: true },
    contactPhone: { type: String, trim: true },
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

adminSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;
