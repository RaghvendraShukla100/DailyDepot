import React from "react";
import { ChevronRight } from "lucide-react";

const SizeSelector = ({ sizes, onSelect, selectedSize }) => {
  return (
    <div className="space-y-1 ">
      <div className="flex  w-1/2 items-center gap-x-5">
        <p className="text-sm font-medium text-gray-700">SELECT SIZE</p>
        <button className=" text-pink-600 text-sm font-semibold flex gap-0 items-center">
          SIZE CHART
          <ChevronRight className="size-4" />
        </button>
      </div>
      <div className="flex flex-wrap gap-2 mt-4 ">
        {[36, 38, 40, 42, 44, 46, 48].map((size) => (
          <button
            key={size}
            className={`w-11 h-11 rounded-full border text-sm font-medium ${
              size === 48
                ? "text-gray-400 border-gray-300 bg-gray-100 cursor-not-allowed"
                : "text-gray-800 border-gray-400 hover:border-black"
            } relative`}
            disabled={size === 48}
          >
            {size}
            {size === 46 && (
              <span
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-[10px] text-gray-50 
              bg-orange-400 w-full rounded-xs font-semibold"
              >
                2 left
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
