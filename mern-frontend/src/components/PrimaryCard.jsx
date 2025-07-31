import React from "react";
import { IoMdHeartEmpty } from "react-icons/io";
import Slider from "./Slider";

function PrimaryCard() {
  return (
    <div>
      {/* Product Card */}
      <div className="w-[220px] mt-20 overflow-hidden shadow-sm hover:shadow-lg group rounded-xs bg-white mx-20 relative cursor-pointer">
        {/* Image and Slider Toggle */}
        <div className="relative w-[220px] h-[310px] overflow-hidden z-10">
          {/* Static Image (Hidden on hover) */}
          <img
            src="https://i.pinimg.com/736x/f6/58/e0/f658e08fec59439ef85d6a4d22ec6133.jpg"
            alt="product"
            className="object-cover w-full h-full group-hover:hidden"
          />

          {/* Slider (Visible on hover only) */}
          <div className="absolute inset-0 hidden group-hover:block">
            <Slider />
          </div>

          {/* Rating */}
          <div
            className="absolute bottom-2 left-2 bg-white px-2 py-0.5 rounded-xs shadow
          text-xs font-medium flex items-center gap-1 opacity-[80%]"
          >
            <span className=" font-bold">4.4</span>
            <span className="text-green-700 text-[15px]">★</span>|
            <span className="text-gray-600 font-normal">(804)</span>
          </div>
        </div>

        {/* Hover-only buttons */}
        <div
          className="absolute bottom-9 left-1/2 -translate-x-1/2 z-30 flex-col gap-2 hidden group-hover:flex  
        w-full bg-white pt-5 pb-2"
        >
          <button
            className="border flex items-center justify-center gap-2 border-gray-400 uppercase font-bold
           text-gray-700 mx-auto rounded-xs h-8 w-[200px] text-sm bg-white cursor-pointer"
          >
            <IoMdHeartEmpty className="font-bold text-gray-700 text-[17px]" />
            Wishlist
          </button>
          <span className="px-2 text-[13px] bg-white rounded-sm">
            Sizes: 34
          </span>
        </div>

        {/* Product details */}
        <div className="flex flex-col px-2 pt-2 pb-3 text-gray-900 z-0 relative bg-white">
          <div className="flex flex-col gap-y-1">
            <span className="font-bold text-[15px]">Tankori</span>
            <span className="text-gray-800 text-[13px] truncate">
              Woven Design Dharmavaram Saree
            </span>
          </div>

          {/* Price */}
          <div className="flex gap-x-2 items-center mt-1">
            <span className="font-bold text-[13px] text-black">Rs. 1,679</span>
            <span className="line-through text-[12px] text-gray-500">
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
