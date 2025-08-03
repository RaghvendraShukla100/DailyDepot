import React, { useState } from "react";

const ProductImageDisplay = ({ images = [] }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  if (!images.length) {
    return <p className="text-center text-gray-500">No images available.</p>;
  }

  return (
    <div className=" flex  flex-col md:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumbnail ${index}`}
            onMouseEnter={() => setSelectedImage(img)}
            className={`w-12 h-16  object-cover border rounded  cursor-pointer ${
              img === selectedImage ? "border-blue-600" : "border-gray-300"
            }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="flex-1 bg-gray-200 h-fit overflow-clip  shadow-lg">
        <img
          src={selectedImage}
          alt="Selected Product"
          className="w-full  object-contain  rounded-xs  "
        />
      </div>
    </div>
  );
};

export default ProductImageDisplay;
