import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css/effect-coverflow";
import "swiper/css";

export default function Hero({ Movies,source='filmapik' }) {
  const [activeIndex, setActiveIndex] = useState(0);
  console.log(Movies)

  
  if (!Movies || !Movies.length) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Fungsi untuk menangani perubahan slide
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {/* Gambar background dengan efek blur hanya di belakang */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `url(${Movies[activeIndex]?.posterUrls})`,
            filter: 'blur(8px) brightness(0.7)',
            transform: 'scale(1.1) translateZ(0)',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        
        {/* Overlay gelap untuk meningkatkan kontras */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 min-h-screen flex flex-col justify-end p-10 py-24 container mx-auto ">
        <div className="flex flex-col lg:flex-row items-end gap-20">
          {/* Bagian Teks */}
          <div className="max-w-md text-white mb-0 lg:mb-28  text-center">
            <h1 className="mb-5 text-4xl font-bold">{Movies[activeIndex]?.moviesTitle}</h1>
            {/* <p className="mb-5 text-lg">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
              exercitationem quasi.
            </p> */}
            <div className="flex gap-4 justify-center">
              <a href={source == 'filmapik' ? `/movies/streaming/${Movies[activeIndex]?.moviesTitle}` : `/ny21-indo/movies/streaming/${Movies[activeIndex]?.moviesTitle}`} className="btn btn-primary rounded-full px-6 py-2">
                Watch Movie
              </a>
              <button className="btn bg-transparent text-white border-white rounded-full px-6 py-2">
                More info
              </button>
            </div>
          </div>

          {/* Swiper - Tetap tajam */}
          <div className="w-full lg:w-[500px]">
            <Swiper
              effect="coverflow"
              grabCursor={true}
              centeredSlides={true}
              slidesPerView="auto"
              loop={true}
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 300,
                modifier: 1,
                slideShadows: false,
              }}
              modules={[EffectCoverflow, Autoplay]}
              onSlideChange={handleSlideChange}
              className="swiper-container"
            >
              {Movies.map((poster, index) => (
                <SwiperSlide key={index} className="swiper-slide">
                  <img 
                    src={poster.posterUrls} 
                    alt={`Poster ${index + 1}`} 
                    className="rounded-lg object-cover h-full w-full"
                    loading="lazy"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>

      {/* CSS untuk optimasi tambahan */}
      <style jsx>{`
        .swiper-container {
          width: 100%;
          padding-top: 50px;
          padding-bottom: 50px;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 200px;
          height: 300px;
        }
        .swiper-slide img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      `}</style>
    </div>
  );
}