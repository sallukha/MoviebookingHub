 import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: String,
  genre: String,
  language: String,
  poster: String, // image URL
  duration: Number,
  description: String
}, { timestamps: true });

export default mongoose.model("Movie", movieSchema);
