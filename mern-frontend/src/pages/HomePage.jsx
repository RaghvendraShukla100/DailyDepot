import React from "react";
import TestimonialSlider from "../components/sliders/TestimonialSlider";
import banks_banner from "../assets/bank-banner.webp";
import Banner from "../components/Banner";
import BannerSlider from "../components/sliders/BannerSlider";
import PromoBannerSlider from "../components/sliders/PromoBannerSlider";

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

const HomePage = () => {
  const bannerSlides = [
    {
      image:
        "https://m.media-amazon.com/images/G/31/MA2025/Augart/SD/Hero/PC/Latest_Collection_1500x460._CB804860218_.png",
      title: "Upgrade Your Style",
      subtitle: "Get the latest fashion for men",
      ctaText: "Shop Now",
    },
    {
      image:
        "https://m.media-amazon.com/images/G/31/MA2025/Augart/SD/Hero/PC/Premium_Styles_1500x460._CB804860218_.png",
      title: "Big Deals on Top Brands",
      subtitle: "Save up to 60% off",
      ctaText: "Explore",
    },
    {
      image:
        "https://m.media-amazon.com/images/G/31/MA2025/Augart/SD/Hero/PC/Everyday_Essentials_1500x460._CB804860218_.png",
      title: "New Arrivals",
      subtitle: "Fresh styles just dropped",
      ctaText: "Check It Out",
    },
    {
      image:
        "https://m.media-amazon.com/images/G/31/MA2025/Augart/SD/Hero/PC/Latest_Collection_1500x460._CB804860218_.png",
      title: "Festive Collection",
      subtitle: "Celebrate with trendy looks",
      ctaText: "View Collection",
    },
    {
      image:
        "https://m.media-amazon.com/images/G/31/MA2025/Augart/SD/Hero/PC/Chic_Sunglasses_1500x460._CB804860218_.png",
      title: "Minimalist Wardrobe",
      subtitle: "Simplify your style",
      ctaText: "Browse Now",
    },
    {
      image:
        "https://m.media-amazon.com/images/G/31/MA2025/Augart/SD/Hero/PC/Top-Rated_Premium_Styles_1500x460._CB804860218_.png",
      title: "Exclusive Footwear Deals",
      subtitle: "Step into comfort and style",
      ctaText: "Grab Now",
    },
    {
      image:
        "https://m.media-amazon.com/images/G/31/MA2025/Augart/SD/Hero/PC/Everyday_Essentials_1500x460._CB804860218_.png",
      title: "Accessories for Every Look",
      subtitle: "Complete your outfit",
      ctaText: "Add to Cart",
    },
  ];
  return (
    <div>
      {/* main banner */}
      <div className="grid grid-cols-2 px-20 mt-10  ">
        <img src="https://assets.myntassets.com/w_490,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/30/ee3a926c-e2d8-4f16-86c8-692de71885dc1753883844058-RTF-Prebuzz-Desktop-KV_01.jpg" />
        <img src="https://assets.myntassets.com/w_490,c_limit,fl_progressive,dpr_2.0/assets/images/2025/7/30/19b35e33-94cd-49f3-b756-6dbc0141b4091753883882546-RTF-Prebuzz-Desktop-KV_02.jpg" />
      </div>
      <Banner image={banks_banner} alt="Men's Fashion Banner" />
      <BannerSlider slides={bannerSlides} />
      <PromoBannerSlider slides={promoBannerSliderData} />
      {/* testimonial */}
      <TestimonialSlider />
    </div>
  );
};

export default HomePage;
