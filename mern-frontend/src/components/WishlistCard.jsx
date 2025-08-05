import React from "react";
import { FaTimes } from "react-icons/fa";

const WishlistCard = ({ product, onRemove, onMoveToBag }) => {
  return (
    <div className="w-[225px] border border-gray-300 rounded-xs hover:shadow-lg relative  bg-white">
      {/* Remove Button (Top Right Corner) */}
      <button
        onClick={() => onRemove(product._id)}
        className="absolute top-2 right-2 text-gray-600 cursor-pointer bg-gray-100/50 rounded-full p-1 hover:text-black"
      >
        <FaTimes size={14} />
      </button>

      {/* Product Image */}
      <div className=" h-[270px] border-b border-gray-300">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-[270px]  object-cover cursor-pointer"
        />
      </div>

      {/* Product Info */}
      <div className="px-3 flex flex-col h-20 items-center py-2">
        {/* Title */}
        <h3 className="text-sm text-gray-800 truncate">{product.title}</h3>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-[14px] font-semibold text-[#3E3E3E]">
            Rs.{product.price}
          </span>
          <span className="text-xs text-gray-500 line-through">
            Rs.{product.originalPrice}
          </span>
          <span className="text-xs text-[#FF4F4F] font-bold">
            ({product.discount}% OFF)
          </span>
        </div>
      </div>

      {/* Move to Bag */}
      <button
        onClick={() => onMoveToBag(product._id)}
        className="text-[#FF4F4F] font-bold text-[13px] h-12 border-t cursor-pointer border-gray-300 w-full py-2 "
      >
        MOVE TO BAG
      </button>
    </div>
  );
};

export default WishlistCard;
