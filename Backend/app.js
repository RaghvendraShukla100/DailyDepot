import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import compression from "compression";

import config from "./config/config.js"; // centralized config

// Your middlewares
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// Import other routes progressively

const app = express();

// 1️⃣ Security headers and sanitization
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

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
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// 5️⃣ Compression
app.use(compression());

// 6️⃣ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/admins", adminRoutes);
// Add additional modular routes as you build them

// 7️⃣ Health Check Endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy 🚀" });
});

// 8️⃣ Not Found Handler
app.use(notFound);

// 9️⃣ Global Error Handler
app.use(errorHandler);

export default app;
