// src/services/cloudinaryService.js
// Handles all image uploads to Cloudinary

const CLOUD_NAME = "dzqq5jcq7"; // Your Cloudinary cloud name
const UPLOAD_PRESET = "chattrix_uploads"; // The unsigned preset you created

export const uploadToCloudinary = async (file) => {
  if (!file) throw new Error("No file provided");

  // Validate file is an image
  if (!file.type.startsWith("image/")) {
    throw new Error("Only image files are allowed");
  }

  // Validate file size (max 5MB)
  const MAX_SIZE = 5 * 1024 * 1024; // 5MB
  if (file.size > MAX_SIZE) {
    throw new Error("File size must be less than 5MB");
  }

  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message || "Upload failed");
    }

    // Return the secure HTTPS URL
    return data.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

// Optional: Get optimized URL for different sizes
export const getOptimizedImageUrl = (url, width = 200) => {
  if (!url) return "";
  // Insert transformation params before /upload/
  return url.replace("/upload/", `/upload/w_${width},q_auto,f_auto/`);
};
