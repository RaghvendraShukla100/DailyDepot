import React from "react";
import TertiaryCard from "./TertiaryCard";

function YouMayAlsoLikeAtCart({ products }) {
  return (
    <div className="w-9/12 border-t border-gray-300 pt-10 mx-auto mb-5  py-2 grid grid-cols-5 gap-y-5 overflow-x-auto">
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
  );
}

export default YouMayAlsoLikeAtCart;
