import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

export default function Movies(){
    return(
        <div className='mt-10 mx-10'>
            <h1 className="text-3xl mb-10">Movies</h1>
            <Swiper
      spaceBetween={20}
      slidesPerView={5}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}
    >
      
      <SwiperSlide><img src="/images/poster1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/images/poster1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/images/poster1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/images/poster1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/images/poster1.jpg" alt="" /></SwiperSlide>
      <SwiperSlide><img src="/images/poster1.jpg" alt="" /></SwiperSlide>
      
    </Swiper>
        </div>
    )
}