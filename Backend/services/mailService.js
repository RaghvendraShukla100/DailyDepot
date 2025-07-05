import nodemailer from "nodemailer";
import { config } from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail", // or "outlook" if configured
  auth: {
    user: config.MAIL_USER,
    pass: config.MAIL_PASS,
  },
});

export const sendMail = async (to, subject, html) => {
  const mailOptions = {
    from: config.MAIL_USER,
    to,
    subject,
    html,
  };
  const info = await transporter.sendMail(mailOptions);
  return info;
};

// New function to send order confirmation emails
export const sendOrderConfirmationEmail = async (order) => {
  const to = order.userEmail; // Assuming order contains userEmail
  const subject = `Order Confirmation - Order #${order._id}`;

  // Simple HTML template for order confirmation — customize as needed
  const html = `
    <h1>Thank you for your order!</h1>
    <p>Hi ${order.userName},</p>
    <p>Your order <strong>#${order._id}</strong> has been successfully placed.</p>
    <p>Order total: $${order.totalAmount}</p>
    <p>We will notify you when your order is shipped.</p>
    <br/>
    <p>Best regards,<br/>DailyDepot Team</p>
  `;

  return sendMail(to, subject, html);
};
