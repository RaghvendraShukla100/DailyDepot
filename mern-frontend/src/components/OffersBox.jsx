import React from "react";
import { ChevronDown, BadgePercent } from "lucide-react";

function OffersBox() {
  return (
    <div className="bg-white p-4 border border-gray-200 rounded-xs text-sm">
      <div className="flex items-center gap-x-2">
        <BadgePercent className="size-5 text-gray-800" />
        <strong className="text-gray-800">Available Offers</strong>
      </div>
      <p className="text-gray-600 mt-2">
        • 10% Instant Discount on ICICI Bank Credit Card & Debit Card on a min
        spend of ₹3,000. TCA
      </p>
      <div className="text-[#ff3f6c] mt-2  font-bold flex items-center gap-x-1 ">
        <button className="uppercase text-[12px]">Show More </button>
        <ChevronDown className="size-4 " />
      </div>
    </div>
  );
}

export default OffersBox;
