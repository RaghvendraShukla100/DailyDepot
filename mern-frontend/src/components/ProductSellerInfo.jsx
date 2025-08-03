import React from "react";

function ProductSellerInfo() {
  return (
    <div>
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="">Product Code : </span>
          <span className="text-black font-semibold">31821938</span>
        </p>
        <p>
          <span className="">Seller : </span>
          <span className="text-pink-600 font-semibold">
            ARVIND LIFESTYLE BRANDS LIMITED
          </span>
        </p>
        <button className=" font-medium text-sm cursor-pointer">
          View Supplier Information
        </button>
      </div>
    </div>
  );
}

export default ProductSellerInfo;
