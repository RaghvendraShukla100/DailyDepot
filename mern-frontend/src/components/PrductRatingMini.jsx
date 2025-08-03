import React from "react";

function PrductRatingMini() {
  return (
    <div>
      <div className="flex items-center space-x-2 text-sm">
        <span className="text-green-600 font-semibold">4.1 ★</span>
        <span className="text-gray-500">|</span>
        <span className="text-blue-600 underline cursor-pointer">
          8 Ratings
        </span>
      </div>
    </div>
  );
}

export default PrductRatingMini;
