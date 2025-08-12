import React from "react";

const CategoryCard = ({ image, title, discount, cta }) => {
  return (
    <div className=" bg-[#DA012D]   text-gray-100 p-1  w-fit  hover:shadow-xl">
      <div className="w-38 h-40   overflow-hidden ">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>

      <div className="mt-1   flex flex-col  font-semibold items-center">
        <h1 className="capitalize text-[13px]">{title}</h1>
        <span className="capitalize font-bold text-[15px] ">{discount}</span>
        <span className="capitalize  text-[13px] font-semibold ">{cta}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
