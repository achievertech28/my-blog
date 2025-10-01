// import cloudinary from "../../config/cloudinaryConfig";
import cloudinary from "../config/cloudinaryConfig.js";
import fs from "fs";

class CloudinaryService {
  // Delete local file helper
  static async deleteLocalFile(filePath) {
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    } catch (error) {
      console.error("Error deleting local file:", error.message);
    }
  }

  // uploading profile picture (simlified)
  static async uploadProfilePicture(filePath, userId) {
    try {
      const uploadResult = await cloudinary.uploader.upload(filePath, {
        folder: "profilePictures",
        public_id: `profile_${userId}${Date.now()}`,
        // Basic optimization - cloudinary will handle the rest
        transformation: [
          { width: 500, height: 500, crop: "fill", gravity: "face" },
          { quality: "auto", fetch_format: "auto" },
        ],
        resource_type: "image",
      });

      // clean up local file
      this.deleteLocalFile(filePath);

      return {
        public_id: uploadResult.public_id,
        secure_url: uploadResult.secure_url,
      };
    } catch (error) {
      // clean up local file on error
      this.deleteLocalFile(filePath);
      throw error;
    }
  }

  //   delete image from cloudinary
  static async deleteImage(publicId) {
    try {
      const result = await cloudinary.uploader.destroy(publicId);
      return result.result === "ok";
    } catch (error) {
      console.error("Error deleting image from Cloudinary:", error.message);
      return false;
    }
  }
}

export default CloudinaryService;
