import { ThumbsUp, ThumbsDown } from "lucide-react";
import React from "react";

function CustomerReviews({ reviews = [] }) {
  return (
    <div>
      <h3 className="font-semibold mb-2">Customer Reviews (6)</h3>
      <div className="space-y-4 mb-4">
        {reviews.map((review, idx) => (
          <div key={idx} className="border-b border-gray-300 pb-4">
            <div className=" flex items-center   gap-x-2">
              <div className="   text-white text-xs bg-sky-600 w-fit px-1 py-0.5 rounded-xs">
                {review.rating}★
              </div>
              <p className="mt-1 text-gray-800">{review.text}</p>
            </div>
            <div className=" mt-2 flex justify-between pr-2">
              <p className="text-gray-500 text-xs mt-1">
                {review.author} | {review.date}
              </p>
              <div className="flex gap-4 text-xs  text-gray-500 mt-1">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="w-4 h-4" /> {review.likes}
                </div>
                <div className="flex items-center gap-1">
                  <ThumbsDown className="w-4 h-4" /> {review.dislikes}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button className="text-pink-600 text-sm font-semibold cursor-pointer mb-4">
        View all 6 reviews
      </button>
    </div>
  );
}

export default CustomerReviews;
