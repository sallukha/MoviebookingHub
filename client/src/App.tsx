 import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";

import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { HomePage } from "./components/HomePage";
import { MovieDetails } from "./components/MovieDetails";
import { BookingPage } from "./components/BookingPage";
import { PaymentPage } from "./components/PaymentPage";
import { UserDashboard } from "./components/UserDashboard";
import { AdminPanel } from "./components/AdminPanel";

export default function App() {
  const [user, setUser] = useState<any>(null);
  const [selectedMovie, setSelectedMovie] = useState<any>(null);
  const [bookingData, setBookingData] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

  // Restore user from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleSignup = (userData: any) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Toaster position="top-right" />

        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage onNavigateToLogin={undefined} onNavigateToSignup={undefined} />} />

          <Route
            path="/login"
            element={<LoginPage onLogin={handleLogin} onSwitchToSignup={() => {}} />}
          />

          <Route
            path="/signup"
            element={<SignupPage onSwitchToLogin={() => {}} />}
          />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={
              user ? (
                <HomePage
                  user={user}
                  onLogout={handleLogout}
                  onMovieSelect={(movie) => setSelectedMovie(movie)}
                  onNavigate={() => {}}
                  notifications={notifications}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/movie/:id"
            element={
              selectedMovie ? (
                <MovieDetails
                  movie={selectedMovie}
                  user={user}
                  onBack={() => {}}
                  onBookNow={(movie) => setSelectedMovie(movie)}
                  onNavigate={() => {}}
                  onLogout={handleLogout}
                  notifications={notifications}
                />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            path="/booking"
            element={
              selectedMovie ? (
                <BookingPage
                  movie={selectedMovie}
                  user={user}
                  onBack={() => {}}
                  onProceedToPayment={(data) => setBookingData(data)}
                  onNavigate={() => {}}
                  onLogout={handleLogout}
                  notifications={notifications}
                />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            path="/payment"
            element={
              bookingData ? (
                <PaymentPage
                  bookingData={bookingData}
                  user={user}
                  onBack={() => {}}
                  onPaymentSuccess={() => {}}
                  onNavigate={() => {}}
                  onLogout={handleLogout}
                  notifications={notifications}
                />
              ) : (
                <Navigate to="/home" />
              )
            }
          />

          <Route
            path="/dashboard"
            element={
              user ? (
                <UserDashboard
                  user={user}
                  onLogout={handleLogout}
                  onNavigate={() => {}}
                  onCancelBooking={() => {}}
                  notifications={notifications}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route
            path="/admin"
            element={
              user?.role === "admin" ? (
                <AdminPanel
                  user={user}
                  onLogout={handleLogout}
                  onNavigate={() => {}}
                  notifications={notifications}
                />
              ) : (
                <Navigate to="/home" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
