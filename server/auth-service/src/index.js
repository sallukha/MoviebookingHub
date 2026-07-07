import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import errorMiddleware from "./utils/errorMiddleware.js";
import authRoutes from "./routes/auth.routes.js";
import connectDB from "./db/config.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
  console.log("AUTH-HIT:", req.method, req.originalUrl);
  next();
});

connectDB();

// THIS IS PERFECT AND REQUIRED
app.use("/", authRoutes);

app.use(errorMiddleware);

const port = process.env.PORT || 4000;


app.listen(port, () =>
  console.log(`Auth Service running on port ${port}`)
);
