import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/free-mode';
export default function MoviesSlide({movies,renderSlide}){
    return(
        
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
             {movies?.map((movie, index) => {
                // console.log('latest slide',movie)
     return  ( <SwiperSlide key={index} className="!h-auto pb-4">
          {renderSlide(movie, index)}
        </SwiperSlide>
        )
      })}
                  </Swiper>
        
    )
}