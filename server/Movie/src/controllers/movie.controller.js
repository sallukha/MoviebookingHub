 import Movie from "../model/Movie.model.js";
import ShowTime from "../model/ShowTime.model.js";
import Theatre from "../model/Theart.model.js";
import asyncHandler from "../utils/asyHandller.js";
import { uploadToCloudinary } from "../utils/multer.js";

export const addMovies = async (req, res) => {
  try {
    console.log("BODY =>", req.body);    // ✅ Debugging
    console.log("FILE =>", req.file);    // ✅ Debugging

    const { 
      title = "", 
      genre = "", 
      language = "", 
      duration = "", 
      description = "" 
    } = req.body || {};

    if (!title || !genre) {
      return res.status(400).json({
        success: false,
        message: "Title and Genre required",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Poster image is required",
      });
    }

    // ✅ Cloudinary Upload
    const uploaded = await uploadToCloudinary(req.file.buffer);

    if (!uploaded?.secure_url) {
      return res.status(500).json({
        success: false,
        message: "Cloudinary upload failed",
      });
    }

    const movie = await Movie.create({
      title,
      genre,
      language,
      duration,
      description,
      poster: uploaded.secure_url,
    });

    res.status(201).json({
      success: true,
      message: "Movie added successfully",
      data: movie,
    });

  } catch (error) {
    console.error("MOVIE UPLOAD ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

// ✅ GET MOVIES FIX
export const getMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find();   // ❌ Theatre -> ✅ Movie
  res.json({ success: true, data: movies });
});

// ✅ ADD THEATRE
export const addTheatre = asyncHandler(async (req, res) => {
  const theatre = await Theatre.create(req.body);
  res.json({ success: true, data: theatre });
});

// ✅ ADD SHOW
export const addShowTime = asyncHandler(async (req, res) => {
  const show = await ShowTime.create(req.body);
  res.json({ success: true, data: show });
});
