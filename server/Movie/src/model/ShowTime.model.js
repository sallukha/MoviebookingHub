 import mongoose from "mongoose";

const showSchema = new mongoose.Schema({
  movieId: { type: mongoose.Schema.Types.ObjectId, ref: "Movie" },
  theatreId: { type: mongoose.Schema.Types.ObjectId, ref: "Theatre" },
  time: String
});

export default mongoose.model("ShowTime", showSchema);
