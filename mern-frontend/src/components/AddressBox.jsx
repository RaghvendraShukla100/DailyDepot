import React from "react";

function AddressBox() {
  return (
    <div className="bg-[#fff6f4] p-4 border border-gray-200 rounded-xs">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-0">
        <div className="text-gray-800 text-[14px] leading-snug">
          <div className="flex flex-wrap gap-x-1">
            <p className="font-light">Deliver to :</p>
            <h2 className="font-semibold">Suryanath Shukla , 401501</h2>
          </div>
          <p className="text-[14px]">
            Hari Om Nagar New Raut Wadi Boisar, Boisar, Thane
          </p>
        </div>
        <button className="text-[#ff3f6c] font-bold border border-[#ff3f6c] px-3 py-1 text-[14px] rounded-xs">
          CHANGE ADDRESS
        </button>
      </div>
    </div>
  );
}

export default AddressBox;
