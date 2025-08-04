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
    </div>
  );
}

export default HomePage;
