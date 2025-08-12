import React from "react";
import BannerSlider from "../components/sliders/BannerSlider";

const GenzHomePage = () => {
  const bannerSlides = [
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/305ab617-b86d-436d-8546-1299360c73b91727680300162-Fwd-Desktop-Banners-----18.jpg",
      title: "Upgrade Your Style",
      subtitle: "Get the latest fashion for men",
      ctaText: "Shop Now",
    },
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/2b2067f5-d60f-4360-add1-04aeef6d68bc1727680300258-Fwd-Desktop-Banners-----15.jpg",
      title: "Big Deals on Top Brands",
      subtitle: "Save up to 60% off",
      ctaText: "Explore",
    },
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/8bfadc1f-3525-4515-be36-83daef61a7bf1727680300193-Fwd-Desktop-Banners-----17.jpg",
      title: "New Arrivals",
      subtitle: "Fresh styles just dropped",
      ctaText: "Check It Out",
    },
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/667c37d3-ac59-4084-ae5c-dc16a6f83a631727680300290-Fwd-Desktop-Banners-----9.jpg",
      title: "Festive Collection",
      subtitle: "Celebrate with trendy looks",
      ctaText: "View Collection",
    },
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/72358184-82e0-413c-aa50-e91b963ee8901727680300324-Fwd-Desktop-Banners-----7.jpg",
      title: "Minimalist Wardrobe",
      subtitle: "Simplify your style",
      ctaText: "Browse Now",
    },
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/ff0b6ca2-68f7-4ffc-8ca2-947c7ed580be1727680300356-Fwd-Desktop-Banners-----3.jpg",
      title: "Exclusive Footwear Deals",
      subtitle: "Step into comfort and style",
      ctaText: "Grab Now",
    },
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/eaf9f96d-445f-4c4d-b8cd-bf047c5cfce21727680806932-Fwd-Desktop-Banners-----10.jpg",
      title: "Accessories for Every Look",
      subtitle: "Complete your outfit",
      ctaText: "Add to Cart",
    },
    {
      image:
        "https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2024/9/30/ad0fde33-0df6-435f-ad4d-d5f711f09b441727680300225-Fwd-Desktop-Banners-----16.jpg",
      title: "Seasonal Specials",
      subtitle: "Limited-time fashion picks",
      ctaText: "Shop the Trend",
    },
  ];
  const fashionCategories = [
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/5f449803-1677-49b5-abc7-b92b582882df1745307759464-image_png_335788666.png",
      title: "FLORAL DRESSES",
      price: "199",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/2285e286-7d93-4850-921d-fb332af21ac71745307759444-image_png978561741.png",
      title: "OVERSIZED TEES",
      price: "199",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/301715a2-5b03-4aa2-878f-491685d601c81745307759423-image_png_445990077.png",
      title: "PENCIL SKIRTS",
      price: "299",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/8702a512-a4f2-4973-abd7-607c419921fa1745307759403-image_png566488576.png",
      title: "MINI SKIRTS",
      price: "299",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/eb56f162-59b9-453d-9438-5aa7458ec3ba1745307759384-image_png_1634649736.png",
      title: "BAGGY JEANS",
      price: "399",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/c8f347f1-9183-437b-a302-86378304723b1745307759361-image_png_939419715.png",
      title: "MAXI DRESSES",
      price: "399",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/5c8f347d-8eb0-4ad5-b48b-c75a73e3130f1745307759341-image_png_1726414633.png",
      title: "CARGO TROUSERS",
      price: "399",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/e1fbcce0-8700-4273-9858-f996f1eadc981745307759319-image_png_578041907.png",
      title: "BOXY FIT SHIRTS",
      price: "299",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/4f39d3e3-996a-4a23-9617-c77fe637c3541745307759254-image_png_1092473617.png",
      title: "GRAPHIC TEES",
      price: "199",
    },
    {
      image:
        "https://assets.myntassets.com/w_196,c_limit,fl_progressive,dpr_2.0/assets/images/2025/4/22/db240ba9-703e-460a-82e9-d8dbc9ea2a761745307759236-image_png_672719967.png",
      title: "BERMUDA SHORTS",
      price: "399",
    },
  ];

  return (
    <div className="w-11/12 mx-auto ">
      <BannerSlider slides={bannerSlides} />

      <h1 className=" uppercase text-2xl lg:text-4xl py-5 lg:py-8 font-semibold">
        biggest deals on the top drips
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-10 gap-y-5 mb-10  mx-auto">
        {fashionCategories.map((elm) => (
          <img src={elm.image} alt={elm.title} className="rounded-xs" />
        ))}
      </div>
    </div>
  );
};

export default GenzHomePage;
