import Booking from "../model/Booking.model.js";
 import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/Apiresponse.js";
export const createBooking = asyncHandler(async (req, res, next) => {
    const { userId, movieId, showTime, seats } = req.body
    if (!userId || !movieId || !showTime || !seats) {
        return next (new ApiError(400, " all filled  are required"));
    }
    const booking = await Booking.create({
        userId,
        movieId,
        showTime,
        seats
    })
    return res
        .status(201)
        .json(new ApiResponse(201, "Booking created successfully", booking));

})
export const cancelBooking = asyncHandler(async (req, res, next) => {
    const {id} =req.params  

    const booking = await  Booking.findById(id)
    

    if (!booking) {
    return next(new ApiError(404, "Booking not found"));
  }

    booking.status = "cancelled";
    await booking.save();
  
    return res 
    .status(200)
    .json( new ApiResponse(200, "Booking cancelled", booking))
})
export const getBookings=asyncHandler( async(req,res,next)=>{
    const {userId}=req.params
    const booking = await  Booking.find({userId})
    return res 
    .status(200)
    .json( new ApiResponse(201 ,"User bookings fetched "  , booking))

})  


