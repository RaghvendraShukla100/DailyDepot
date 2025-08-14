import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import clothes1 from "../assets/clothsset1.png";
import clothes2 from "../assets/clothsse2.png";
import dress from "../assets/dress.png";
import mobile from "../assets/mobile.png";
import shoes from "../assets/shoes.png";

const sliderImages = [
  { src: clothes1, alt: "Clothes selection 1" },
  { src: clothes2, alt: "Clothes selection 2" },
  { src: dress, alt: "Stylish dress" },
  { src: mobile, alt: "Modern table" },
  { src: shoes, alt: "Fashionable shoes" },
];

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000, // fade animation speed in ms
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // usually fades look cleaner without arrows, optional
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    fade: true, // this enables fade-in/out instead of slide
    cssEase: "ease-in-out", // smooth fade
  };

  return (
    <section className="bg-white dark:bg-gray-900 transition-colors duration-500 ">
      <div className="max-w-7xl mx-auto px-6  pb-5 pt-10 grid lg:grid-cols-12 gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-8">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-800 dark:text-white leading-tight">
            Upgrade Your Everyday, Effortlessly
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-lg mx-auto lg:mx-0">
            Discover quality essentials for your home, wardrobe, and
            lifestyle—all in one place.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-xl mx-auto lg:mx-0">
            <input
              type="search"
              placeholder="What can we help you find today?"
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
          </div>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-6">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-semibold transition">
              Shop Daily Essentials
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:border-blue-400 dark:text-blue-400 px-6 py-3 rounded-md font-semibold transition">
              Best Sellers
            </button>
            <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 dark:border-blue-400 dark:text-blue-400 px-6 py-3 rounded-md font-semibold transition">
              New Arrivals
            </button>
          </div>

          {/* Trust Badges */}
          <div className="mt-12 flex flex-wrap gap-8 text-gray-500 dark:text-gray-400 text-sm font-medium">
            <span>⭐ 4.8/5 from 10,000+ happy customers</span>
            <span>🚚 Free 2-Day Delivery</span>
            <span>🔄 Hassle-Free Returns</span>
          </div>

          {/* Offer Banner */}
          <div className="mt-12 max-w-md rounded-md bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-200 px-5 py-3 font-semibold shadow-none">
            Back to School Sale – Up to 40% Off Select Products!
          </div>

          {/* Category Links */}
          <nav className="mt-14 flex flex-wrap justify-center lg:justify-start gap-8 text-gray-700 dark:text-gray-300 text-base font-normal">
            <a
              href="#clothes"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Clothes
            </a>
            <a
              href="#shoes"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Shoes
            </a>
            <a
              href="#curtains"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Curtains
            </a>
            <a
              href="#mobiles"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Mobiles
            </a>
            <a
              href="#homedecor"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              Home Decor
            </a>
            <a
              href="#more"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
            >
              More
            </a>
          </nav>
        </div>

        {/* Fade Image Slider */}
        <div className="hidden lg:block lg:col-span-5 overflow-hidden rounded-lg ">
          <Slider {...settings}>
            {sliderImages.map(({ src, alt }, index) => (
              <div key={index} className="h-[460px]">
                <img
                  src={src}
                  alt={alt}
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
