// /backend/models/categorySchema.js

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null, // Enables nested categories if needed
    },
    image: {
      url: { type: String, trim: true },
      alt: { type: String, trim: true, default: "" },
      public_id: { type: String, trim: true }, // If using Cloudinary/S3
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true,
    },
    isPublished: {
      type: Boolean,
      default: true,
      index: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
      index: true,
    },
    deleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// Auto-generate slug from name if not provided (optional helper)
categorySchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = this.name.toLowerCase().replace(/[\s]+/g, "-");
  }
  next();
});

// Compound indexes for efficient filtering and sorting
categorySchema.index({ isFeatured: 1, isPublished: 1 });
categorySchema.index({ status: 1, deleted: 1 });

const Category = mongoose.model("Category", categorySchema);
export default Category;
