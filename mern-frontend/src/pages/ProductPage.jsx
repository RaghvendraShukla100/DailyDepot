import React, { useState } from "react";
import PrimaryCard from "../components/PrimaryCard";
import ProductFilter from "../components/ProductFilter";
import SortDropdown from "../components/SortDropdown";
import "rc-slider/assets/index.css";

function ProductPage() {
  return (
    <>
      {/* Header */}
      <div className="px-10 pt-8 pb-5 text-[14px] text-gray-700">
        <div className="font-light">
          Home / Clothing / Shirts /{" "}
          <span className="capitalize font-semibold">formal shirt for men</span>
        </div>
        <div>
          <span className="capitalize font-bold text-[15px]">
            formal shirts for men
          </span>
          - 2527 items
        </div>
      </div>

      <div className="flex border-gray-400">
        {/* Filters Section */}
        <div className="w-[20%]">
          <ProductFilter />
        </div>

        {/* Products Section */}
        <div className="box-border   w-full">
          <div
            className="uppercase h-16   justify-between font-bold
          grid grid-cols-12 gap-2 text-gray-800 pr-5 items-center"
          >
            <div className="pt-5 pl-10 h-full col-span-9">
              {" "}
              applied filters will display here
            </div>
            <SortDropdown className="col-span-5" />
          </div>
          <div className="border-t border-l border-gray-300 grid grid-cols-4 gap-x-2 gap-y-5 p-10">
            <PrimaryCard />
            <PrimaryCard />
            <PrimaryCard />
            <PrimaryCard />
            <PrimaryCard />
            <PrimaryCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
