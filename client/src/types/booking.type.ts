export interface CreateBookingPayload {
  userId: string;
  movieId: string;
  showTime: string;
  seats: string[];
}

export interface BookingResponse {
  success: boolean;
  message: string;
  data: any;
}
