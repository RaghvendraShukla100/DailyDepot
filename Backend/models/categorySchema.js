import mongoose from "mongoose";
import slugify from "slugify";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true, // ✅ यूनिक इंडेक्स
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true, // ✅ यूनिक इंडेक्स
      lowercase: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    parentCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      default: null,
    },
    image: {
      url: { type: String, trim: true },
      alt: { type: String, trim: true, default: "" },
      public_id: { type: String, trim: true },
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
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    autoIndex: true, // ✅ development में यूनिक इंडेक्स बनने के लिए जरूरी
  }
);

// 🔧 Auto-generate slug from name
categorySchema.pre("validate", function (next) {
  if (!this.slug && this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

// 🔄 Update slug if name changes via findOneAndUpdate
categorySchema.pre("findOneAndUpdate", async function (next) {
  const update = this.getUpdate();
  if (update.name) {
    update.slug = slugify(update.name, { lower: true, strict: true });
    this.setUpdate(update);
  }
  next();
});

// 🧹 Clean JSON output
categorySchema.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform: (_doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
  },
});

// 📈 Compound indexes
categorySchema.index({ isFeatured: 1, isPublished: 1 });
categorySchema.index({ status: 1, deleted: 1 });

// 📦 Model init to force index creation
const Category = mongoose.model("Category", categorySchema);

// 🛠️ Force index creation on app start (can be awaited in your app.js or db.js)
Category.init().catch((err) => {
  console.error("❌ Index creation failed:", err.message);
});

export default Category;
