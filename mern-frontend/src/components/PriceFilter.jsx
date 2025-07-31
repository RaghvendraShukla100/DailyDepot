import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const PriceFilter = () => {
  const [priceRange, setPriceRange] = useState([200, 2400]);

  const handleChange = (value) => {
    setPriceRange(value);
  };

  return (
    <div className="border p-4">
      <h2 className="font-semibold text-sm mb-2">PRICE</h2>
      <Slider
        range
        min={0}
        max={5000}
        defaultValue={[200, 2400]}
        onChange={handleChange}
        trackStyle={[{ backgroundColor: "#f73b81", height: 4 }]}
        handleStyle={[
          { borderColor: "#f73b81", backgroundColor: "#fff" },
          { borderColor: "#f73b81", backgroundColor: "#fff" },
        ]}
        railStyle={{ backgroundColor: "#eee", height: 4 }}
      />
      <div className="mt-2 text-sm font-medium">
        ₹{priceRange[0]} - ₹{priceRange[1] >= 5000 ? "5,000+" : priceRange[1]}
      </div>
    </div>
  );
};

export default PriceFilter;
