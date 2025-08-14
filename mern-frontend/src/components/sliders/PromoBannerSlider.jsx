// src/components/sliders/PromoBannerSlider.jsx
import React, { useState } from "react";

const PromoBannerSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="min-w-full flex flex-col md:flex-row items-center justify-between dark:bg-gray-900 p-6 md:p-10"
          >
            {/* Left Image */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full  object-contain rounded-md"
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2  text-5xl
         text-yellow-600 p-2 rounded-xs z-10"
      >
        &#10094;
      </button>
      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2  text-5xl 
         text-yellow-600 p-2 rounded-xs  z-10"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 w-full flex justify-center gap-2">
        {slides.map((_, idx) => (
          <span
            key={idx}
            className={`w-2 h-2 rounded-full ${
              idx === currentIndex ? "bg-black" : "bg-gray-300"
            } cursor-pointer`}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default PromoBannerSlider;
