// /backend/config/cloudinary.js
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Define storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "DailyDepot", // optional folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4", "pdf"],
    resource_type: "auto",
  },
});

// Multer middleware
export const upload = multer({ storage });

// Export cloudinary instance if needed
export { cloudinary };
