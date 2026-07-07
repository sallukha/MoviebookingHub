import mongoose from "mongoose"
const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    movieId: {
      type: String,
      required: true
    },
    showTime: {
      type: String,
      required: true
    },
    seats: {
      type: [String],  
      required: true
    },
    status: {
      type: String,
      enum: ["booked", "cancelled"],
      default: "booked"
    }
  },
  { timestamps: true }
);
const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
