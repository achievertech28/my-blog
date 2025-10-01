import { Router } from "express";
import cloudinary from "../config/cloudinaryConfig.js";
import upload from "../middlware/multer.js";

const router = Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(req.file.path, {
        public_id: "profilePictures",
      })
      .catch((error) => {
        console.log(error);
        return res.status(500).json({
          success: false,
          message: "An Error has occured",
        });
      });

    console.log(uploadResult);
  } catch (error) {
    res.json({
      success: false,
      message: "could not upload you image",
    });
    next(error);
  }
});

export default router;
