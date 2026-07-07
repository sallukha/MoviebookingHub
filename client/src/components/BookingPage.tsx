 import { useState, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ArrowLeft, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import {
  createBooking,
  getOccupiedSeats,
} from "../components/api/booking.api";

const SEAT_LAYOUT = [
  { row: "A", seats: 10, price: 200 },
  { row: "B", seats: 10, price: 200 },
  { row: "C", seats: 12, price: 250 },
  { row: "D", seats: 12, price: 250 },
  { row: "E", seats: 12, price: 300 },
  { row: "F", seats: 12, price: 300 },
  { row: "G", seats: 14, price: 350 },
  { row: "H", seats: 14, price: 350 },
];

export function BookingPage({
  movie,
  user,
  onNavigate,
  onLogout,
  notifications,
}: any) {
  const navigate = useNavigate();

  const [selectedSeats, setSelectedSeats] = useState<any[]>([]);
  const [selectedShowtime, setSelectedShowtime] = useState("");
  const [selectedDate, setSelectedDate] = useState("2025-11-21");
  const [occupiedSeats, setOccupiedSeats] = useState<string[]>([]);

  useEffect(() => {
    if (movie?.shows?.length > 0) {
      setSelectedShowtime(movie.shows[0]);
    }
  }, [movie]);

  // 🔥 Fetch occupied seats from backend
  useEffect(() => {
    if (!movie?._id || !selectedShowtime) return;

    const fetchSeats = async () => {
      try {
        const res = await getOccupiedSeats(
          movie._id,
          selectedShowtime,
          selectedDate
        );
        setOccupiedSeats(res.data || []);
      } catch (err) {
        console.error("Seat fetch failed", err);
      }
    };

    fetchSeats();
  }, [movie, selectedShowtime, selectedDate]);

  if (!movie) {
    return <div className="text-white p-10">Movie Not Found ❌</div>;
  }

  const toggleSeat = (seatId: string, price: number) => {
    if (occupiedSeats.includes(seatId)) {
      toast.error("This seat is already booked");
      return;
    }

    setSelectedSeats((prev) => {
      const exists = prev.find((s) => s.id === seatId);
      if (exists) {
        return prev.filter((s) => s.id !== seatId);
      }
      return [...prev, { id: seatId, price }];
    });
  };

  const getSeatStatus = (seatId: string) => {
    if (occupiedSeats.includes(seatId)) return "occupied";
    if (selectedSeats.find((s) => s.id === seatId)) return "selected";
    return "available";
  };

  const totalPrice = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);

  const handleBack = () => {
    navigate(-1);
  };

  // 🔥 Booking API
  const handleProceed = async () => {
  if (selectedSeats.length === 0) {
    toast.error("Please select at least one seat");
    return;
  }

  const bookingPayload = {
    userId: user?._id,
    movie: {
      _id: movie._id,
      title: movie.title,
    },
    showtime: selectedShowtime,
    date: selectedDate,
    seats: selectedSeats,
    totalPrice: selectedSeats.reduce(
      (sum, seat) => sum + seat.price,
      0
    ),
  };

  // 🔥 SAVE FOR PAYMENT PAGE
  localStorage.setItem(
    "bookingData",
    JSON.stringify(bookingPayload)
  );

  navigate("/payment");
};
  return (
    <div className="flex min-h-screen">
      <Sidebar
        user={user}
        onLogout={onLogout}
        notifications={notifications}
      />

      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">

        <Button
          variant="ghost"
          onClick={handleBack}
          className="mb-6 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </Button>

        <h1 className="text-white text-3xl mb-2">{movie.title}</h1>
        <p className="text-gray-300 mb-6">{movie.genre}</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* 🎟 Seat Picker */}
          <div className="lg:col-span-2">
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6">

              {/* Show/date selection */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <select
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  <option value="2025-11-21">Today</option>
                  <option value="2025-11-22">Tomorrow</option>
                </select>

                <select
                  value={selectedShowtime}
                  onChange={(e) => setSelectedShowtime(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                >
                  {movie.shows?.map((time: string) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>

              {/* SEATS — FULLY RESPONSIVE */}
              <div className="space-y-3 overflow-x-auto whitespace-nowrap pb-3">
                {SEAT_LAYOUT.map((row) => (
                  <div
                    key={row.row}
                    className="flex items-center gap-2 min-w-max"
                  >
                    <span className="text-white w-8">{row.row}</span>
                    <div className="flex gap-2">
                      {Array.from({ length: row.seats }, (_, i) => {
                        const seatId = `${row.row}${i + 1}`;
                        const status = getSeatStatus(seatId);

                        return (
                          <button
                            key={seatId}
                            onClick={() => toggleSeat(seatId, row.price)}
                            disabled={status === "occupied"}
                            className={`w-8 h-8 rounded-t-lg ${
                              status === "available"
                                ? "bg-gray-600 hover:bg-purple-600"
                                : status === "selected"
                                ? "bg-purple-600"
                                : "bg-red-900 cursor-not-allowed"
                            }`}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Summary card */}
          <div>
            <Card className="bg-white/10 border-white/20 p-6 sticky top-8">
              <h2 className="text-white text-2xl mb-6">Booking Summary</h2>

              <p className="text-white">{movie.title}</p>
              <p className="text-gray-300">
                {selectedDate} | {selectedShowtime}
              </p>

              <div className="my-4 flex flex-wrap gap-2">
                {selectedSeats.map((seat) => (
                  <Badge key={seat.id} className="bg-purple-600">
                    {seat.id}
                  </Badge>
                ))}
              </div>

              <div className="border-t border-white/20 pt-4">
                <div className="flex justify-between text-white">
                  <span>Total</span>
                  <span>
                    ₹{totalPrice + selectedSeats.length * 20}
                  </span>
                </div>
              </div>

              <Button
                className="w-full bg-purple-600 mt-4"
                onClick={handleProceed}
              >
                <CreditCard className="w-5 h-5 mr-2" />
                Proceed to Payment
              </Button>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}
