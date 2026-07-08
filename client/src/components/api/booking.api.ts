 import axios from "axios";

const api = axios.create({
  baseURL: "http://54.252.215.51:9000/api/v1",
});

// ✅ CREATE BOOKING
export const createBooking = async (data: any) => {
  const res = await api.post("/bookings/create", data);
  return res.data;
};

// ✅ GET OCCUPIED SEATS
export const getOccupiedSeats = async (
  movieId: string,
  showTime: string,
  date: string
) => {
  const res = await api.get(
    `/bookings/seats?movieId=${movieId}&showTime=${showTime}&date=${date}`
  );
  return res.data;
};
