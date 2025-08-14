import React from "react";
import BrandSlider from "./sliders/BrandSlider";

const products = [
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/QntGQpsl_3dcdc4985cc44a03861ce13961068ec2.png",
    name: "Agile Sports Shoes",
    oldPrice: 3649,
    newPrice: 999,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/fCzZXLZJ_5b921d41fd5246debe335ad9f33499d4.png",
    name: "Relaxed Track Pants",
    oldPrice: 1399,
    newPrice: 499,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/oY38GMyw_76800a154a29464d8e7704d47e2badff.png",
    name: "Tailored Trousers",
    oldPrice: 1699,
    newPrice: 599,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/tS8cdZaA_ddbb0004322945a1a5de80a2d60e8ff6.png",
    name: "Sturdy Trolleys",
    oldPrice: 849,
    newPrice: 299,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/2X0ZvxSR_fbd0196b264345d4b008fcfbad243d00.png",
    name: "Casual T-Shirts",
    oldPrice: 999,
    newPrice: 299,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/DN4BI5Xr_537731c4571140ca98e740be18b4e0da.png",
    name: "Top Timepieces",
    oldPrice: 5599,
    newPrice: 1299,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/8cwKHZG4_b752778e780542e29df4ab90ade0a13f.png",
    name: "Stylish Sneakers",
    oldPrice: 2999,
    newPrice: 899,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/ShbUZSuz_c9064cfaa00949d3a618ec0ab8165434.png",
    name: "Formal Shirts",
    oldPrice: 1499,
    newPrice: 599,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/oB4xg7Bb_8736d754cba24a4d89aede4d8cdafd6c.png",
    name: "Summer Shorts",
    oldPrice: 799,
    newPrice: 299,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/VxE2pYKU_a6cfd82fd88a45b1a25df70cb3cc7e22.png",
    name: "Printed T-Shirts",
    oldPrice: 899,
    newPrice: 349,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/FvXXDSSw_df12319e9cd84f78bfc879fde6e46332.png",
    name: "Leather Wallets",
    oldPrice: 1299,
    newPrice: 499,
  },
  {
    img: "https://assets.myntassets.com/w_163,c_limit,fl_progressive,dpr_2.0/assets/images/2025/AUGUST/11/zRREBUsr_982709d6427341cfa1955a6a2e2e1390.png",
    name: "Luxury Watches",
    oldPrice: 6999,
    newPrice: 1999,
  },
];

const BestSellers = () => {
  return (
    <div className=" dark:border-gray-700 p-5 transition-colors duration-300 bg-white dark:bg-gray-900">
      {/* Header */}
      <div
        className="py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4
                   border-x border-t border-gray-300 dark:border-gray-600
                   rounded bg-gray-50  dark:bg-slate-800 
                   px-5 my-1 transition-colors duration-300 "
      >
        <h1
          className="dark:mask-radial-from-neutral-800 font-serif text-3xl 
         sm:text-3xl uppercase text-blue-600 dark:text-gray-100"
        >
          Best Sellers
        </h1>
        <button
          className="px-5 py-2 text-sm font-medium rounded capitalize  bg-blue-600 hover:bg-blue-700 
         text-white dark:bg-gray-100 dark:text-gray-900 hover:opacity-90 transition"
        >
          Explore All
        </button>
      </div>

      {/* Slider */}
      <div className=" border-x border-b border-gray-300 dark:border-gray-600 shadow rounded  px-1 p-2">
        <BrandSlider brands={products} />
      </div>
    </div>
  );
};

export default BestSellers;
