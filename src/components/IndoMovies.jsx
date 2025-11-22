import MoviesCard from "./MoviesComponent/MoviesCard";
import Headers from "./MoviesComponent/MoviesHeader";
import MoviesSlide from "./MoviesComponent/MoviesSlide";
import { FiClock } from 'react-icons/fi';

export default function IndoMovies({IndoMovies, source="hostingaloha"}) {
    console.log("IndoMovies",IndoMovies);
    if (!IndoMovies || !IndoMovies.length) {

        return (
          <div className="mt-10 mx-4 md:mx-10 h-64 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-400">Loading Indo movies...</p>
            </div>
          </div>
        );
      }
    
      return (
        <section className="px-4 md:px-10">
          <div className="container mx-auto">
            {/* Section Badge */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-lg">
                {/* <FiClock className="text-cyan-400 text-xl" /> */}
              </div>
              <div>
                <p className="text-cyan-400 text-sm font-medium uppercase tracking-wider">Indonesan Movies</p>
              </div>
            </div>

            <Headers title="Indonesia Movie" url="/indo-movies"/>
            
            <div className="relative">
              {/* Decorative Glow */}
              <div className="absolute -top-20 left-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
              
              <div className="relative h-auto min-h-[300px] md:min-h-[400px]">
                <MoviesSlide
                  movies={IndoMovies}
                  renderSlide={(movie, index) => <MoviesCard movie={movie} index={index} source={source} />}
                />
              </div>
            </div>
          </div>
        </section>
      );
}