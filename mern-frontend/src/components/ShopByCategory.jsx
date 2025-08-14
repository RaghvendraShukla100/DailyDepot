import React from "react";
import CategoryCard from "./cards/CategoryCard";

const categories = [
  {
    title: "T-Shirts",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/b8/60/23/b86023dc4d82ff7be9c532b236321f06.jpg",
    brands: [
      {
        logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/U.S._Polo_Assn._logo.svg",
      },
      {
        logo: "https://seeklogo.com/images/S/smiley-logo-508C4AFA84-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Sports Shoes",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/1200x/5e/a1/f0/5ea1f0d52736523fd43f90aedd15c260.jpg",
    brands: [
      {
        logo: "https://seeklogo.com/images/N/nike-logo-47A65A59D5-seeklogo.com.png",
      },
      {
        logo: "https://seeklogo.com/images/A/adidas-logo-107B082DA0-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Shirts",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/8f/28/ca/8f28ca0a7df548d930499cc262d9ad9c.jpg",
    brands: [
      {
        logo: "https://seeklogo.com/images/L/louis-philippe-logo-AC449C6273-seeklogo.com.png",
      },
      {
        logo: "https://seeklogo.com/images/P/peter-england-logo-0DDF1BD60D-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Jeans",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/1200x/1b/b1/d3/1bb1d3f81e32cec5103580e388a7fb75.jpg",
    brands: [
      {
        logo: "https://seeklogo.com/images/L/levi-s-logo-6857A0F26E-seeklogo.com.png",
      },
      {
        logo: "https://seeklogo.com/images/D/denizen-logo-EDB0E9ADAD-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Kurtas & Sets",
    discount: "50-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/c5/50/ae/c550aea67a2879473c6a858b340190bd.jpg",
    brands: [
      {
        logo: "https://seeklogo.com/images/B/biba-logo-2A832086B4-seeklogo.com.png",
      },
      {
        logo: "https://seeklogo.com/images/A/aurelia-logo-6999B051E1-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Trousers",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/af/40/b7/af40b7d0fe492b59d88ed268abb32de1.jpg",
    brands: [
      {
        logo: "https://seeklogo.com/images/V/van-heusen-logo-417C4936DE-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Track Pants",
    discount: "UP TO 80% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/track-pant/m/x/l/-original-imagzbfngqznjfbf.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/P/puma-logo-694B181AA6-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Loungewear",
    discount: "UP TO 80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/04/67/24/046724307c8ec66b8a91e5a0e7814520.jpg",
    brands: [
      {
        logo: "https://seeklogo.com/images/J/jockey-logo-7F65B48F21-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Innerwear",
    discount: "UP TO 70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/ksoz53k0/brief/x/t/y/l-3briefw27-pw-peter-england-original-imag67w8hffvhsdb.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/J/jockey-logo-7F65B48F21-seeklogo.com.png",
      },
      {
        logo: "https://seeklogo.com/images/P/peter-england-logo-0DDF1BD60D-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Belts & Wallets",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/wallet-card-wallet/e/r/z/-original-imagpg8ghg8ktxyj.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/W/wildhorn-logo-02512B4C2F-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Sunglasses & Frames",
    discount: "30-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/l4n2oi80/sunglass/f/i/j/free-size-wrap-around-1-uv-protected-sunglasses-king-kart-original-imagfh3txesdx4fg.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/R/ray-ban-logo-28D8B67B87-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Kids Wear",
    discount: "50-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/kids-dress/k/l/o/7-8-years-ttkc000702-tinytales-original-imagzvhuvsufgkxz.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/C/chicco-logo-7C4FBAE5B0-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Home Furnishings",
    discount: "40-70% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/1200x/bc/76/ce/bc76ceeab382aacdbe95e08885c74989.jpg",
    brands: [
      {
        logo: "https://seeklogo.com/images/P/pepperfry-logo-FF14F63685-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Casual Shoes",
    discount: "40-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/z/u/k/-original-imagrp5gryyygdgt.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/B/bata-logo-5F5E2FA981-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Flip-Flops",
    discount: "30-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/slipper-flip-flop/y/z/1/-original-imagtzbckhq3fh4f.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/H/havaianas-logo-9B897A8D6E-seeklogo.com.png",
      },
    ],
  },
  {
    title: "Activewear",
    discount: "30-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/jacket/f/k/1/l-no-pmhd03480-biba-original-imagsz6yrfzybn4c.jpeg",
    brands: [
      {
        logo: "https://seeklogo.com/images/N/nykaa-fashion-logo-6B8F3E8CF8-seeklogo.com.png",
      },
    ],
  },
];

const ShopByCategory = () => {
  return (
    <div className="mx-auto py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Heading */}
      <h1 className="py-6 text-center text-4xl font-thin tracking-wide capitalize text-blue-700 dark:text-gray-100">
        Shop by Category
      </h1>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 w-11/12 mx-auto">
        {categories.map((cat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Info Section */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800">
              {/* Brand Logos */}
              <div className="flex items-center gap-2 mb-2">
                {cat?.brands?.map((brand, i) => (
                  <img
                    key={i}
                    src={brand.logo}
                    alt="brand"
                    className="h-4 object-contain"
                  />
                ))}
                {cat.brands.length > 1 && (
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    & more
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-sm font-medium text-gray-800 dark:text-gray-100">
                {cat.title}
              </h3>

              {/* Discount */}
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">
                {cat.discount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
