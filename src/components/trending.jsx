import Headers from './MoviesComponent/MoviesHeader';
import MoviesSlide from './MoviesComponent/MoviesSlide';
import MoviesCard from './MoviesComponent/MoviesCard';
import { FiTrendingUp } from 'react-icons/fi';

export default function Trending({ trendingMovies }) {
  if (!trendingMovies || !trendingMovies.length) {
    return (
      <div className="mt-10 mx-4 md:mx-10 h-64 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-slate-400">Loading trending movies...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="px-4 md:px-10">
      <div className="container mx-auto">
        {/* Section Badge */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-500/20 backdrop-blur-sm border border-blue-500/30 rounded-lg">
            <FiTrendingUp className="text-blue-400 text-xl" />
          </div>
          <div>
            <p className="text-blue-400 text-sm font-medium uppercase tracking-wider">What's Hot</p>
          </div>
        </div>

        <Headers title="Trending Now" url="/trending"/> 
        
        <div className="relative">
          {/* Decorative Glow */}
          <div className="absolute -top-20 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative h-auto min-h-[300px]">
            <MoviesSlide
              movies={trendingMovies}
              renderSlide={(movie, index) => <MoviesCard movie={movie} index={index} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
}