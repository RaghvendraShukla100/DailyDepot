import React from "react";
import DetailedPageHeading from "../components/DetailedPageHeading";
import ProductImageDisplay from "../components/ProductImageDisplay"; // If using image display
import ProductInfoMini from "../components/ProductInfoMini";
import ProductRatingMini from "../components/ProductRatingMini";
import PriceSection from "../components/PriceSection";
import ColorOptions from "../components/ColorOptions";
import SizeSelector from "../components/SizeSelector";
import ActionButtons from "../components/ActionButtons";
import DeliveryOptions from "../components/DeliveryOptions";
import BestOffers from "../components/BestOffers";
import ProductDetailsInfo from "../components/ProductDetailsInfo";
import ProductRatings from "../components/ProductRatings";
import CustomerReviews from "../components/CustomerReviews";
import ProductSellerInfo from "../components/ProductSellerInfo";
import SimilarProduct from "../components/SimilarProduct";
import CustomerAlsoLike from "../components/CustomerAlsoLike";

const ProductDetailsPage = () => {
  const productImages = [
    "https://m.media-amazon.com/images/I/614nEjLc5PL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/616G95Z3n5L._SX679_.jpg",
    "https://m.media-amazon.com/images/I/611ufNJ++0L._SX679_.jpg",
    "https://m.media-amazon.com/images/I/51NgwEMWbEL._SX679_.jpg",
    "https://m.media-amazon.com/images/I/91mjOMVVJ-L._SX679_.jpg",
    "https://m.media-amazon.com/images/I/91sSw1ltiiL._SX679_.jpg",
  ];
  const reviews = [
    {
      rating: 5,
      text: "Nice good looking 😊",
      author: "Sandeep Dabas",
      date: "20 Mar 2025",
      likes: 0,
      dislikes: 0,
    },
    {
      rating: 5,
      text: "Very good product",
      author: "Roshan Deep",
      date: "20 Apr 2025",
      likes: 0,
      dislikes: 0,
    },
    {
      rating: 5,
      text: "Good fit and great quality product. Excellent fabric",
      author: "Manali",
      date: "8 Mar 2025",
      likes: 1,
      dislikes: 0,
    },
  ];

  const points = [
    "Notch lapel collar with brand pin",
    "Single-breasted with double button closure",
    "Long sleeves with buttoned cuffs",
    "Six pockets",
    "Double-vented back hem",
    "Checked pattern",
    "Knitted",
    "Brand fit: Zero calorie fit",
    "Fit mapping: Slim fit",
  ];

  const sizeAndFit = [
    "Regular-fit",
    "The model (height 6') is wearing a size M",
  ];

  const materialAndCare = [
    "70% Polyester, 19% Viscose Rayon & 11% Lycra",
    "Dry Clean",
  ];

  const specifications = [
    { label: "Closure", value: "Button" },
    { label: "Collar", value: "Notched Lapel" },
    { label: "Fabrics", value: "Polyester" },
    { label: "Fit", value: "Regular Fit" },
    { label: "Front Styling", value: "Single-Breasted" },
    { label: "Length", value: "Regular" },
    { label: "Lining Fabric", value: "Polyester" },
    { label: "Net Quantity Unit", value: "Piece" },
  ];

  const handleSeeMore = () => {
    console.log("See more clicked");
  };

  return (
    <div className="px-4 py-6">
      <DetailedPageHeading />

      <div className="mt-6 grid grid-cols-1  md:grid-cols-2 gap-8">
        <ProductImageDisplay images={productImages} />
        <div className="space-y-4">
          <ProductInfoMini />
          <ProductRatingMini />
          <PriceSection />
          <ColorOptions />
          <SizeSelector />
          <div className="mt-8 space-y-6 text-sm text-gray-800">
            <ActionButtons />
            <DeliveryOptions />
          </div>
          <BestOffers />
          <ProductDetailsInfo
            title="Product Details"
            points={points}
            sizeAndFit={sizeAndFit}
            materialAndCare={materialAndCare}
            specifications={specifications}
            showSeeMore={true}
            onSeeMoreClick={handleSeeMore}
          />
          <ProductRatings />
          <CustomerReviews reviews={reviews} />
          <ProductSellerInfo />
        </div>
      </div>
      <SimilarProduct />
      <CustomerAlsoLike />
    </div>
  );
};

export default ProductDetailsPage;
