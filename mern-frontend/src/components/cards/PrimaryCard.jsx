import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Slider from "../sliders/Slider";

function PrimaryCard() {
  return (
    <div>
      {/* Product Card */}
      <div
        className="w-[220px] overflow-hidden shadow-sm hover:shadow-lg group rounded-xs
       bg-white dark:bg-gray-800 dark:border border-gray-600 relative cursor-pointer transition-colors duration-300"
      >
        {/* Image and Slider Toggle */}
        <div className="relative w-[220px] h-[310px] overflow-hidden z-10">
          {/* Static Image (Hidden on hover) */}
          <img
            src="https://i.pinimg.com/736x/c0/11/2f/c0112f80dfbdec9d3a97c43f803ba989.jpg"
            alt="product"
            className="object-cover w-full h-full group-hover:hidden"
          />

          {/* Slider (Visible on hover only) */}
          <div className="absolute inset-0 hidden group-hover:block">
            <Slider />
          </div>

          {/* Rating */}
          <div
            className="absolute bottom-2 left-2 bg-white dark:bg-gray-800 px-2 py-0.5 rounded-xs shadow
          text-xs font-medium flex items-center gap-1 opacity-[80%] transition-colors duration-300"
          >
            <span className="font-bold text-gray-900 dark:text-gray-100">
              4.4
            </span>
            <span className="text-green-700 text-[15px]">★</span>|
            <span className="text-gray-600 dark:text-gray-400 font-normal">
              (804)
            </span>
          </div>
        </div>

        {/* Hover-only buttons */}
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex-col gap-2 hidden group-hover:flex  
        w-full bg-white dark:bg-gray-900 pt-5 pb-2 transition-colors duration-300"
        >
          <button
            className="border flex items-center justify-center gap-2 border-gray-400 dark:border-gray-600 uppercase font-bold
           text-gray-700 dark:text-gray-200 mx-auto rounded-xs h-8 w-[200px] text-sm bg-white dark:bg-gray-900 cursor-pointer transition-colors duration-300"
          >
            <IoMdHeartEmpty className="font-bold text-gray-700 dark:text-gray-200 text-[17px]" />
            Wishlist
          </button>
          <span className="px-2 text-[13px] bg-white dark:bg-gray-900 dark:text-gray-300 rounded transition-colors duration-300">
            Sizes: 34
          </span>
        </div>

        {/* Product details */}
        <div className="flex flex-col px-2 pt-2 pb-3 text-gray-900 dark:text-gray-100 z-0 relative bg-white dark:bg-gray-900 transition-colors duration-300">
          <div className="flex flex-col gap-y-1">
            <span className="font-bold text-[15px]">Tankori</span>
            <span className="text-gray-800 dark:text-gray-300 text-[13px] truncate">
              Woven Design Dharmavaram Saree
            </span>
          </div>

          {/* Price */}
          <div className="flex gap-x-2 items-center mt-1">
            <span className="font-bold text-[13px] text-black dark:text-white">
              Rs. 1,679
            </span>
            <span className="line-through text-[12px] text-gray-500 dark:text-gray-400">
              Rs. 3,499
            </span>
            <span className="text-red-500 text-[12px]">(52% OFF)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrimaryCard;
