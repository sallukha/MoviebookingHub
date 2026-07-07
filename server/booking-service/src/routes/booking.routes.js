import express from "express"
import {getBookings,cancelBooking,createBooking}  from "../controller/booking.controller.js"


const router=express.Router();


router.post("/create", createBooking);
router.patch("/cancel/:id", cancelBooking);
router.get("/user/:userId", getBookings);

export  default router