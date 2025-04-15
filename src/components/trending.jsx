import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
import Headers from './MoviesComponent/MoviesHeader';
import MoviesSlide from './MoviesComponent/MoviesSlide';
import MoviesCard from './MoviesComponent/MoviesCard';

export default function Trending({ trendingMovies }) {
  if (!trendingMovies || !trendingMovies.length) {
    return (
      <div className="mt-10 mx-4 md:mx-10 h-64 flex items-center justify-center">
        Loading trending movies...
      </div>
    );
  }

  return (
    <div className="mt-10 mx-4 md:mx-10">
   <Headers title="Trending" url="/trending"/> 
      <div className="h-auto min-h-[300px] ">
       <MoviesSlide
       movies={trendingMovies}
       renderSlide={(movie, index) => <MoviesCard movie={movie} index={index} />}
       />
      </div>
    </div>
  );
}