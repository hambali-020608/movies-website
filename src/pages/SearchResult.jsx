import { useEffect, useState } from "react";
import { FiSearch, FiClock, FiStar, FiCalendar, FiPlay } from "react-icons/fi";
import { useSearchParams } from "react-router";
import NavBar from "../components/navbar";

export default function SearchResult() {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const query = searchParams.get("q");

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(
          `https://profesor-api.vercel.app/api/movies/v1/search?q=${encodeURIComponent(query)}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        
        const data = await response.json();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }

    if (query && query.trim() !== "") {
      fetchMovies();
    }
  }, [query]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Searching movies...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl max-w-md">
          <p className="text-red-400 text-lg">Error: {error}</p>
        </div>
      </div>
    );
  }

  if (!query || query.trim() === "") {
    return (
      <div className="min-h-screen bg-slate-950">
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="p-6 bg-slate-800/50 rounded-full inline-block">
              <FiSearch className="text-6xl text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-400">
              Please enter a search term
            </h2>
          </div>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950">
        <NavBar />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center space-y-6">
            <div className="p-6 bg-slate-800/50 rounded-full inline-block">
              <FiSearch className="text-6xl text-slate-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-300">
              No movies found for "{query}"
            </h2>
            <p className="text-slate-500 text-lg">Try different keywords</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Search Header */}
          <div className="mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-500/10 backdrop-blur-sm border border-blue-500/20 rounded-full px-4 py-2 mb-4">
              <FiSearch className="text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">Search Results</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Results for "{query}"
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg">
              Found {movies.length} {movies.length === 1 ? 'result' : 'results'}
            </p>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {console.log(movies)}
            {movies.map((movie, index) => (
              <a
                key={index}
                href={`/movies/streaming/${movie.detailUrl.replace('Nonton','').replace('Sub Indo','')}/${movie.type  === 'Movies' ? 'movie' :'series'}`}
                className="group relative block"
              >
                <div className="relative h-0 pb-[150%] overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-blue-500/20 hover:shadow-2xl">
                  {/* Image */}
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  
                  {/* Blue Glow Effect on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-60 animate-pulse"></div>
                      <div className="relative bg-blue-500/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                        <FiPlay className="text-white text-3xl" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Movie Info */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white text-sm md:text-base font-semibold line-clamp-2 mb-2 drop-shadow-lg">
                      {movie.title}
                    </h3>
                    
                    {/* Rating & Year */}
                    <div className="flex items-center gap-2">
                      {movie.rating && (
                        <div className="flex items-center space-x-1 bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1">
                          <FiStar className="text-yellow-400 text-xs" />
                          <span className="text-yellow-400 text-xs font-medium">{movie.rating}</span>
                        </div>
                      )}
                      {movie.year && (
                        <div className="flex items-center space-x-1 bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1">
                          <FiCalendar className="text-blue-400 text-xs" />
                          <span className="text-blue-400 text-xs font-medium">{movie.year}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Border Glow Effect */}
                  <div className="absolute inset-0 rounded-xl border border-blue-500/0 group-hover:border-blue-500/30 transition-all duration-500"></div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}