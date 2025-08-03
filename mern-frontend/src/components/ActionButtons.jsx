import React from "react";
import { Handbag, Heart } from "lucide-react";

function ActionButtons() {
  return (
    <div>
      <div className="flex  gap-5">
        <button className="bg-pink-500 flex items-center justify-center hover:bg-pink-400 text-white font-bold py-5 px-10 w-full uppercase tracking-wide cursor-pointer rounded-xs">
          <Handbag className="size-5" />
          <i className="fas fa-lock mr-2"></i> Add to Bag
        </button>
        <button
          className="border uppercase border-gray-300 w-full rounded-xs py-3 px-10 hover:border-gray-800 cursor-pointer 
         font-bold  text-gray-700 flex items-center justify-center"
        >
          <Heart className="size-5" />
          <i className="mr-2 "></i> Wishlist
        </button>
      </div>
    </div>
  );
}

export default ActionButtons;
