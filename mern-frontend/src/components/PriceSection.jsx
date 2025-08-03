import React from "react";

const PriceSection = () => {
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-2 text-xl font-bold text-gray-900">
        <span>₹5849</span>
        <span className="text-sm line-through text-gray-500 font-normal">
          ₹8999
        </span>
        <span className="text-xl text-orange-500 font-semibold">(35% OFF)</span>
      </div>
      <p className="text-sm text-green-600 font-medium">
        inclusive of all taxes
      </p>
    </div>
  );
};

export default PriceSection;
