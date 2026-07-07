import multer from "multer";
import cloudinary from "../config/cloundiry.js";
import streamifier from "streamifier";

/** Multer Storage → Memory (no disk temp files) */
const storage = multer.memoryStorage();

export const upload = multer({ storage });
/** Upload buffer to cloudinary */
export const uploadToCloudinary = async (fileBuffer) => {
  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(
      { folder: "movies" }, // Cloudinary folder
      (error, result) => {
        if (result) resolve(result);
        else reject(error);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(stream);
  });
};
