import React from "react";

const TertiaryCard = ({
  imageUrl,
  brand,
  title,
  price,
  originalPrice,
  discount,
  onAddToBag,
}) => {
  return (
    <div
      className="w-48 border border-gray-300 box-border  rounded-xs overflow-hidden 
    bg-white  hover:shadow-md transition duration-200"
    >
      {/* Image */}
      <div className="bg-white  h-[280px] border-b border-gray-300  overflow-clip  flex justify-center items-center ">
        <img src={imageUrl} alt={title} className=" object-cover" />
      </div>

      {/* Text Content */}
      <div className="px-3  pt-1 ">
        <h3 className="text-sm font-bold text-gray-800 uppercase">{brand}</h3>
        <p className="text-xs font-light text-gray-600 my-1">{title}</p>

        {/* Pricing */}
        <div className=" flex gap-x-1">
          <span className=" font-semibold text-sm">₹{price}</span>
          <span className="text-gray-400 text-sm line-through ml-1">
            ₹{originalPrice}
          </span>
          <span className="text-orange-600 text-[11px] font-bold mt-0.5">
            ({discount} OFF)
          </span>
        </div>

        {/* Button */}
        <button
          onClick={onAddToBag}
          className="w-full border-t pt-1 border-gray-300 mt-2 text-[13px] font-bold
           text-red-500 uppercase tracking-wide"
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  );
};

export default TertiaryCard;
