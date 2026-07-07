 import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { MobileSidebar } from './MobileSidebar';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Search, Clock, Play } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';
import { getMovies } from '../components/api/movies.api';

export function HomePage({ user, onLogout, onMovieSelect, onNavigate, notifications }: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [movies, setMovies] = useState<any[]>([]);

  const navigate = useNavigate();

  const genres = ['all', 'Action', 'Sci-Fi', 'Horror', 'Romance', 'Comedy'];

  // ✅ Fetch Movies
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await getMovies();
        setMovies(res.data || []);
      } catch (err) {
        console.error("Movie fetch failed", err);
      }
    };
    fetchMovies();
  }, []);

  
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre =
      selectedGenre === 'all' ||
      movie.genre?.toLowerCase().includes(selectedGenre.toLowerCase());

    return matchesSearch && matchesGenre;
  });

  return (
    <div className="flex min-h-screen">
      <MobileSidebar user={user} onLogout={onLogout} notifications={notifications} />
      <Sidebar user={user} onLogout={onLogout} notifications={notifications} />
      
      <div className="flex-1 lg:ml-64 p-4 sm:p-6 lg:p-8">

        {/* Hero */}
        <div className="relative h-64 rounded-2xl overflow-hidden mb-8">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1739433437912-cca661ba902f?w=1200"
            alt="Cinema"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent flex items-center p-8">
            <div>
              <h1 className="text-white text-4xl mb-4">Welcome to Bookify Cinema</h1>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Play className="w-5 h-5 mr-2" />
                Explore Movies
              </Button>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="flex gap-4 mb-4 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/10 border-white/20 text-white"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {genres.map((genre) => (
              <Button
                key={genre}
                variant={selectedGenre === genre ? "default" : "outline"}
                onClick={() => setSelectedGenre(genre)}
                className={selectedGenre === genre ? "bg-purple-600" : "bg-white/10"}
              >
                {genre}
              </Button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMovies.map((movie) => (
            <Card 
              key={movie._id}
              className="bg-white/10 border-white/20 overflow-hidden hover:scale-105 transition-transform"
              onClick={() => onMovieSelect(movie)}
            >
              <div className="relative h-56">
                <ImageWithFallback
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-4">
                <h3 className="text-white text-xl mb-2">{movie.title}</h3>
                <p className="text-gray-400 text-sm mb-2">{movie.genre}</p>

                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-300 text-sm">{movie.duration}</span>
                  <Badge className="bg-purple-600/50 text-white">
                    {movie.language}
                  </Badge>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                  {movie.description}
                </p>

                {/* ✅ Book Now */}
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={(e: { stopPropagation: () => void; }) => {
                    e.stopPropagation();
                    onMovieSelect(movie);
                    navigate("/booking");
                  }}
                >
                  Book Now
                </Button>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </div>
  );
}
