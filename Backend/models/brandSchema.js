import mongoose from "mongoose";
import slugify from "slugify";

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
    description: { type: String, trim: true, default: "" },
    logo: {
      url: { type: String, trim: true },
      public_id: { type: String, trim: true },
    },
    website: { type: String, trim: true, default: "" },
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
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// Auto-generate slug if not provided
brandSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// Ensure slug updates during findOneAndUpdate if name changes
brandSchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

// Clean JSON output for frontend
brandSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// Compound indexes for frequent filters
brandSchema.index({ isFeatured: 1, status: 1 });
brandSchema.index({ deleted: 1, status: 1 });

const Brand = mongoose.model("Brand", brandSchema);
export default Brand;
