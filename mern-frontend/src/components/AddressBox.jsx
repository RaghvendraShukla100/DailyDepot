import React from "react";

function AddressBox() {
  return (
    <div className="bg-[#fff6f4] p-4 border border-gray-200 rounded-xs">
      <div className="flex justify-between items-center">
        <div className="font-thin text-gray-800 text-sm">
          <div className="flex gap-x-1">
            <p>Deliver to :</p>
            <h2 className="font-semibold ">Suryanath Shukla , 401501</h2>
          </div>
          <p className="text-sm ">
            Hari Om Nagar New Raut Wadi Boisar, Boisar, Thane
          </p>
        </div>
        <button className="text-[#ff3f6c]  font-bold border border-[#ff3f6c] px-3 py-1 text-sm rounded-xs">
          CHANGE ADDRESS
        </button>
      </div>
    </div>
  );
}

export default AddressBox;
