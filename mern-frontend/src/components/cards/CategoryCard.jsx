import React from "react";

const CategoryCard = ({ image, title, discount, cta }) => {
  return (
    <div
      className="bg-white dark:bg-gray-800 pb-1 border border-gray-300 dark:border-gray-600
     text-gray-700 dark:text-gray-200 w-fit hover:shadow-xl transition-colors duration-300 rounded-xs"
    >
      <div className="w-44 h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover rounded-xs"
        />
      </div>

      {/* text section */}
      <div className="mt-1 flex flex-col font-semibold items-center">
        <h1 className="capitalize text-[13px]">{title}</h1>
        <span className="capitalize font-bold text-[15px]">{discount}</span>
        <span className="capitalize text-[13px] font-semibold">{cta}</span>
      </div>
    </div>
  );
};

export default CategoryCard;
