// /backend/seeders/seedPayments.js

import Payment from "../models/paymentSchema.js";
import Order from "../models/orderSchema.js";
import User from "../models/userSchema.js";

const seedPayments = async () => {
  try {
    console.log("🌱 Seeding Payments...");

    const orders = await Order.find().limit(5);
    const users = await User.find().limit(5);

    if (orders.length === 0 || users.length === 0) {
      console.log("⚠️ Orders or Users missing. Please seed them first.");
      return;
    }

    await Payment.deleteMany();

    const payments = orders.map((order, index) => ({
      user: order.user,
      order: order._id,
      paymentMethod: ["card", "upi", "netbanking", "cod"][index % 4],
      paymentStatus: "completed",
      amount: order.totalAmount,
      transactionId: `TXN-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      paymentGatewayResponse: {
        status: "success",
        gateway: "mockGateway",
      },
      refundedAmount: 0,
      refundStatus: "none",
      notes: "Auto-seeded payment for testing.",
    }));

    const inserted = await Payment.insertMany(payments);

    console.log(`✅ Seeded ${inserted.length} payments successfully.`);
    console.table(
      inserted.map((pmt, idx) => ({
        SNo: idx + 1,
        PaymentID: pmt._id.toString(),
        Order: pmt.order.toString(),
        Amount: pmt.amount,
        Method: pmt.paymentMethod,
        Status: pmt.paymentStatus,
      }))
    );
  } catch (error) {
    console.error("❌ Error seeding payments:", error);
  }
};

export default seedPayments;
