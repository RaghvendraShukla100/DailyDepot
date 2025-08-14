import React, { useState } from "react";
import PrimaryCard from "../components/cards/PrimaryCard";
import { IoSearchOutline } from "react-icons/io5";
import RcSlider from "rc-slider";
import "rc-slider/assets/index.css";

const visibleLimit = 8;

const clothingBrands = [
  { brandName: "Nike", quantity: 150 },
  { brandName: "Adidas", quantity: 140 },
  { brandName: "Puma", quantity: 90 },
  { brandName: "Under Armour", quantity: 75 },
  { brandName: "Reebok", quantity: 65 },
  { brandName: "Zara", quantity: 120 },
  { brandName: "H&M", quantity: 110 },
  { brandName: "Uniqlo", quantity: 100 },
  { brandName: "Levi's", quantity: 130 },
  { brandName: "GAP", quantity: 85 },
  { brandName: "Forever 21", quantity: 70 },
  { brandName: "Calvin Klein", quantity: 95 },
  { brandName: "Tommy Hilfiger", quantity: 105 },
  { brandName: "Gucci", quantity: 40 },
  { brandName: "Louis Vuitton", quantity: 35 },
  { brandName: "Balenciaga", quantity: 28 },
  { brandName: "Burberry", quantity: 32 },
  { brandName: "The North Face", quantity: 77 },
  { brandName: "Patagonia", quantity: 66 },
  { brandName: "Columbia", quantity: 88 },
  { brandName: "Diesel", quantity: 60 },
  { brandName: "Superdry", quantity: 73 },
  { brandName: "Jack & Jones", quantity: 84 },
  { brandName: "American Eagle", quantity: 91 },
  { brandName: "Banana Republic", quantity: 52 },
];

const colorList = [
  { colorName: "Black", quantity: 180 },
  { colorName: "White", quantity: 170 },
  { colorName: "Blue", quantity: 150 },
  { colorName: "Red", quantity: 130 },
  { colorName: "Green", quantity: 120 },
  { colorName: "Yellow", quantity: 90 },
  { colorName: "Grey", quantity: 110 },
  { colorName: "Brown", quantity: 80 },
  { colorName: "Pink", quantity: 95 },
  { colorName: "Purple", quantity: 60 },
  { colorName: "Orange", quantity: 70 },
  { colorName: "Beige", quantity: 55 },
  { colorName: "Maroon", quantity: 65 },
  { colorName: "Navy", quantity: 100 },
  { colorName: "Olive", quantity: 75 },
];

const discountList = [
  "10% and above",
  "20% and above",
  "30% and above",
  "40% and above",
  "50% and above",
  "60% and above",
  "70% and above",
  "80% and above",
];

function ProductFilter() {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllColors, setShowAllColors] = useState(false);
  const [showBrandSearch, setShowBrandSearch] = useState(false);
  const [showColorSearch, setShowColorSearch] = useState(false);

  const handlePriceChange = (value) => setPriceRange(value);

  return (
    <>
      <div className="flex border-gray-400 ">
        {/* Filters Section */}
        <div className="w-[250px]">
          <div className="uppercase h-16  flex justify-between font-bold text-gray-800 dark:text-gray-300 px-5 items-center">
            <span>filters</span>
            <span className="text-red-500 text-[12px] hover:cursor-pointer">
              clear all
            </span>
          </div>

          {/* ✅ Brand Filter */}
          <div>
            {!showBrandSearch ? (
              <div className="border-t   border-gray-300 dark:text-gray-300 uppercase font-bold flex items-center justify-between px-5 py-3 text-[12px]">
                <span>brand</span>
                <span
                  className="bg-gray-300 p-2 rounded-full cursor-pointer"
                  onClick={() => setShowBrandSearch(true)}
                >
                  <IoSearchOutline className="w-[13px] h-[13px] text-gray-700" />
                </span>
              </div>
            ) : (
              <div className="relative border-t     border-gray-300 px-5 pb-2 text-sm">
                <input
                  type="text"
                  placeholder="Search for Brand"
                  className="pl-4 pr-8 py-2 w-full my-3 bg-gray-100 rounded-full placeholder-gray-500 focus:outline-none"
                />
                <button
                  className="absolute right-7 top-5/12 -translate-y-1/2 text-gray-500 text-3xl hover:text-gray-700"
                  onClick={() => setShowBrandSearch(false)}
                >
                  &times;
                </button>
              </div>
            )}

            <div className="px-5   border-gray-300">
              {(showAllBrands
                ? clothingBrands
                : clothingBrands.slice(0, visibleLimit)
              ).map((elm) => (
                <div
                  key={elm.brandName}
                  className="flex items-center gap-x-2 text-[14px] text-gray-700"
                >
                  <input
                    type="checkbox"
                    name={elm.brandName}
                    value={elm.brandName}
                  />
                  <label htmlFor={elm.brandName} className="dark:text-gray-300">
                    {elm.brandName}
                  </label>
                  <span className="text-[12px] dark:text-gray-300">
                    ({elm.quantity})
                  </span>
                </div>
              ))}
              {clothingBrands.length > visibleLimit && (
                <button
                  className="text-pink-500 text-sm mt-1"
                  onClick={() => setShowAllBrands(!showAllBrands)}
                >
                  {showAllBrands
                    ? "Show less"
                    : `+ ${clothingBrands.length - visibleLimit} more`}
                </button>
              )}
            </div>
          </div>

          {/* ✅ Price Filter */}
          <div className="border-t   border-gray-300 uppercase font-bold px-5 py-3 text-[12px]">
            Price
          </div>
          <div className="px-5 py-3   border-gray-300">
            <RcSlider
              range
              min={0}
              max={5000}
              value={priceRange}
              onChange={handlePriceChange}
              trackStyle={[{ backgroundColor: "#f73b81", height: 4 }]}
              handleStyle={[
                { borderColor: "#f73b81", backgroundColor: "#fff" },
                { borderColor: "#f73b81", backgroundColor: "#fff" },
              ]}
              railStyle={{ backgroundColor: "#eee", height: 4 }}
            />
            <div className="mt-2 text-sm font-medium">
              ₹{priceRange[0]} - ₹
              {priceRange[1] >= 5000 ? "5,000+" : priceRange[1]}
            </div>
          </div>

          {/* ✅ Color Filter */}
          <div>
            {!showColorSearch ? (
              <div
                className="border-t   border-gray-300 uppercase font-bold flex items-center 
              justify-between px-5 py-3 text-[12px]"
              >
                <span>Color</span>
                <span
                  className="bg-gray-300 p-2 rounded-full cursor-pointer"
                  onClick={() => setShowColorSearch(true)}
                >
                  <IoSearchOutline className="w-[13px] h-[13px] text-gray-700" />
                </span>
              </div>
            ) : (
              <div className="relative border-t border-gray-300 px-5 pb-2 text-sm">
                <input
                  type="text"
                  placeholder="Search for color"
                  className="pl-4 pr-8 py-2 w-full my-3 bg-gray-100 rounded-full placeholder-gray-500 focus:outline-none"
                />
                <button
                  className="cursor-pointer absolute right-7 top-5/12 -translate-y-1/2 text-gray-500 text-3xl hover:text-gray-700"
                  onClick={() => setShowColorSearch(false)}
                >
                  &times;
                </button>
              </div>
            )}

            <div className="px-5   border-gray-300">
              {(showAllColors
                ? colorList
                : colorList.slice(0, visibleLimit)
              ).map((color) => (
                <div
                  key={color.colorName}
                  className="flex items-center gap-x-2 text-[14px]  text-gray-700 dark:text-gray-300 "
                >
                  <input
                    type="checkbox"
                    name={color.colorName}
                    value={color.colorName}
                  />
                  <div
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: color.colorName.toLowerCase() }}
                  ></div>
                  <label htmlFor={color.colorName}>{color.colorName}</label>
                  <span className="text-[12px]">({color.quantity})</span>
                </div>
              ))}
              {colorList.length > visibleLimit && (
                <button
                  className="text-pink-500 text-sm mt-1"
                  onClick={() => setShowAllColors(!showAllColors)}
                >
                  {showAllColors
                    ? "Show less"
                    : `+ ${colorList.length - visibleLimit} more`}
                </button>
              )}
            </div>
          </div>

          {/* Discount Range Filter */}
          <div>
            <div className="border-t   border-gray-300 uppercase font-bold px-5 py-3 text-[12px]">
              Discount Range
            </div>
            <div className="px-5   mb-5 border-gray-300">
              {discountList.map((discount) => (
                <div
                  key={discount}
                  className="flex items-center gap-x-2 text-[14px] dark:text-gray-300 text-gray-700"
                >
                  <input type="checkbox" name={discount} value={discount} />
                  <label htmlFor={discount}>{discount}</label>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductFilter;
