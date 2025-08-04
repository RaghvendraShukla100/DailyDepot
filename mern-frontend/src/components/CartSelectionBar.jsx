import React from "react";

function CartSelectionBar() {
  return (
    <div className="flex items-center px-2 font-bold text-base font-sans">
      <input
        type="checkbox"
        checked
        readOnly
        className="accent-[#ff3f6c] w-[18px] h-[18px] mr-2"
      />
      <span className="text-[#181818] tracking-wide">1/1 ITEMS SELECTED</span>
      <div className="flex items-center ml-auto text-xs font-semibold text-[#252525]">
        <span className="cursor-pointer mr-6 font-bold text-[#767676]">
          REMOVE
        </span>
        <span className="border-l-1 border-gray-400 my-5 font-bold pl-6 text-[#767676] cursor-pointer">
          MOVE TO WISHLIST
        </span>
      </div>
    </div>
  );
}

export default CartSelectionBar;
