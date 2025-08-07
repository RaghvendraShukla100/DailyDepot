import React from "react";
import DonationBox from "../components/DonationBox";
import CouponBox from "../components/CouponBox";
import AddressBox from "../components/AddressBox";
import OffersBox from "../components/OffersBox";
import CartSelectionBar from "../components/CartSelectionBar";
import CartItem from "../components/CartItem";
import AddMoreFromWishlist from "../components/AddMoreFromWishlist";
import PriceDetails from "../components/PriceDetails";
import PlaceOrderButton from "../components/PlaceOrderButton";
import YouMayAlsoLikeAtCart from "../components/YouMayAlsoLikeAtCart";

const CartPage = () => {
  const cartItems = [
    {
      image:
        "https://i.pinimg.com/736x/bb/5c/0f/bb5c0f0e1febd5115af530e4fcce93af.jpg",
      brand: "RARE RABBIT",
      title: "Men Melfi Brown Slim Fit Tartan Check Shirt",
      price: 1999,
      originalPrice: 3999,
      discount: 2000,
      qty: 1,
      size: "36",
      left: 7,
      deliveryDate: "7 Aug 2025",
      seller: "RADHAMANI TEXTILES PVT LTD",
    },
    {
      image:
        "https://i.pinimg.com/736x/a9/5c/62/a95c62f7084d5573555a1fe73fb7ef66.jpg",
      brand: "H&M",
      title: "Men Slim Fit Casual Shirt - Blue",
      price: 1499,
      originalPrice: 2999,
      discount: 1500,
      qty: 1,
      size: "40",
      left: 4,
      deliveryDate: "8 Aug 2025",
      seller: "H&M India",
    },
  ];
  const sampleProducts = [
    {
      imageUrl:
        "https://i.pinimg.com/1200x/28/4b/3f/284b3f16e4130fab100e86c3f85014f7.jpg",
      brand: "DeoDap",
      title: "Rakhi Gift Set",
      price: 257,
      originalPrice: 1099,
      discount: 842,
    },
    {
      imageUrl:
        "https://i.pinimg.com/1200x/46/16/26/4616267d3aee3a5f27119558b33aa629.jpg",
      brand: "Fashionista",
      title: "Trendy Denim Jacket",
      price: 1299,
      originalPrice: 1999,
      discount: 700,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/42/10/75/421075cf3883adf6c91186ab0868b9c0.jpg",
      brand: "AltoWear",
      title: "Classic Leather Wallet",
      price: 799,
      originalPrice: 1299,
      discount: 500,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/0a/b1/51/0ab1516bda14d4343d78b80d93532987.jpg",
      brand: "UrbanTrend",
      title: "Sporty Running Shoes",
      price: 2399,
      originalPrice: 3999,
      discount: 1600,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/21/43/e6/2143e698b7d18d442c450842a84b4ee0.jpg",
      brand: "Zenith",
      title: "Elegant Wristwatch",
      price: 4999,
      originalPrice: 6999,
      discount: 2000,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/67/a3/e1/67a3e1861320537e87d8226598f3cb3e.jpg",
      brand: "EcoWear",
      title: "Organic Cotton T-Shirt",
      price: 399,
      originalPrice: 799,
      discount: 400,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/42/10/75/421075cf3883adf6c91186ab0868b9c0.jpg",
      brand: "AltoWear",
      title: "Classic Leather Wallet",
      price: 799,
      originalPrice: 1299,
      discount: 500,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/04/59/22/045922d6399d5863f7b0c162c345b1dc.jpg",
      brand: "LuxeDesign",
      title: "Designer Handbag",
      price: 3599,
      originalPrice: 4999,
      discount: 1400,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/85/0e/a6/850ea62069e3196398d581e9d8e3e0ee.jpg",
      brand: "SwiftStyle",
      title: "Casual Polo Shirt",
      price: 699,
      originalPrice: 1299,
      discount: 600,
    },
    {
      imageUrl:
        "https://i.pinimg.com/236x/94/49/c2/9449c2871674a1d6a72ee8e2b385e3e0.jpg",
      brand: "Glide",
      title: "Comfort Fit Jeans",
      price: 1599,
      originalPrice: 2499,
      discount: 900,
    },
  ];

  const totalMRP = cartItems.reduce((sum, item) => sum + item.originalPrice, 0);
  const totalDiscount = cartItems.reduce((sum, item) => sum + item.discount, 0);
  const platformFee = 20;
  const finalAmount = totalMRP - totalDiscount + platformFee;

  return (
    <div>
      <div
        className="flex flex-col  border-gray-500 lg:w-[1000px] mx-auto lg:flex-row px-4 pt-4 md:pb-4
      lg:p-10 min-h-screen gap-6"
      >
        <div className=" flex-1 space-y-6">
          <AddressBox />
          <div className="hidden">
            <OffersBox />
          </div>
          <CartSelectionBar />
          {cartItems.map((item, index) => (
            <CartItem key={index} cartItem={item} />
          ))}
          <AddMoreFromWishlist />
        </div>
        <div className="lg:border-l border-gray-300 pl-5 w-full lg:w-[320px] space-y-6">
          <CouponBox />
          <DonationBox />
          <PriceDetails
            cartItems={cartItems}
            totalMRP={totalMRP}
            totalDiscount={totalDiscount}
            platformFee={platformFee}
            finalAmount={finalAmount}
          />
          {/* Sticky on mobile */}
          <div
            className="block md:hidden fixed bottom-0  left-0 right-0 z-50
           bg-white   px-8"
          >
            <PlaceOrderButton />
          </div>

          {/* Normal position on desktop */}
          <div className="hidden md:block  ">
            <PlaceOrderButton />
          </div>
        </div>
      </div>
      <YouMayAlsoLikeAtCart products={sampleProducts} />
    </div>
  );
};

export default CartPage;
