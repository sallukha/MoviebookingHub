import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import notifyRoutes from "./routes/notify.routes.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
  console.log("NOTIFICATION:", req.method, req.originalUrl);
  next();
});
app.use("/", notifyRoutes);
app.get("/", (req, res) => {
  res.send("Notification Service Running 📩");
});
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`📩 Notification Service running on port ${PORT}`);
});

