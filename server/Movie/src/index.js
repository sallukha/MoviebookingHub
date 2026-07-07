import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/config.js";
import movieRoutes from "./routes/movie.routes.js";
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PATCH", "DELETE"]
}));
app.use((req, res, next) => {
  console.log("MOVIE ADD RECEIVED:", req.method, req.originalUrl);
  next();
});
 
app.use("/", movieRoutes);

 
app.use(express.json());
connectDB();
app.get("/", (req, res) => res.send("Movie Service running 🎬"));

app.listen(process.env.PORT || 6000, () =>
  console.log(`🎬 Movie Service running on port ${process.env.PORT}`)
);
