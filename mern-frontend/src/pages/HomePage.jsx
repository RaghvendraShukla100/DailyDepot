import React from "react";
import TestimonialSlider from "../components/sliders/TestimonialSlider";
import ShopByCategory from "../components/ShopByCategory";
import HeroSection from "../components/HeroSection";
import BestSellers from "../components/BestSellers";
import NewArivals from "../components/NewArivals";
import PromoBannerSliderData from "../components/sliders/PromoBannerSlider";
import BrandSlider from "../components/sliders/BrandSlider";

const promoBannerSliderData = [
  {
    image:
      "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/AugArt/AF/Revised/SD-EVENT-BANNER---UPTO-60-OFF_pc._CB804923790_.gif",
    title: "Upto 60% Off",
    subtitle: "Big Savings on Fashion",
    ctaText: "Shop Now",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/AugArt/AF/Premium/Mens_clothing_1500x460._SX1500_QL85_FMpng_.png",
    title: "Premium Men's Clothing",
    subtitle: "Level up your wardrobe",
    ctaText: "Explore",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/AugArt/AF/PC/Tophero/Womens_clothing_1500x460._SX1500_QL85_FMpng_.png",
    title: "Women's Clothing",
    subtitle: "Trendy styles & great prices",
    ctaText: "Discover",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/AugArt/AF/PC/Tophero/Jewellery_1500x460._SX1500_QL85_FMpng_.png",
    title: "Jewellery Collection",
    subtitle: "Elegant pieces for every occasion",
    ctaText: "View Collection",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/AugArt/AF/Tophero/Rec/Footwear_pc._SX1500_QL85_.jpg",
    title: "Footwear Fiesta",
    subtitle: "Stylish & comfy",
    ctaText: "Shop Shoes",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/AugArt/AF/PC/Tophero/Luggage_Trolleys_bags_and_more_1500x460._SX1500_QL85_FMpng_.png",
    title: "Travel in Style",
    subtitle: "Bags, Trolleys & more",
    ctaText: "Travel Essentials",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/IMG25/Fashion/Event/AugArt/AF/PC/Tophero/Beauty_1500x460._SX1500_QL85_FMpng_.png",
    title: "Beauty Bonanza",
    subtitle: "Glow up with top products",
    ctaText: "Shop Beauty",
  },
];

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

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <PromoBannerSliderData slides={promoBannerSliderData} />
      <BestSellers />
      <div className="px-6 dark:bg-gray-900 py-15  border-white">
        <h1 className="text-4xl font-thin text-blue-700 dark:text-gray-300 pb-8 capitalize text-center">
          best brands to grabs
        </h1>

        <BrandSlider brands={brandsData} />
      </div>
      <NewArivals />
      <ShopByCategory />

      {/* testimonial */}
      {/* <TestimonialSlider /> */}
    </div>
  );
};

export default HomePage;
