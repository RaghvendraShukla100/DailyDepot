import React from "react";
import CategoryCard from "./cards/CategoryCard";

const categories = [
  {
    title: "T-Shirts",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/b8/60/23/b86023dc4d82ff7be9c532b236321f06.jpg",
  },
  {
    title: "Sports Shoes",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/1200x/5e/a1/f0/5ea1f0d52736523fd43f90aedd15c260.jpg",
  },
  {
    title: "Shirts",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/8f/28/ca/8f28ca0a7df548d930499cc262d9ad9c.jpg",
  },
  {
    title: "Jeans",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/1200x/1b/b1/d3/1bb1d3f81e32cec5103580e388a7fb75.jpg",
  },
  {
    title: "Kurtas & Sets",
    discount: "50-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/c5/50/ae/c550aea67a2879473c6a858b340190bd.jpg",
  },
  {
    title: "Trousers",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/af/40/b7/af40b7d0fe492b59d88ed268abb32de1.jpg",
  },
  {
    title: "Track Pants",
    discount: "UP TO 80% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/track-pant/m/x/l/-original-imagzbfngqznjfbf.jpeg",
  },
  {
    title: "Loungewear",
    discount: "UP TO 80% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/736x/04/67/24/046724307c8ec66b8a91e5a0e7814520.jpg",
  },
  {
    title: "Innerwear",
    discount: "UP TO 70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/ksoz53k0/brief/x/t/y/l-3briefw27-pw-peter-england-original-imag67w8hffvhsdb.jpeg",
  },
  {
    title: "Belts & Wallets",
    discount: "40-80% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/wallet-card-wallet/e/r/z/-original-imagpg8ghg8ktxyj.jpeg",
  },
  {
    title: "Sunglasses & Frames",
    discount: "30-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/l4n2oi80/sunglass/f/i/j/free-size-wrap-around-1-uv-protected-sunglasses-king-kart-original-imagfh3txesdx4fg.jpeg",
  },
  {
    title: "Kids Wear",
    discount: "50-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/kids-dress/k/l/o/7-8-years-ttkc000702-tinytales-original-imagzvhuvsufgkxz.jpeg",
  },
  {
    title: "Home Furnishings",
    discount: "40-70% OFF",
    cta: "Shop Now",
    image:
      "https://i.pinimg.com/1200x/bc/76/ce/bc76ceeab382aacdbe95e08885c74989.jpg",
  },
  {
    title: "Casual Shoes",
    discount: "40-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/shoe/z/u/k/-original-imagrp5gryyygdgt.jpeg",
  },
  {
    title: "Flip-Flops",
    discount: "30-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/slipper-flip-flop/y/z/1/-original-imagtzbckhq3fh4f.jpeg",
  },
  {
    title: "Activewear",
    discount: "30-70% OFF",
    cta: "Shop Now",
    image:
      "https://rukminim1.flixcart.com/image/612/612/xif0q/jacket/f/k/1/l-no-pmhd03480-biba-original-imagsz6yrfzybn4c.jpeg",
  },
];

const ShopByCategory = () => {
  return (
    <div>
      <h1 className="uppercase text-2xl sm:text-3xl lg:text-5xl text-[#4a2f34] py-10 font-bold text-center">
        shop by category
      </h1>
      <div className="grid grid-cols-2 lg:grid-cols-6 w-fit  gap-3 mx-auto">
        {categories.map((cat, index) => (
          <CategoryCard
            key={index}
            image={cat.image}
            title={cat.title}
            discount={cat.discount}
            cta={cat.cta}
          />
        ))}
      </div>
    </div>
  );
};

export default ShopByCategory;
