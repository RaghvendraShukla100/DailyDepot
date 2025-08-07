import React from "react";
import TertiaryCard from "./cards/TertiaryCard";

function YouMayAlsoLikeAtCart({ products }) {
  return (
    <div className="w-fit border-t mt-10 border-gray-300 mx-auto hidden md:block">
      <h1 className="font-bold uppercase text-gray-700 py-5">
        you may also lie:
      </h1>
      <div
        className="w-fit   mx-auto mb-5  py-2 grid 
      grid-cols-2 md:grid-cols-3 gap-x-10 lg:gap-x-4 lg:grid-cols-5 gap-y-5 overflow-x-auto"
      >
        {products.map((product, index) => (
          <TertiaryCard
            key={index}
            imageUrl={product.imageUrl}
            brand={product.brand}
            title={product.title}
            price={product.price}
            originalPrice={product.originalPrice}
            discount={product.discount}
            onAddToBag={() => console.log(`Added ${product.title} to bag`)}
          />
        ))}
      </div>
    </div>
  );
}

export default YouMayAlsoLikeAtCart;
