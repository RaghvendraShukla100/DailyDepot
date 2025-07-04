import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "upi", "netbanking", "cod"],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending",
    },
    amount: { type: Number, required: true },
    transactionId: { type: String, unique: true },
    paymentGatewayResponse: { type: Object }, // store gateway payload for audit/debug
    refundedAmount: { type: Number, default: 0 },
    refundStatus: {
      type: String,
      enum: ["none", "requested", "processing", "completed"],
      default: "none",
    },
    notes: { type: String, trim: true },
    deleted: { type: Boolean, default: false },
    deletedAt: { type: Date, default: null, index: { expireAfterSeconds: 0 } },
  },
  { timestamps: true }
);

paymentSchema.pre("save", function (next) {
  if (this.deleted && !this.deletedAt) {
    this.deletedAt = new Date();
  }
  if (!this.deleted) {
    this.deletedAt = null;
  }
  next();
});

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
