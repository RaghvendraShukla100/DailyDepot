// components/TestimonialSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const testimonials = [
  {
    name: "Jane Doe",
    title: "CEO, Example Company",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "June Doe",
    title: "CEO, Example Company",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    quote:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "John Doe",
    title: "CEO, Example Company",
    image: "https://randomuser.me/api/portraits/men/35.jpg",
    quote:
      "Some quick example text to build on the card title and make up the bulk of the card's content.",
  },
  {
    name: "Jake Smith",
    title: "Founder, Sample Inc.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    quote:
      "We’ve seen a significant improvement in our business thanks to this service.",
  },
];

const TestimonialSlider = () => {
  return (
    <div className=" py-10 px-8 sm:px-10 border border-gray-200 my-10">
      <h1 className="capitalize text-2xl text-gray-700 mb-5 font-thin">
        see what people says about us...
      </h1>
      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        navigation
        modules={[Navigation]}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="bg-white p-6 rounded-sm shadow-md border border-gray-200 h-full flex flex-col justify-between">
              <div className="text-4xl text-gray-400 mb-4">“</div>
              <p className="text-gray-700 mb-6 text-sm">{t.quote}</p>
              <div className="flex items-center gap-3 mt-auto">
                <img
                  src={t.image}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-gray-500 text-sm">{t.title}</p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
