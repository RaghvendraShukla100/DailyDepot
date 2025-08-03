import React from "react";
import {
  Truck,
  IndianRupee,
  ArrowLeftRight,
  ChevronRight,
  BadgeCheck,
} from "lucide-react";

function DeliveryOptions() {
  return (
    <div className="border-t border-gray-300 pt-10">
      <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
        DELIVERY OPTIONS <Truck className="size-5 text-gray-600" />
      </h3>

      {/* Pincode & Change */}
      <div className="flex items-center gap-2 border border-gray-300 shadow-sm rounded-xs  px-3 py-3 w-fit text-sm">
        <span className="font-semibold">401501 (Suryanath Shukla )</span>
        <BadgeCheck className="w-4 h-4 text-green-600" />
        <button className="ml-2 text-pink-600 font-semibold text-sm">
          CHANGE
        </button>
      </div>

      {/* Delivery Options */}
      <ul className="mt-4 space-y-3 text-sm text-gray-800">
        <li className="flex items-center gap-3">
          <Truck className="size-6 text-gray-600" />
          <span>
            Get it by <span className="font-bold">Wed, Aug 06</span>
          </span>
        </li>
        <li className="flex items-center gap-3">
          <IndianRupee className="size-6 text-gray-600" />
          <span>Pay on delivery available</span>
        </li>
        <li className="flex items-start gap-3">
          <ArrowLeftRight className="size-6 text-gray-600 mt-0.5" />
          <div className="flex">
            <span>Easy 7 days return & exchange available</span>{" "}
            <button className="flex items-center text-pink-600 font-semibold text-sm ml-5">
              MORE INFO
              <ChevronRight className="size-5" />
            </button>
          </div>
        </li>
      </ul>

      <p className="mt-4 text-md font-md text-gray-700">
        100% Original Products
      </p>
    </div>
  );
}

export default DeliveryOptions;
