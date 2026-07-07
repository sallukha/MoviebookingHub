import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Edit, Trash, Film, Building2, Clock } from 'lucide-react';
import { toast } from 'sonner';

type AdminPanelProps = {
  user: { token?: string; [key: string]: any };
  onLogout: () => void;
  onNavigate: (path: string) => void;
  notifications?: any;
};

export function AdminPanel({ user, onLogout, onNavigate, notifications }: AdminPanelProps) {
  const [showAddMovie, setShowAddMovie] = useState(false);
  const [showAddTheatre, setShowAddTheatre] = useState(false);
  const [showAddShowtime, setShowAddShowtime] = useState(false);

  const [movieForm, setMovieForm] = useState({
    title: '',
    genre: '',
    duration: '',
    language: '',
    rating: '',
    description: '',
    imageUrl: ''
  });

  const [theatreForm, setTheatreForm] = useState({
    name: '',
    location: '',
    capacity: '',
    screens: ''
  });

  const [showtimeForm, setShowtimeForm] = useState({
    movieId: '',
    theatreId: '',
    date: '',
    time: '',
    price: ''
  });

  const handleAddMovie = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // API call to add movie
    // const response = await fetch('YOUR_API/movies', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${user.token}`
    //   },
    //   body: JSON.stringify(movieForm)
    // });
    
    toast.success('Movie added successfully!');
    setShowAddMovie(false);
    setMovieForm({
      title: '',
      genre: '',
      duration: '',
      language: '',
      rating: '',
      description: '',
      imageUrl: ''
    });
  };

  const handleAddTheatre = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // API call to add theatre
    // const response = await fetch('YOUR_API/theatres', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${user.token}`
    //   },
    //   body: JSON.stringify(theatreForm)
    // });
    
    toast.success('Theatre added successfully!');
    setShowAddTheatre(false);
    setTheatreForm({
      name: '',
      location: '',
      capacity: '',
      screens: ''
    });
  };

  const handleAddShowtime = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    // API call to add showtime
    // const response = await fetch('YOUR_API/showtimes', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${user.token}`
    //   },
    //   body: JSON.stringify(showtimeForm)
    // });
    
    toast.success('Showtime added successfully!');
    setShowAddShowtime(false);
    setShowtimeForm({
      movieId: '',
      theatreId: '',
      date: '',
      time: '',
      price: ''
    });
  };

  return (
    <div className="flex min-h-screen">
      {(() => {
        // cast Sidebar to any so we can pass onNavigate without changing Sidebar's props type
        const SidebarAny = Sidebar as any;
        return (
          <SidebarAny
            user={user as any}
            onNavigate={onNavigate}
            onLogout={onLogout}
            notifications={notifications}
          />
        );
      })()}
      
      <div className="flex-1 ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-white text-3xl mb-2">Admin Panel</h1>
          <p className="text-gray-300">Manage movies, theatres, and showtimes</p>
        </div>

        <Tabs defaultValue="movies" className="w-full">
          <TabsList className="bg-white/10 border-white/20">
            <TabsTrigger value="movies" className="data-[state=active]:bg-purple-600">
              <Film className="w-4 h-4 mr-2" />
              Movies
            </TabsTrigger>
            <TabsTrigger value="theatres" className="data-[state=active]:bg-purple-600">
              <Building2 className="w-4 h-4 mr-2" />
              Theatres
            </TabsTrigger>
            <TabsTrigger value="showtimes" className="data-[state=active]:bg-purple-600">
              <Clock className="w-4 h-4 mr-2" />
              Showtimes
            </TabsTrigger>
          </TabsList>

          {/* Movies Tab */}
          <TabsContent value="movies" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl">Manage Movies</h2>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAddMovie(!showAddMovie)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Movie
              </Button>
            </div>

            {showAddMovie && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 mb-6">
                <h3 className="text-white text-xl mb-4">Add New Movie</h3>
                <form onSubmit={handleAddMovie} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="title" className="text-white">Movie Title</Label>
                      <Input
                        id="title"
                        value={movieForm.title}
                        onChange={(e) => setMovieForm({...movieForm, title: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="genre" className="text-white">Genre</Label>
                      <Input
                        id="genre"
                        value={movieForm.genre}
                        onChange={(e) => setMovieForm({...movieForm, genre: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="duration" className="text-white">Duration (min)</Label>
                      <Input
                        id="duration"
                        type="number"
                        value={movieForm.duration}
                        onChange={(e) => setMovieForm({...movieForm, duration: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="language" className="text-white">Language</Label>
                      <Input
                        id="language"
                        value={movieForm.language}
                        onChange={(e) => setMovieForm({...movieForm, language: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="rating" className="text-white">Rating (0-10)</Label>
                      <Input
                        id="rating"
                        type="number"
                        step="0.1"
                        value={movieForm.rating}
                        onChange={(e) => setMovieForm({...movieForm, rating: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="imageUrl" className="text-white">Image URL</Label>
                      <Input
                        id="imageUrl"
                        value={movieForm.imageUrl}
                        onChange={(e) => setMovieForm({...movieForm, imageUrl: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="description" className="text-white">Description</Label>
                    <Textarea
                      id="description"
                      value={movieForm.description}
                      onChange={(e) => setMovieForm({...movieForm, description: e.target.value})}
                      required
                      className="bg-white/10 border-white/20 text-white"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Add Movie
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowAddMovie(false)}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white text-lg">Movie Title {i}</h4>
                      <p className="text-gray-400 text-sm">Genre | Duration | Language</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="text-blue-400 hover:bg-white/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="text-red-400 hover:bg-white/10">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Theatres Tab */}
          <TabsContent value="theatres" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl">Manage Theatres</h2>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAddTheatre(!showAddTheatre)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Theatre
              </Button>
            </div>

            {showAddTheatre && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 mb-6">
                <h3 className="text-white text-xl mb-4">Add New Theatre</h3>
                <form onSubmit={handleAddTheatre} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="theatreName" className="text-white">Theatre Name</Label>
                      <Input
                        id="theatreName"
                        value={theatreForm.name}
                        onChange={(e) => setTheatreForm({...theatreForm, name: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="location" className="text-white">Location</Label>
                      <Input
                        id="location"
                        value={theatreForm.location}
                        onChange={(e) => setTheatreForm({...theatreForm, location: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="capacity" className="text-white">Total Capacity</Label>
                      <Input
                        id="capacity"
                        type="number"
                        value={theatreForm.capacity}
                        onChange={(e) => setTheatreForm({...theatreForm, capacity: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="screens" className="text-white">Number of Screens</Label>
                      <Input
                        id="screens"
                        type="number"
                        value={theatreForm.screens}
                        onChange={(e) => setTheatreForm({...theatreForm, screens: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Add Theatre
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowAddTheatre(false)}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="space-y-4">
                {['PVR Cinemas', 'INOX Megaplex', 'Cinepolis'].map((theatre, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white text-lg">{theatre}</h4>
                      <p className="text-gray-400 text-sm">Location | Capacity: 500 | Screens: 5</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="text-blue-400 hover:bg-white/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="text-red-400 hover:bg-white/10">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* Showtimes Tab */}
          <TabsContent value="showtimes" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-white text-2xl">Manage Showtimes</h2>
              <Button 
                className="bg-purple-600 hover:bg-purple-700"
                onClick={() => setShowAddShowtime(!showAddShowtime)}
              >
                <Plus className="w-5 h-5 mr-2" />
                Add Showtime
              </Button>
            </div>

            {showAddShowtime && (
              <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6 mb-6">
                <h3 className="text-white text-xl mb-4">Add New Showtime</h3>
                <form onSubmit={handleAddShowtime} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="movieId" className="text-white">Movie</Label>
                      <select
                        id="movieId"
                        value={showtimeForm.movieId}
                        onChange={(e) => setShowtimeForm({...showtimeForm, movieId: e.target.value})}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Select Movie</option>
                        <option value="1">Inception</option>
                        <option value="2">The Dark Knight</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="theatreId" className="text-white">Theatre</Label>
                      <select
                        id="theatreId"
                        value={showtimeForm.theatreId}
                        onChange={(e) => setShowtimeForm({...showtimeForm, theatreId: e.target.value})}
                        required
                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white"
                      >
                        <option value="">Select Theatre</option>
                        <option value="1">PVR Cinemas</option>
                        <option value="2">INOX Megaplex</option>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="date" className="text-white">Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={showtimeForm.date}
                        onChange={(e) => setShowtimeForm({...showtimeForm, date: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="time" className="text-white">Time</Label>
                      <Input
                        id="time"
                        type="time"
                        value={showtimeForm.time}
                        onChange={(e) => setShowtimeForm({...showtimeForm, time: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="price" className="text-white">Ticket Price (₹)</Label>
                      <Input
                        id="price"
                        type="number"
                        value={showtimeForm.price}
                        onChange={(e) => setShowtimeForm({...showtimeForm, price: e.target.value})}
                        required
                        className="bg-white/10 border-white/20 text-white"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
                      Add Showtime
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setShowAddShowtime(false)}
                      className="border-white/20 text-white"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <Card className="bg-white/10 backdrop-blur-md border-white/20 p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
                    <div>
                      <h4 className="text-white text-lg">Inception - PVR Cinemas</h4>
                      <p className="text-gray-400 text-sm">Nov 21, 2025 | 8:30 PM | ₹300</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="text-blue-400 hover:bg-white/10">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" className="text-red-400 hover:bg-white/10">
                        <Trash className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
