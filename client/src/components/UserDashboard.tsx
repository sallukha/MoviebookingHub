import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Calendar, MapPin, Clock, Ticket, X } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ImageWithFallback } from './figma/ImageWithFallback';
const MOCK_BOOKINGS = [
  {
    id: 'BK001',
    movie: {
      title: 'Inception',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=400',
      genre: 'Sci-Fi / Thriller'
    },
    date: '2025-11-21',
    showtime: '8:30 PM',
    seats: ['E5', 'E6'],
    theatre: 'PVR Cinemas, Mall Road',
    totalAmount: 740,
    status: 'confirmed',
    bookingDate: '2025-11-19'
  },
  {
    id: 'BK002',
    movie: {
      title: 'The Dark Knight',
      image: 'https://images.unsplash.com/photo-1761948245185-fc300ad20316?w=400',
      genre: 'Action / Crime'
    },
    date: '2025-11-25',
    showtime: '6:00 PM',
    seats: ['C7', 'C8', 'C9'],
    theatre: 'INOX Megaplex',
    totalAmount: 1110,
    status: 'confirmed',
    bookingDate: '2025-11-20'
  },
  {
    id: 'BK003',
    movie: {
      title: 'Interstellar',
      image: 'https://images.unsplash.com/photo-1590562177087-ca6af9bb82ea?w=400',
      genre: 'Sci-Fi / Adventure'
    },
    date: '2025-11-15',
    showtime: '5:30 PM',
    seats: ['F10', 'F11'],
    theatre: 'Cinepolis, City Center',
    totalAmount: 740,
    status: 'completed',
    bookingDate: '2025-11-13'
  }
];

export function UserDashboard({ user, onLogout, onNavigate, onCancelBooking, notifications }) {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  const handleCancelBooking = (bookingId) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      onCancelBooking(bookingId);
      setBookings(bookings.map(b =>
        b.id === bookingId ? { ...b, status: 'cancelled' } : b
      ));
    }
  };

  const upcomingBookings = bookings.filter(b => b.status === 'confirmed');
  const pastBookings = bookings.filter(b => b.status === 'completed');
  const cancelledBookings = bookings.filter(b => b.status === 'cancelled');

  return (
    <div className="flex min-h-screen">
      <Sidebar
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        notifications={notifications}
      />

      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-white text-3xl mb-2">My Bookings</h1>
          <p className="text-gray-300">Manage your movie tickets</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="upcoming" className="data-[state=active]:bg-purple-600">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="past" className="data-[state=active]:bg-purple-600">
              Past ({pastBookings.length})
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="data-[state=active]:bg-purple-600">
              Cancelled ({cancelledBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map(booking => (
                  <Card key={booking.id} className="bg-white/10 backdrop-blur-md border-white/20 p-6">
                    <div className="flex gap-6">
                      <ImageWithFallback
                        src={booking.movie.image}
                        alt={booking.movie.title}
                        className="w-32 h-48 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between mb-4">
                          <div>
                            <h3 className="text-white text-2xl mb-1">{booking.movie.title}</h3>
                            <p className="text-gray-300">{booking.movie.genre}</p>
                          </div>
                          <Badge className="bg-green-600 h-fit">Confirmed</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-5 h-5" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="w-5 h-5" />
                            <span>{booking.showtime}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <MapPin className="w-5 h-5" />
                            <span>{booking.theatre}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Ticket className="w-5 h-5" />
                            <span>Seats: {booking.seats.join(', ')}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/20">
                          <div>
                            <p className="text-gray-400 text-sm">Booking ID: {booking.id}</p>
                            <p className="text-white text-xl">Total: ₹{booking.totalAmount}</p>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              View Ticket
                            </Button>
                            <Button
                              variant="outline"
                              className="border-red-500 text-red-500 hover:bg-red-500/10"
                              onClick={() => handleCancelBooking(booking.id)}
                            >
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-12 text-center">
                <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-white text-xl mb-2">No Upcoming Bookings</p>
                <p className="text-gray-400 mb-6">Start booking your favorite movies now!</p>
                <Button
                  className="bg-purple-600 hover:bg-purple-700"
                  onClick={() => onNavigate('home')}
                >
                  Browse Movies
                </Button>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            {pastBookings.length > 0 ? (
              <div className="space-y-4">
                {pastBookings.map(booking => (
                  <Card key={booking.id} className="bg-white/10 backdrop-blur-md border-white/20 p-6">
                    <div className="flex gap-6">
                      <ImageWithFallback
                        src={booking.movie.image}
                        alt={booking.movie.title}
                        className="w-32 h-48 object-cover rounded-lg opacity-75"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between mb-4">
                          <div>
                            <h3 className="text-white text-2xl mb-1">{booking.movie.title}</h3>
                            <p className="text-gray-300">{booking.movie.genre}</p>
                          </div>
                          <Badge className="bg-gray-600 h-fit">Completed</Badge>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-gray-300">
                            <Calendar className="w-5 h-5" />
                            <span>{booking.date}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-300">
                            <Clock className="w-5 h-5" />
                            <span>{booking.showtime}</span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center pt-4 border-t border-white/20">
                          <p className="text-gray-400">Booking ID: {booking.id}</p>
                          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-12 text-center">
                <p className="text-gray-400">No past bookings</p>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="cancelled" className="mt-6">
            {cancelledBookings.length > 0 ? (
              <div className="space-y-4">
                {cancelledBookings.map(booking => (
                  <Card key={booking.id} className="bg-white/10 backdrop-blur-md border-white/20 p-6 opacity-75">
                    <div className="flex gap-6">
                      <ImageWithFallback
                        src={booking.movie.image}
                        alt={booking.movie.title}
                        className="w-32 h-48 object-cover rounded-lg"
                      />

                      <div className="flex-1">
                        <div className="flex justify-between mb-4">
                          <div>
                            <h3 className="text-white text-2xl mb-1">{booking.movie.title}</h3>
                            <p className="text-gray-300">{booking.movie.genre}</p>
                          </div>
                          <Badge className="bg-red-600 h-fit">Cancelled</Badge>
                        </div>

                        <p className="text-gray-400">Refund has been initiated</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-12 text-center">
                <p className="text-gray-400">No cancelled bookings</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
