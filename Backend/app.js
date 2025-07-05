import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import compression from "compression";

import config from "./config/config.js"; // if using centralized config
import errorHandler from "./middlewares/errorHandler.js";
import notFound from "./middlewares/notFound.js";

// Import your routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import sellerRoutes from "./routes/sellerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
// import other routes as you build them

const app = express();

// 1️⃣ Security middlewares
app.use(helmet());
app.use(mongoSanitize());
app.use(xss());

// 2️⃣ Logging
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

// 5️⃣ Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 100, // limit each IP to 100 requests/15min
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// 6️⃣ Compression
app.use(compression());

// 7️⃣ Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/sellers", sellerRoutes);
app.use("/api/admins", adminRoutes);
// add other routes similarly

// 8️⃣ Health check
app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "Server is healthy." });
});

// 9️⃣ Not Found Handler
app.use(notFound);

// 🔟 Error Handler
app.use(errorHandler);

export default app;
