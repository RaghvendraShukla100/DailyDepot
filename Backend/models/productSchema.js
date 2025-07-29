import mongoose from "mongoose";
import slugify from "slugify";
import crypto from "crypto";

// ------------------ Variant Schema ------------------
const variantSchema = new mongoose.Schema(
  {
    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    color: { type: String, trim: true },
    size: { type: String, trim: true },

    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, default: 0, min: 0, max: 100 },
    stock: { type: Number, required: true, min: 0 },
    sold: { type: Number, default: 0 },

    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, trim: true, default: "" },
      },
    ],
  },
  { _id: false, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// 🔁 Variant Virtual: Final price after discount
variantSchema.virtual("finalPrice").get(function () {
  return this.price - (this.price * this.discount) / 100;
});

// ------------------ Product Schema ------------------
const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true, index: true },

    slug: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
      index: true,
    },

    description: { type: String, required: true, trim: true },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
      index: true,
    },

    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
      index: true,
    },

    images: [
      {
        url: { type: String, required: true },
        alt: { type: String, trim: true, default: "" },
      },
    ],
    videos: [
      {
        url: { type: String },
        alt: { type: String, trim: true, default: "" },
      },
    ],

    variants: [variantSchema], // ✅ variants list

    colors: [{ type: String, trim: true }],
    sizes: [{ type: String, trim: true }],

    ratingsAverage: { type: Number, default: 0, min: 0, max: 5 },
    ratingsCount: { type: Number, default: 0 },

    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],

    tags: [{ type: String, trim: true }],

    weight: { type: Number, min: 0 },
    dimensions: {
      length: { type: Number, min: 0 },
      width: { type: Number, min: 0 },
      height: { type: Number, min: 0 },
    },

    meta: {
      title: { type: String, trim: true },
      description: { type: String, trim: true },
      keywords: [{ type: String, trim: true }],
    },

    isPublished: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },

    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// ------------------ MIDDLEWARE ------------------

// Soft delete handling
productSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

// Auto-generate slug and fallback SKU if missing
productSchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }

  if (!this.sku) {
    this.sku = crypto.randomBytes(6).toString("hex").toUpperCase(); // fallback SKU
  }

  next();
});

// Final price virtual (if applicable at product level)
productSchema.virtual("finalPrice").get(function () {
  return this.price - (this.price * this.discount) / 100;
});

// Clean JSON output
productSchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// ------------------ INDEXES ------------------
productSchema.index({ category: 1, price: 1 });
productSchema.index({ brand: 1, price: 1 });
productSchema.index({ tags: 1 });

// ------------------ Model ------------------
const Product = mongoose.model("Product", productSchema);
export default Product;
