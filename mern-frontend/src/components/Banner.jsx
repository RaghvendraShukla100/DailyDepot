import React from "react";

const Banner = ({ image, alt = "banner", className = "" }) => {
  return (
    <div className=" lg:w-11/12 mx-auto rounded-3xl  bg-gray-300 dark:bg-gray-800">
      <img src={image} alt={alt} className={`w-full h-auto  ${className}`} />
    </div>
  );
};

export default Banner;
