import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export default function BrandSlider({ brands }) {
  return (
    <Swiper
      modules={[Navigation]}
      navigation
      spaceBetween={5}
      slidesPerView={4}
      slidesPerGroup={4}
      dots={true}
      breakpoints={{
        320: { slidesPerView: 2, slidesPerGroup: 2 },
        640: { slidesPerView: 3, slidesPerGroup: 3 },
        1024: { slidesPerView: 6, slidesPerGroup: 6 },
      }}
    >
      {brands.map((brand, idx) => (
        <SwiperSlide key={idx}>
          <div className=" border-gray-200   rounded overflow-hidden  cursor-pointer">
            <img
              src={brand.img}
              alt={brand.name}
              className="w-full object-cover "
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
