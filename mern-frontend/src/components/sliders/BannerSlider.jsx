import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BannerSlider = ({ slides = [] }) => {
  return (
    <div className="w-full bg-gray-900 ">
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
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="w-full  rounded  overflow-clip   items-center justify-between ">
              {/* Image section */}
              <div className="w-full ">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full    object-cover rounded-xs "
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
