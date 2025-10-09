import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { FaPlay, FaServer, FaUser, FaStar, FaCalendarAlt, FaClock } from 'react-icons/fa';
import { FiPlay, FiServer } from 'react-icons/fi';
import NavBar from '../components/navbar';

const StreamingMovies = () => {
  function slugify(str) {
    return decodeURIComponent(str)
      .replace(/\((\d{4})\)/, '-$1')
      .replace(/&/g, '')
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9\-]/gi, '')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '')
      .toLowerCase();
  }

  const { slug } = useParams();
  const cleanSlug = slugify(slug).replace(/[^a-z0-9\-]/g, '');
  const [movieData, setMovieData] = useState(null);
  const [selectedLink, setSelectedLink] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`https://profesor-api.vercel.app/api/movies/v1/download?slug=${cleanSlug}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch movie data');
        }
        
        const data = await response.json();
        setMovieData(data);
        
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
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Loading movie...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl">😞</div>
          <h2 className="text-2xl font-bold text-slate-300">Oops! Something went wrong</h2>
          <p className="text-red-400">{error}</p>
          <a href="/" className="inline-block mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-full text-white font-medium transition-colors">
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  if (!movieData) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        No movie data found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar/>
      
      {/* Video Player Section */}
      <div className="pt-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container mx-auto px-4 lg:px-8 py-8">
          <div className="relative aspect-video w-full max-w-7xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-slate-800">
            {selectedLink ? (
              <iframe
                src={selectedLink}
                className="w-full h-full"
                frameBorder="0"
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                title={`${movieData.title} Player`}
              ></iframe>
            ) : (
              <div className="flex items-center justify-center h-full bg-slate-900">
                <div className="text-center p-8 space-y-4">
                  <FiPlay className="mx-auto text-6xl text-slate-600" />
                  <p className="text-xl text-slate-400">Select a server to start streaming</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Movie Info Section */}
      <div className="bg-slate-900">
        <div className="container mx-auto px-4 lg:px-8 py-12">
          {/* Server Selection */}
          <div className="mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FiServer className="text-blue-400 text-xl" />
                </div>
                <h3 className="text-xl font-bold text-slate-100">Available Servers</h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {movieData.links?.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedLink(link.url)}
                    className={`group relative px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      selectedLink === link.url
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50'
                        : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700 border border-slate-600 hover:border-blue-500/50'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <FiPlay className={selectedLink === link.url ? 'animate-pulse' : ''} />
                      <span>{link.server}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Movie Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {movieData.title}
                  </span>
                </h1>
                
                {/* Metadata */}
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  {movieData.rating && (
                    <div className="flex items-center space-x-2 bg-slate-900/50 rounded-lg px-4 py-2 border border-slate-700">
                      <FaStar className="text-yellow-400" />
                      <span className="text-yellow-400 font-semibold">{movieData.rating}</span>
                    </div>
                  )}
                  {movieData.year && (
                    <div className="flex items-center space-x-2 bg-slate-900/50 rounded-lg px-4 py-2 border border-slate-700">
                      <FaCalendarAlt className="text-blue-400" />
                      <span className="text-slate-300">{movieData.year}</span>
                    </div>
                  )}
                  {movieData.duration && (
                    <div className="flex items-center space-x-2 bg-slate-900/50 rounded-lg px-4 py-2 border border-slate-700">
                      <FaClock className="text-cyan-400" />
                      <span className="text-slate-300">{movieData.duration}</span>
                    </div>
                  )}
                </div>

                {/* Synopsis */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-blue-400 mb-3 uppercase tracking-wider">Synopsis</h3>
                  <p className="text-slate-300 leading-relaxed text-lg">{movieData.synopsis}</p>
                </div>

                {/* Genres */}
                {movieData.genres?.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-3 uppercase tracking-wider">Genres</h3>
                    <div className="flex flex-wrap gap-2">
                      {movieData.genres.map((genre, i) => (
                        <span 
                          key={i} 
                          className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 border border-slate-600 hover:border-blue-500/50 rounded-full text-sm text-slate-300 transition-all duration-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cast Section */}
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 h-fit">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <FaUser className="text-blue-400 text-xl" />
                </div>
                <h2 className="text-2xl font-bold text-slate-100">Cast</h2>
              </div>
              
              <div className="space-y-3">
                {movieData.actors?.map((actor, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-slate-900/50 p-4 rounded-xl hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-cyan-600 text-white font-bold text-lg shadow-lg group-hover:shadow-blue-500/50 transition-shadow">
                      {actor.charAt(0)}
                    </div>
                    <div className="flex-1 truncate">
                      <h3 className="font-medium text-slate-200 truncate">{actor}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StreamingMovies;