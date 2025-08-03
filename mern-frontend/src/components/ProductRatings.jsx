import React from "react";
import { IoMdStar } from "react-icons/io";

function ProductRating({
  ratingBreakdown = [5, 1, 0, 1, 1], // [5★, 4★, 3★, 2★, 1★]
}) {
  const totalReviews = ratingBreakdown.reduce((sum, c) => sum + c, 0);

  // weighted average: (5*count₅ + 4*count₄ … 1*count₁) / total
  const avgRating = totalReviews
    ? (
        ratingBreakdown.reduce(
          (sum, count, idx) => sum + count * (5 - idx),
          0
        ) / totalReviews
      ).toFixed(1)
    : "0.0";

  return (
    <div className="border-t pt-3 my-3 border-gray-300">
      <h2 className="font-bold text-base mb-3 uppercase">RATINGS</h2>

      <div className="flex  mb-4">
        {/* Left: average & verified buyers */}
        <div className="text-center  px-5 py-5 border-r border-gray-300">
          <div className="text-5xl font-semibold  flex items-center gap-x-3">
            {avgRating}
            <IoMdStar className="text-green-600" />
          </div>
          <div className="text-xs text-gray-600">
            {totalReviews} Verified Buyers
          </div>
        </div>

        {/* Right: bars */}
        <div className="py-2 px-5 flex flex-col justify-center gap-1 w-full max-w-xs">
          {[5, 4, 3, 2, 1].map((star) => {
            const idx = 5 - star; // map 5★→0 … 1★→4
            const count = ratingBreakdown[idx];
            const pct = totalReviews ? (count / totalReviews) * 100 : 0;

            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-gray-500 whitespace-nowrap flex items-center gap-x-2 ">
                  {star} <IoMdStar />
                </span>

                <div className="w-full h-2 bg-gray-200 rounded">
                  <div
                    className="h-2 bg-green-600 rounded"
                    style={{ width: `${pct}%` }}
                  />
                </div>

                <span className="text-xs  text-gray-500">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProductRating;
