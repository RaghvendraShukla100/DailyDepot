import React from "react";

const Banner = ({ image, alt = "banner", className = "" }) => {
  return (
    <div className=" lg:w-11/12 mx-auto  ">
      <img src={image} alt={alt} className={`w-full h-auto ${className}`} />
    </div>
  );
};

export default Banner;
