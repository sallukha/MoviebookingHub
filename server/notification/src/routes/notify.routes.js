import express from "express";
import { sendBookingEmail } from "../controllers/controller.js";

const router = express.Router();

router.post("/email", sendBookingEmail);

export default router;
