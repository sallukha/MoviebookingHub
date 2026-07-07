import express from "express";
import { register, login, createAdmin } from "../controller/user.js";

const router = express.Router();

 router.post("/create-admin", createAdmin);
router.post("/register", register);
router.post("/login", login);

export default router;
