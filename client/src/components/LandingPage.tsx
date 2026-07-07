 import { Button } from "./ui/button";
import {
  Film,
  Ticket,
  Star,
  Clock,
  MapPin,
  Sparkles,
  Play,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Link } from "react-router-dom";

type LandingPageProps = {
  onNavigateToLogin: () => void;
  onNavigateToSignup: () => void;
};

export function LandingPage({
  onNavigateToLogin,
  onNavigateToSignup,
}: LandingPageProps) {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <Film className="w-6 h-6 sm:w-8 sm:h-8 text-purple-400" />
              <h1 className="text-white text-lg sm:text-2xl">Bookify Cinema</h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Link to="/login">
                <Button
                  variant="ghost"
                  className="text-white hover:bg-white/10 text-sm sm:text-base px-3 sm:px-4"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-purple-600 hover:bg-purple-700 text-sm sm:text-base px-3 sm:px-4">
                  Sign Up
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="absolute inset-0 overflow-hidden">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1739433437912-cca661ba902f?w=1600"
            alt="Cinema"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-purple-900/50 to-slate-900"></div>
        </div>

        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-purple-600/20 border border-purple-400/30 rounded-full px-3 py-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 text-sm">
              Book Your Favorite Movies
            </span>
          </div>

          <h1 className="text-white text-5xl md:text-6xl lg:text-7xl mb-6">
            Experience Cinema
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
              Like Never Before
            </span>
          </h1>

          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-10">
            Book tickets instantly, choose your perfect seats, and enjoy the
            latest blockbusters
          </p>

          {/* <div className="flex flex-col sm:flex-row justify-center gap-4  gap-5 mt-24">
            <Button
              onClick={onNavigateToSignup}
              className="bg-purple-600 hover:bg-purple-700 px-8 py-6 text-lg"
            >
              Get Started
              <Play className="w-5 h-5 ml-2" />
            </Button>

            <Button
              variant="outline"
              onClick={onNavigateToLogin}
              className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
            >
              Explore Movies
            </Button>
          </div> */}
        </div>
      </section>

      {/* Footer */}
     {/* <footer className="py-10 border-t border-white/10">
  <div className="max-w-7xl mx-auto px-4 text-center">

    <div className="flex justify-center items-center gap-2 mb-2">
      <Film className="w-6 h-6 text-purple-400" />
      <span className="text-white text-xl font-semibold">
        Bookify Cinema
      </span>
    </div>

    <p className="text-gray-400 text-sm sm:text-base">
      © 2025 Bookify Cinema. All rights reserved.
    </p>

  </div>
</footer> */}

    </div>
  );
}
