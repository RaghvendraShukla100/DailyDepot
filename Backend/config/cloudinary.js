// /backend/config/cloudinary.js

import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Upload to Cloudinary
export const uploadToCloudinary = async (filePath, folder = "") => {
  return await cloudinary.uploader.upload(filePath, {
    folder,
    resource_type: "auto",
  });
};

// Delete from Cloudinary
export const deleteFromCloudinary = async (publicId) => {
  return await cloudinary.uploader.destroy(publicId);
};

// Optionally export the configured cloudinary instance if needed
export { cloudinary };
