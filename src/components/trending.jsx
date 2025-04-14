import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';

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
      <div className='header flex justify-between'>
      <h1 className="text-2xl md:text-3xl mb-6 md:mb-10 font-semibold">Trending</h1>
      <a className="text-blue-600" href='/trending'>See More  </a>
      </div>
      <div className="h-auto min-h-[300px] md:min-h-[400px]">
        <Swiper
          spaceBetween={15}
          slidesPerView={2.3}  // Default for mobile
          breakpoints={{
            640: {
              slidesPerView: 3.3,
              spaceBetween: 20
            },
            768: {
              slidesPerView: 4.3,
              spaceBetween: 20
            },
            1024: {
              slidesPerView: 5.3,
              spaceBetween: 25
            }
          }}
          freeMode={true}
          mousewheel={{
            forceToAxis: true,
            invert: false
          }}
          modules={[FreeMode, Mousewheel]}
          className="!overflow-visible"
        >
          {trendingMovies.map((trendingPoster, index) => (
            <SwiperSlide key={index} className="!h-auto pb-4">
                <a href={`/movies/streaming/${trendingPoster.moviesTitle}`}>
              <div className="group relative h-0 pb-[150%] overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl hover:z-10 hover:scale-105">
                <img 
                  src={trendingPoster.posterUrls} 
                  alt={trendingPoster.moviesTitle || `Trending movie ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <h3 className="text-white text-sm md:text-base font-medium truncate">
                    {trendingPoster.moviesTitle}
                  </h3>
                </div>
              </div>
                </a>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}