import React from "react";
import { useNavigate } from "react-router-dom";
import SecondaryCard from "../components/SecondaryCard.";
import TertiaryCard from "../components/TertiaryCard";

function HomePage() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/product-details");
  };

  return (
    <div className="h-52 py-10 ">
      <h1 className="text-3xl text-center uppercase font-bold">Home page</h1>
      <button
        className="uppercase  text-2xl  rounded-xs font-thin
        px-3 py-1 block mx-auto bg-[#E31033] text-gray-50  cursor-pointer "
        onClick={handleClick}
      >
        product dettails page
      </button>

      <div className="flex">
        <SecondaryCard
          image="https://i.pinimg.com/736x/bb/5c/0f/bb5c0f0e1febd5115af530e4fcce93af.jpg"
          rating="4.2"
          title="RARE RABBIT"
          subtitle="Slim Fit Casual Shirt"
          price="1999"
          originalPrice="3999"
          discountPercent="50"
        />

        <TertiaryCard
          imageUrl="https://i.pinimg.com/1200x/28/4b/3f/284b3f16e4130fab100e86c3f85014f7.jpg"
          brand="DeoDap"
          title="Rakhi Gift Set"
          price={257}
          originalPrice={1099}
          discount={842}
          onAddToBag={() => console.log("Added to bag")}
        />
      </div>
    </div>
  );
}

export default HomePage;
