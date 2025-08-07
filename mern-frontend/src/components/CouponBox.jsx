import React from "react";
import { Tag } from "lucide-react";

function CouponBox() {
  return (
    <div className="bg-white p-4 border border-b lg:border-x-0 lg:border-t-0 text-gray-700 border-gray-200 rounded-xs space-y-2">
      <h1 className="font-bold text-xs text-gray-800 mb-5 uppercase">
        Coupons
      </h1>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-4 items-center">
          <Tag className="size-5" />
          <span className="font-semibold">Apply Coupons</span>
        </div>
        <button className="text-red-500 border border-red-500 px-3 font-semibold text-xs py-1 rounded-xs">
          APPLY
        </button>
      </div>
    </div>
  );
}

export default CouponBox;
