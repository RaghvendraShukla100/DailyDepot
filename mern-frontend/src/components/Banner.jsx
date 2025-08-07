import React from "react";

const Banner = ({ image, alt = "banner", className = "" }) => {
  return (
    <div className="px-2 lg:px-20  ">
      <img src={image} alt={alt} className={`w-full h-auto ${className}`} />
    </div>
  );
};

export default Banner;
