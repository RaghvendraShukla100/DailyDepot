import React from "react";

const CrazyDeals = ({ deals }) => {
  return (
    <div className="bg-white dark:bg-gray-900 py-8">
      {/* Top Banner */}
      <div className="relative bg-orange-500 h-16 flex items-center justify-center">
        <h2 className="text-2xl font-bold text-white tracking-wide">
          CRAZY DEALS
        </h2>
        <span className="absolute right-4 text-white opacity-50 text-xs">
          PRE-RELOADED
        </span>
      </div>

      {/* Deals Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 px-4 lg:px-12">
        {deals.map((deal, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-md shadow hover:shadow-lg overflow-hidden cursor-pointer transition duration-300"
          >
            <img
              src={deal.image}
              alt={deal.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
              {/* Brand logos */}
              <div className="flex justify-center items-center gap-2 mb-2">
                {deal.brands.map((brand, bIdx) => (
                  <img
                    key={bIdx}
                    src={brand}
                    alt="brand"
                    className="h-5 object-contain"
                  />
                ))}
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {deal.caption}
              </p>
              <p className="text-black dark:text-white font-semibold">
                {deal.offer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Example Usage
const dealsData = [
  {
    image: "https://via.placeholder.com/300x200",
    brands: [
      "https://upload.wikimedia.org/wikipedia/commons/2/29/Levis_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/7/7f/USPoloAssn_logo.svg",
    ],
    caption: "All-Day Support",
    offer: "MIN. 30% OFF",
  },
  {
    image: "https://via.placeholder.com/300x200",
    brands: [
      "https://upload.wikimedia.org/wikipedia/commons/6/6a/Jompers_logo.svg",
      "https://upload.wikimedia.org/wikipedia/commons/4/4e/Anouk_logo.svg",
    ],
    caption: "Classic Kurtas",
    offer: "UNDER ₹899",
  },
  // Add more...
];

export default function App() {
  return <CrazyDeals deals={dealsData} />;
}
