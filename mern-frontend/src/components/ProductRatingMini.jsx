import React from "react";

function ProductRatingMini() {
  return (
    <div>
      <div className="flex border w-fit rounded-sm px-2 py-1 border-gray-200 shadow-sm items-center space-x-2 text-sm">
        <span className="text-green-600 font-bold">4.1 ★</span>
        <span className="text-gray-500 font-bold">|</span>
        <span className="text-blue-600  cursor-pointer">8 Ratings</span>
      </div>
    </div>
  );
}

export default ProductRatingMini;
