// /backend/validations/envValidation.js

import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

// For ESM __dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from ../.env
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const envSchema = z.object({
  PORT: z.string().optional().default("5000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),

  MONGO_URI: z
    .string()
    .url({ message: "MONGO_URI must be a valid MongoDB URI" }),

  JWT_SECRET: z.string(),
  JWT_EXPIRE: z.string().optional().default("7d"),

  CLOUDINARY_CLOUD_NAME: z.string(),
  CLOUDINARY_API_KEY: z.string(),
  CLOUDINARY_API_SECRET: z.string(),

  SMTP_HOST: z.string(),
  SMTP_PORT: z.coerce.number().default(587),
  SMTP_USER: z.string(),
  SMTP_PASS: z.string(),
  FROM_EMAIL: z.string().email(),

  SUPERADMIN_EMAIL: z.string().email(),
  SUPERADMIN_PHONE: z.string(),
  SUPERADMIN_PASSWORD: z.string(),
});

// Parse and validate
const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error(
    "❌ Invalid or missing environment variables:\n",
    parsed.error.format()
  );
  process.exit(1);
}

export const env = parsed.data;
