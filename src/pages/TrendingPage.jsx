import { useEffect, useState } from "react";

export default function TrendingPage() {
  const [trending, setTrending] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const perPage = 21;
  const [pageBlock, setPageBlock] = useState(0);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://profesor-api.vercel.app/api/movies/v1/trending?page=${currentPage}`
        );
        const data = await response.json();
        setTrending(data.data);
        setHasNextPage(data.data.length === perPage);
      } catch (err) {
        setError("Failed to fetch movies.");
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, [currentPage]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
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
          className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            pageNumber === currentPage
              ? "bg-blue-600 text-white shadow"
              : "bg-white text-gray-700 hover:bg-blue-100"
          }`}
        >
          {pageNumber}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
        🎬 Trending Movies
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : trending.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {trending.map((movie) => (
            <div
              key={movie.id}
              className="bg-white shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl"
            >
              <div className="relative h-64 w-full bg-gray-200">
                <img
                  src={movie.posterUrls}
                  alt={movie.moviesTitle}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-base font-semibold text-gray-800 line-clamp-2">
                  {movie.moviesTitle}
                </h2>
                {movie.rating && (
                  <p className="text-sm text-gray-500 mt-1">
                    ⭐ {movie.rating}/10
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No movies found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2 flex-wrap">
        <button
          onClick={prevPageBlock}
          disabled={pageBlock === 0}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            pageBlock === 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Prev 5
        </button>

        {renderPageNumbers()}

        <button
          onClick={nextPageBlock}
          disabled={!hasNextPage}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
            !hasNextPage
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Next 5
        </button>
      </div>
    </div>
  );
}
