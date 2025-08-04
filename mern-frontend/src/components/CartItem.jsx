import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { X, ChevronDown } from "lucide-react";

function CartItem({ cartItem }) {
  const discountPercent = Math.round(
    ((cartItem?.discount || 0) / (cartItem?.originalPrice || 1)) * 100
  );

  return (
    <div className="relative bg-white border border-gray-200 rounded-xs p-4 flex gap-4">
      {/* Remove Button */}
      <button className="absolute top-2 right-2 text-gray-400 hover:text-black">
        <X size={16} />
      </button>

      {/* Product Image with Checkbox */}
      <div className="relative">
        <input
          type="checkbox"
          defaultChecked
          className="absolute top-1 left-1 size-4 accent-pink-600"
        />
        <img
          src={cartItem.image}
          alt={cartItem.title}
          className="h-32 w-24 object-cover border border-gray-200 rounded-sm"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-semibold text-sm">{cartItem.brand}</h3>
        <p className="text-sm text-gray-700">{cartItem.title}</p>
        <p className="text-xs text-gray-500 mt-0.5">
          Sold by: {cartItem.seller}
        </p>

        {/* Size  */}
        <div className="flex gap-3 text-sm mt-2">
          <span
            className="bg-gray-200  px-2 py-0.5 font-semibold rounded-xs flex gap-x-1 items-center
           text-gray-700 text-xs"
          >
            <strong>Size:</strong> {cartItem.size}
            <ChevronDown className="size-4" />
          </span>
          {/* qty */}
          <span
            className="bg-gray-200  pl-2 pr-1 font-semibold py-0.5 rounded-xs flex gap-x-1
           items-center text-gray-700 text-xs"
          >
            <strong>Qty:</strong> {cartItem.qty}
            <ChevronDown className="size-4" />
          </span>
          {cartItem.left <= 5 && (
            <span className="text-[#ff3f6c] text-xs bg-red-100 px-2 py-0.5 rounded-xs select-none">
              {cartItem.left} left
            </span>
          )}
        </div>

        {/* Price & Discount */}
        <div className="flex gap-2 items-center mt-2 text-sm">
          <span className="text-black font-semibold text-[15px]">
            ₹{cartItem.price}
          </span>
          <span className="line-through text-gray-400 text-[13px]">
            ₹{cartItem.originalPrice}
          </span>
          <span className="text-[#ff3f6c] text-[13px] font-semibold">
            {discountPercent}% OFF
          </span>
        </div>

        {/* Return Info */}
        <div className="text-green-700 text-xs mt-2 flex items-center">
          <FaCheckCircle className="mr-1 text-green-600" size={14} />
          14 days return available
        </div>

        {/* Delivery Date */}
        <div className="text-sm text-gray-800 mt-1 flex items-center">
          <FaCheckCircle className="mr-1 text-green-600" size={14} />
          Delivery by <strong className="ml-1">{cartItem.deliveryDate}</strong>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
