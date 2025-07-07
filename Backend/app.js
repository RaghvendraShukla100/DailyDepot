import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import compression from "compression";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { config } from "./config/config.js";

// Middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import addressRoutes from "./routes/addressRoutes.js";
import brandRoutes from "./routes/brandRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

// ✅ Correctly define __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

// 1️⃣ Security headers and sanitization
app.use(helmet());

// ✅ Serve uploads correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// 2️⃣ Logging for development
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// 3️⃣ Enable CORS
app.use(
  cors({
    origin: config.CLIENT_URL || "*",
    credentials: true,
  })
);

// 4️⃣ Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(cookieParser());

// 5️⃣ Compression
app.use(compression());

// 6️⃣ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/addresses", addressRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlists", wishlistRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/categories", categoryRoutes);

// 7️⃣ Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy 🚀" });
});

// 8️⃣ Not Found Handler
app.use(notFound);

// 9️⃣ Global Error Handler
app.use(errorHandler);

export default app;
