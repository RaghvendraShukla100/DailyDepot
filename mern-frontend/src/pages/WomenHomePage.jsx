import React from "react";
import BrandSlider from "../components/sliders/BrandSlider";
import Banner from "../components/Banner";
import womens_banner from "../assets/womens-banner.jpg";
import banks_banner from "../assets/bank-banner.webp";
import ShopByCategory from "../components/ShopByCategory";

const brandsData = [
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/tommy_hilfiger._CB796416313_.png",
    discount: "Up To 40% Off",
    name: "TOMMY HILFIGER",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/True_Browns._CB796416313_.png",
    discount: "Up To 50% Off",
    name: "trueBrowns",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/Calvin_klein._CB796416313_.png",
    discount: "Up To 40% Off",
    name: "Calvin Klein",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/Fab_India._CB796416272_.png",
    discount: "Up To 50% Off",
    name: "Fabindia",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/Satya_Paul._CB796416313_.png",
    discount: "Up To 50% Off",
    name: "Satya Paul",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/Wacoal1._CB796416313_.png",
    discount: "Min. 40% Off",
    name: "M&S",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/MandS1._CB796416313_.png",
    discount: "Min. 40% Off",
    name: "M&S",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/P0PREMIUM/Ritu_Kumar._CB796416313_.png",
    discount: "Min. 40% Off",
    name: "M&S",
  },
  {
    img: "https://m.media-amazon.com/images/G/31/img2020/fashion/WomensApparel2024/Lacoste._CB794826894_.png",
    discount: "Min. 40% Off",
    name: "M&S",
  },
];

const imageSliderData = [
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/3lxmOMFR_968c1c5245fa48d5bb16c9b10132bef9.png",
    discount: "Up To 40% Off",
    name: "Tommy Hilfiger",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/CBq3TUZz_d00f5025c9c04ffb8edebb408107d294.png",
    discount: "Up To 50% Off",
    name: "True Browns",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/QHKl8YeO_d6ca6709b1214a70b40a6557ca1bf55a.png",
    discount: "Up To 40% Off",
    name: "Calvin Klein",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/JZtRVxln_27d33ebf5cb8465c98b5f12786aebf45.png",
    discount: "Up To 50% Off",
    name: "Fabindia",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/27/25ae83cc-afb6-4918-b0b0-c5e7c18b8a6a1753593582625-_18965747722F3be023a0_4546_42d7_82d7_f9a72a0721db-2Fimage_png_535801467.png",
    discount: "Up To 50% Off",
    name: "Satya Paul",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/3lxmOMFR_968c1c5245fa48d5bb16c9b10132bef9.png",
    discount: "Min. 40% Off",
    name: "Wacoal",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/Ff4NFY0w_2f499bda23d941d8ace3537c5026dab5.png",
    discount: "Min. 40% Off",
    name: "Marks & Spencer",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/27/61e80fd8-91c2-4b25-b893-470428d229d51753593409538-image_png1456860411.png",
    discount: "Min. 40% Off",
    name: "Ritu Kumar",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/SCthBIE7_baf4d539cdea4814b149305861a6ee3d.png",
    discount: "Min. 40% Off",
    name: "Lacoste",
  },
  {
    img: "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/23/kKAdjKiM_d6307904f635470f953b449859951411.png",
    discount: "Min. 40% Off",
    name: "Allen Solly",
  },
];

const WomenHomePage = () => {
  return (
    <div className="my-10 px-4 md:px-6 lg:px-8">
      <Banner image={womens_banner} alt="Womwn's Fashion Banner" />
      <Banner image={banks_banner} alt="banks offer banner" />

      {/* premimum brand */}
      <div className="px-1 lg:max-w-11/12 bg-[#161d26]  rounded-xs mx-auto my-10 pb-5">
        <div className="lg:grid lg:grid-cols-12  lg:py-10">
          <h1
            className="col-span-7  font-bold text-4xl  md:text-4xl lg:text-6xl text-gray-100 py-5 capitalize 
          flex items-center justify-center  "
          >
            the premium brands
          </h1>
          <div className="col-span-5 mx-auto py-5 flex flex-col lg:gap-2 justify-center items-center   ">
            <span className="capitalize  lg:text-xl  px-6 font-thin text-center  text-gray-100 ">
              experience the timeless sophistication with premium brands
            </span>
            <button className="border  px-3 py-0.5 mt-2 capitalize text-xl font-bold text-gray-100 cursor-pointer   rounded-xs">
              explore now
            </button>
          </div>
        </div>
        <BrandSlider brands={brandsData} />
      </div>

      <div className="lg:w-11/12 mx-auto  ">
        <img src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2025/JULY/30/841rggNY_c6d50d59712f4b878a06ecf8f8d4a195.jpg" />

        <div className="bg-[oklch(0.86_0.14_108.55)]  pb-5 px-2">
          <BrandSlider brands={imageSliderData} />
        </div>
      </div>

      {/* shop by category */}
      <ShopByCategory />
    </div>
  );
};

export default WomenHomePage;
