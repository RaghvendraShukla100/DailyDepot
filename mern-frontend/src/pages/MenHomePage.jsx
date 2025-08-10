import React from "react";
import ShopByCategory from "../components/ShopByCategory";
import Banner from "../components/Banner";
import LimitedTimeOffer from "../components/LimitedTimeOffer";
import BigBrandsBigOffers from "../components/BigBrandsBigOffers";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.webp";
import BannerSlider from "../components/sliders/BannerSlider";

const MenHomePage = () => {
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

  return (
    <div className="my-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-xl mx-auto space-y-10">
        <Banner image={banner1} alt="Men's Fashion Banner" />
        <Banner image={banner2} alt="Men's Fashion Banner" />
        <LimitedTimeOffer />
        <BigBrandsBigOffers />
        <BannerSlider slides={bannerSlides} />
        <ShopByCategory />
      </div>
    </div>
  );
};

export default MenHomePage;
