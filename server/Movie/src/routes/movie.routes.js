import { addMovies, getMovies , addShowTime,addTheatre } from "../controllers/movie.controller.js";
import express from "express"
import { upload } from "../utils/multer.js";
const router=express.Router()
 router.post("/add", upload.single("poster"), addMovies);
router.get("/", getMovies);
router.post("/theatre", addTheatre);
router.post("/showtime", addShowTime);
export  default  router