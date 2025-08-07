import { FileText } from "lucide-react";
import React from "react";

function ProductDetailsInfo({
  title = "Product Details",
  points = [],
  sizeAndFit = [],
  materialAndCare = [],
  specifications = [],
  showSeeMore = false,
  onSeeMoreClick,
}) {
  return (
    <div className="border-t border-gray-300 pt-6 mt-6 text-sm text-gray-800">
      {/* Title */}
      <h2 className="font-bold text-base mb-4 flex items-center gap-2 uppercase">
        {title} <FileText className="text-gray-600" />
      </h2>

      {/* Main Points */}
      {points.length > 0 && (
        <ul className="list-disc list-inside space-y-1 mb-6">
          {points.map((point, idx) => (
            <li key={idx}>{point}</li>
          ))}
        </ul>
      )}

      {/* Size & Fit */}
      {sizeAndFit.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Size & Fit</h3>
          {sizeAndFit.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      )}

      {/* Material & Care */}
      {materialAndCare.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-1">Material & Care</h3>
          {materialAndCare.map((item, idx) => (
            <p key={idx}>{item}</p>
          ))}
        </div>
      )}

      {/* Specifications */}
      {specifications.length > 0 && (
        <div className="mb-4  lg:w-2/3">
          <h3 className="font-semibold mb-3">Specifications</h3>
          <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {specifications.map(({ label, value }, idx) => (
              <div key={idx}>
                <p className="text-gray-500">{label}</p>
                <p className="text-gray-800 border-b border-gray-300">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* See More */}
      {showSeeMore && (
        <button
          className="text-pink-600 font-semibold text-sm mt-2 hover:underline"
          onClick={onSeeMoreClick}
        >
          See More
        </button>
      )}
    </div>
  );
}

export default ProductDetailsInfo;
