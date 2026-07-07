 import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import cookieParser from "cookie-parser";
import gatewayRoutes from "./routes/gateway.routes.js";
dotenv.config();
const app = express();

// app.use(cookieParser());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"]
  })
);

// 🔥 FIRST → proxy (raw file forward)
app.use("/api/v1", gatewayRoutes);

// 🔥 JSON parser AFTER proxy
// app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Gateway Running 🚀");
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log("GATEWAY STARTED → PORT:", PORT);
});
