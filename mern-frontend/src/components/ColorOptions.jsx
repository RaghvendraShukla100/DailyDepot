import React from "react";

const ColorOptions = ({ colors }) => {
  return (
    <div className="space-y-1">
      <p className="text-sm font-semibold text-gray-700">MORE COLORS</p>
      <div className="mt-2 flex space-x-2">
        <img
          src="/images/color1.jpg"
          alt="Color option"
          className="w-12 h-16 object-cover border border-gray-200 rounded-xs"
        />
        <img
          src="/images/color2.jpg"
          alt="Color option"
          className="w-12 h-16 object-cover border border-gray-200 rounded-xs"
        />
        <img
          src="/images/color3.jpg"
          alt="Color option"
          className="w-12 h-16 object-cover border border-gray-200 rounded-xs relative"
        />
        {/* Example badge */}
        <div className="relative">
          <img
            src="/images/color4.jpg"
            alt="Color option"
            className="w-12 h-16 object-cover border border-gray-200 rounded-xs"
          />
          <span className="absolute top-0 right-0 bg-orange-400 text-[10px] text-white px-1 rounded-xs">
            NEW
          </span>
        </div>
      </div>
    </div>
  );
};

export default ColorOptions;
