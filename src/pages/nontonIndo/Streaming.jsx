import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FaPlay, FaServer, FaUser, FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';

const StreamingMovies = () => {
  const { slug } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [selectedLink, setSelectedLink] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`https://profesor-api.vercel.app/api/movies/v2/streaming?slug=${slug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
      
        
        const data = await response.json();
        setMovieData(data);
        
        // Set first link as default if available
        if (data.links && data.links.length > 0) {
          setSelectedLink(data.links[0].url);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovie();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-red-500">
        Error: {error}
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        No movie data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Video Player Section */}
      <div className="relative aspect-video w-full max-w-7xl mx-auto bg-black">
    
          <iframe
            src={movieData?.streamUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; encrypted-media; fullscreen"
            allowFullScreen
            title={`${movieData?.title} Player`}
          ></iframe>
      
      </div>

      {/* Server Selection */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* <div className="bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="flex items-center text-lg font-semibold mb-3">
            <FaServer className="mr-2 text-blue-400" />
            Available Servers
          </h3>
          <div className="flex flex-wrap gap-2">
            {[1,2].map((link, i) => (
              <button
                key={i}
                onClick={() => setSelectedLink(link.url)}
                className={`px-4 py-2 rounded-md flex items-center transition-colors ${
                  selectedLink === link.url
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                <FaPlay className="mr-2" />
                {link.server}
              </button>
            ))}
          </div>
        </div> */}

        {/* Movie Info Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-gray-800 rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-4">{movieData.title}</h1>
              
              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                {movieData.rating && (
                  <span className="flex items-center text-yellow-400">
                    <FaStar className="mr-1" />
                    {movieData.rating.value}
                  </span>
                )}
                {movieData.year && (
                  <span className="flex items-center text-gray-300">
                    <FaCalendarAlt className="mr-1" />
                    {movieData.year}
                  </span>
                )}
                {movieData.duration && (
                  <span className="flex items-center text-gray-300">
                    <FaClock className="mr-1" />
                    {movieData.duration}
                  </span>
                )}
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">{movieData.description}</p>

              {/* Genres */}
              {movieData.genre?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">GENRES</h3>
                  <div className="flex flex-wrap gap-2">
                    {movieData.genre.map((genre, i) => (
                      <span key={i} className="px-3 py-1 bg-gray-700 rounded-full text-sm">
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Cast Section */}
        
        </div>
      </div>
    </div>
  );
};

export default StreamingMovies;