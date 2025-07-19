import mongoose from 'mongoose';

// Analytics Schema for tracking user behavior, soft delete enabled
const analyticsSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    sessionId: { type: String, index: true },
    eventType: {
      type: String,
      enum: [
        'page_view',
        'product_view',
        'add_to_cart',
        'purchase',
        'wishlist_add',
        'search',
        'login',
        'signup',
        'click',
        'scroll',
      ],
      required: true,
    },
    eventData: { type: Object }, // Flexible structure for additional event-related data
    device: {
      type: String,
      enum: ['mobile', 'desktop', 'tablet'],
      default: 'mobile',
    },
    browser: { type: String },
    os: { type: String },
    country: { type: String },
    city: { type: String },
    ipAddress: { type: String },
    userAgent: { type: String },
    referrer: { type: String },
    timestamp: { type: Date, default: Date.now },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Soft delete handler before saving
analyticsSchema.pre('save', function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  } else if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
export default Analytics;
