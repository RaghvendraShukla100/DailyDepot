import React from "react";
import { Bookmark, ChevronRight } from "lucide-react";

function AddMoreFromWishlist() {
  return (
    <div className="bg-white flex justify-between items-center p-4 border border-gray-200 rounded-xs text-gray-800 cursor-pointer">
      <div className="flex gap-x-1.5 items-center">
        <Bookmark className="size-5" />
        <span className="font-bold text-[13px]">Add More From Wishlist</span>
      </div>
      <ChevronRight />
    </div>
  );
}

export default AddMoreFromWishlist;
