import mongoose from "mongoose";

const brandSchema = new mongoose.Schema(
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
    description: { type: String, trim: true },
    logo: {
      url: { type: String },
      public_id: { type: String },
    },
    website: { type: String, trim: true },
    isFeatured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ["active", "inactive", "deleted"],
      default: "active",
      index: true,
    },
    deleted: { type: Boolean, default: false, index: true },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// Compound indexes for frequent filters
brandSchema.index({ isFeatured: 1, status: 1 });
brandSchema.index({ deleted: 1, status: 1 });

// Clean JSON output for frontend
mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
