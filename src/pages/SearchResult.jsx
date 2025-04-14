import { useEffect, useState } from "react";
import { FiSearch, FiClock, FiStar, FiCalendar } from "react-icons/fi";
import { useSearchParams } from "react-router";

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center p-4 bg-red-50 rounded-lg">
          Error: {error}
        </div>
      </div>
    );
  }

  if (!query || query.trim() === "") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-600">
            Please enter a search term
          </h2>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FiSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h2 className="text-xl font-medium text-gray-600">
            No movies found for "{query}"
          </h2>
          <p className="text-gray-500 mt-2">Try different keywords</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Search Results for "{query}"
          </h1>
          <p className="text-gray-600">
            Found {movies.length} {movies.length === 1 ? 'result' : 'results'}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {movies.map((movie, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-full h-64 object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <h3 className="text-xl font-semibold text-white">{movie.title}</h3>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center space-x-4 mb-3">
                  {movie.rating && (
                    <span className="flex items-center text-yellow-600">
                      <FiStar className="mr-1" />
                      {movie.rating}
                    </span>
                  )}
                  {movie.year && (
                    <span className="flex items-center text-gray-600">
                      <FiCalendar className="mr-1" />
                      {movie.year}
                    </span>
                  )}
                  {movie.duration && (
                    <span className="flex items-center text-gray-600">
                      <FiClock className="mr-1" />
                      {movie.duration}
                    </span>
                  )}
                </div>

                {movie.synopsis && (
                  <p className="text-gray-700 line-clamp-3 mb-4">
                    {movie.synopsis}
                  </p>
                )}

                <a href={`/movies/streaming/${movie.detailUrl}`} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors duration-300">
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}