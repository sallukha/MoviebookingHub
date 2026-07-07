import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bookingRoutes from "./routes/booking.routes.js";
import connectDB from "./db/config.js";
import errorMiddleware from "./middlewares/errorMiddleware.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
connectDB();
// ⭐ 1) PUT LOGGER HERE (before routes)
app.use((req, res, next) => {
  console.log("BOOKING SERVICE RECEIVED:", req.method, req.originalUrl);
  next();
});
// ⭐ 2) MOUNT ROUTES
app.use("/", bookingRoutes);

// ⭐ 3) ERROR HANDLER
app.use(errorMiddleware);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(`Booking Service running on port ${port}`)
);
