import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Star, Clock, Calendar, ArrowLeft, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { ReactNode } from 'react';

 export function MovieDetails({ movie, user, onBack, onBookNow, onNavigate, onLogout, notifications }: { movie: any; user?: any; onBack?: () => void; onBookNow?: (movie: any) => void; onNavigate?: (path: string) => void; onLogout?: () => void; notifications?: any[] }) {

  // Safety check
  if (!movie) {
    return (
      <div className="flex min-h-screen items-center justify-center text-white">
        Movie not found ❌
      </div>
    );
  }

  const shows = movie.shows || [];

  return (
    <div className="flex min-h-screen">
      <MobileSidebar 
        user={user} 
        onLogout={onLogout || (() => {})}
        notifications={notifications}
      />

      <Sidebar 
        user={user} 
        onLogout={onLogout || (() => {})}
        notifications={notifications}
      />
      
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">

        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-4 sm:mb-6 text-white hover:bg-white/20"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
          Back to Movies
        </Button>

        {/* Movie Hero */}
        <div className="relative h-64 sm:h-80 lg:h-96 rounded-2xl overflow-hidden mb-6 sm:mb-8">
          <ImageWithFallback
            src={movie.image}
            alt={movie.title}
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8">
            <h1 className="text-white text-3xl sm:text-4xl lg:text-5xl mb-3 sm:mb-4">
              {movie.title || "Untitled Movie"}
            </h1>

            <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-3 sm:mb-4">

              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400 fill-yellow-400" />
                <span className="text-white text-lg sm:text-xl">
                  {movie.rating || "N/A"}/10
                </span>
              </div>

              <div className="flex items-center gap-1 text-gray-300 text-sm sm:text-base">
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{movie.duration || "N/A"}</span>
              </div>

              <Badge className="bg-purple-600 text-sm sm:text-base">
                {movie.language || "N/A"}
              </Badge>

            </div>

            <p className="text-gray-300 text-base sm:text-lg">
              {movie.genre || "N/A"}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">

          {/* Movie Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6">

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6">
              <h2 className="text-white text-xl sm:text-2xl mb-3 sm:mb-4">
                About the Movie
              </h2>

              <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
                {movie.description || "No description available."}
              </p>
            </Card>

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6">
              <h2 className="text-white text-xl sm:text-2xl mb-3 sm:mb-4">
                Cast & Crew
              </h2>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <Info label="Director" value="Christopher Nolan" />
                <Info label="Producer" value="Emma Thomas" />
                <Info label="Lead Actor" value="Leonardo DiCaprio" />
                <Info label="Lead Actress" value="Marion Cotillard" />
              </div>
            </Card>

          </div>

          {/* Showtimes */}
          <div>
            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-4 sm:p-6 lg:sticky lg:top-8">
              <h2 className="text-white text-xl sm:text-2xl mb-3 sm:mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                Select Showtime
              </h2>

              <p className="text-gray-300 text-sm sm:text-base mb-3 sm:mb-4">
                Today
              </p>

              <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                {shows.length > 0 ? (
                  shows.map((time: any, index: any) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full bg-white/5 border-white/20 text-white hover:bg-purple-600 hover:border-purple-600 text-sm sm:text-base h-10 sm:h-11"
                    >
                      {time}
                    </Button>
                  ))
                ) : (
                  <p className="text-gray-400 text-sm">
                    No shows available ❌
                  </p>
                )}
              </div>

              <Button 
                className="w-full bg-purple-600 hover:bg-purple-700 h-10 sm:h-11"
                onClick={() => onBookNow?.(movie)}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Book Tickets
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
function Info({ label, value }: { label: string; value?: ReactNode }) {
  return (
    <div>
      <p className="text-gray-400 text-xs sm:text-sm">{label}</p>
      <p className="text-white text-sm sm:text-base">{value}</p>
    </div>
  );
}

