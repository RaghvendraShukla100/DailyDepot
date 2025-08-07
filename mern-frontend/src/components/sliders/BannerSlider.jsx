import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSlider = ({ slides = [] }) => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        className="rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full  flex flex-col md:flex-row items-center justify-between bg-blue-100 px-6 py-4 rounded-md">
              {/* Image section */}
              <div className="w-full md:w-1/2">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full object-cover rounded-md"
                />
              </div>

              {/* Text content section */}
              <div className="w-full md:w-1/2 text-center md:text-left px-4 py-2">
                <h2 className="text-4xl font-bold text-blue-900">
                  {slide.title}
                </h2>
                <p className="text-xl font-medium text-gray-700 mt-2">
                  {slide.subtitle}
                </p>

                {slide.ctaText && (
                  <button className="mt-4 px-5 py-2 bg-[#fe4001] text-white font-semibold rounded hover:bg-[#e13900] transition">
                    {slide.ctaText}
                  </button>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
