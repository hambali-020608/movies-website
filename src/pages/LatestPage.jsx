import { useEffect, useState } from "react";
import { FiClock, FiPlay, FiStar } from "react-icons/fi";
import NavBar from "../components/navbar";

export default function LatestPage() {
  const [Latest, setLatest] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const perPage = 21;
  const [pageBlock, setPageBlock] = useState(0);

  useEffect(() => {
    const fetchLatest = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://profesor-api.vercel.app/api/movies/v1/latest?page=${currentPage}`
        );
        const data = await response.json();
        setLatest(data.data.data);
        setHasNextPage(data.data.length === perPage);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nextPageBlock = () => {
    if (hasNextPage) {
      setPageBlock(pageBlock + 1);
      setCurrentPage((pageBlock + 1) * 5 + 1);
    }
  };

  const prevPageBlock = () => {
    if (pageBlock > 0) {
      setPageBlock(pageBlock - 1);
      setCurrentPage((pageBlock - 1) * 5 + 1);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= 5; i++) {
      const pageNumber = pageBlock * 5 + i;
      pages.push(
        <button
          key={pageNumber}
          onClick={() => handlePageClick(pageNumber)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
            pageNumber === currentPage
              ? "bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg shadow-blue-500/50"
              : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700 hover:border-blue-500/50"
          }`}
        >
          {pageNumber}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      <NavBar/>
      
      <div className="container mx-auto px-4 lg:px-8 pt-28 pb-16">
        {/* Page Header */}
        <div className="mb-12">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-4 py-2 mb-4">
            <FiClock className="text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">Fresh Releases</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Latest Movies
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg">
            Brand new releases just added to our collection
          </p>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-400">Loading latest movies...</p>
            </div>
          </div>
        ) : error ? (
          <div className="flex justify-center items-center h-96">
            <div className="text-center p-8 bg-red-500/10 border border-red-500/30 rounded-2xl max-w-md">
              <p className="text-red-400 text-lg">{error}</p>
            </div>
          </div>
        ) : Latest.length > 0 ? (
          <>
            {/* Movies Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mb-12">
              {Latest.map((movie) => (
                <a
                  href={`/movies/streaming/${movie.moviesTitle}/${movie.Type === "Movies" ? "movie" : "series"}`}
                  key={movie.id}
                  className="group relative block"
                >
                  <div className="relative h-0 pb-[150%] overflow-hidden rounded-xl shadow-2xl transition-all duration-500 hover:shadow-cyan-500/20 hover:shadow-2xl">
                    {/* Image */}
                    <img
                      src={movie.posterUrls}
                      alt={movie.moviesTitle}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                    
                    {/* Cyan Glow Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="relative">
                        <div className="absolute inset-0 bg-cyan-500 blur-2xl opacity-60 animate-pulse"></div>
                        <div className="relative bg-cyan-500/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                          <FiPlay className="text-white text-3xl" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Movie Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h2 className="text-white text-sm md:text-base font-semibold line-clamp-2 mb-2 drop-shadow-lg">
                        {movie.moviesTitle}
                      </h2>
                      
                      {/* Rating Badge */}
                      {movie.rating && (
                        <div className="flex items-center space-x-1 bg-slate-900/80 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
                          <FiStar className="text-yellow-400 text-xs" />
                          <span className="text-yellow-400 text-xs font-medium">{movie.rating}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Border Glow Effect */}
                    <div className="absolute inset-0 rounded-xl border border-cyan-500/0 group-hover:border-cyan-500/30 transition-all duration-500"></div>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-3 flex-wrap">
              <button
                onClick={prevPageBlock}
                disabled={pageBlock === 0}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  pageBlock === 0
                    ? "bg-slate-800/30 text-slate-600 cursor-not-allowed"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700 hover:border-cyan-500/50"
                }`}
              >
                ← Previous
              </button>

              {renderPageNumbers()}

              <button
                onClick={nextPageBlock}
                disabled={!hasNextPage}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  !hasNextPage
                    ? "bg-slate-800/30 text-slate-600 cursor-not-allowed"
                    : "bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700 hover:border-cyan-500/50"
                }`}
              >
                Next →
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-96">
            <div className="text-center space-y-4">
              <div className="text-6xl">🎬</div>
              <p className="text-slate-400 text-lg">No movies found.</p>
            </div>
          </div>
        )}
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed top-1/4 left-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  );
}