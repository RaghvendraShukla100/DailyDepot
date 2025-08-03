import React from "react";
import { IoMdStar } from "react-icons/io";

const SecondaryCard = ({
  image,
  rating,
  title,
  subtitle,
  price,
  originalPrice,
  discountPercent,
}) => {
  return (
    <div
      className=" h-[390px] border-gray-300 mx-10 rounded-xs overflow-hidden shadow-sm hover:shadow-lg 
    transition-all text-sm w-[220px] hover:cursor-pointer"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-[290px] border border-gray-300 object-cover"
        />

        {/* Rating */}
        <div
          className="absolute  bottom-2 left-2 bg-white text-gray-600 font-semibold  flex items-center gap-1
        text-xs px-1 py-[1px] rounded-xs shadow"
        >
          {rating}
          <IoMdStar className="text-green-700" />
        </div>
      </div>

      {/* Details */}
      <div className="p-3">
        <h3 className="font-bold text-gray-800 text-sm uppercase leading-snug">
          {title}
        </h3>
        <p className="text-gray-600 text-xs mt-2 mb-2">{subtitle}</p>

        {/* Pricing */}
        <div className="text-sm font-semibold text-gray-800">
          <span className="text-black">Rs. {price}</span>
          {originalPrice && (
            <>
              <span className="text-gray-500 line-through ml-2">
                Rs. {originalPrice}
              </span>
              {discountPercent && (
                <span className="text-orange-600 text-[11px] font-bold ml-1">
                  ({discountPercent}% OFF)
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecondaryCard;
