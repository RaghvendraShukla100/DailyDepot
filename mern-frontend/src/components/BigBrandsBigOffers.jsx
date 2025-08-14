import React from "react";

const BigBrandsBigOffers = () => {
  const bigBrandsBigOffers = [
    {
      image:
        "https://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/tshirts_558x892._CB804950563_.pnghttps://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/tshirts_558x892._CB804950563_.png",
      brands: ["U.S. Polo Assn.", "Siyaram", "Snitch"],
      category: "Trendy t-shirts",
      discount: "Min. 60% off",
      maxPrice: null,
    },
    {
      image: "",
      brands: ["Levis", "Pepe Jeans"],
      category: "Fave denims",
      discount: "Min. 55% off",
      maxPrice: null,
    },
    {
      image: "",
      brands: ["Allen Solly", "Van Heusen"],
      category: "Classic polos",
      discount: "Min. 55% off",
      maxPrice: null,
    },
    {
      image: "",
      brands: ["United Colors of Benetton", "Highlander"],
      category: "Casual shirts",
      discount: "55–75% off",
      maxPrice: null,
    },
    {
      image: "",
      brands: ["Peter England", "Arrow"],
      category: "9 to 5 edit",
      discount: null,
      maxPrice: 999,
    },
    {
      image: "",
      brands: ["Vastramay", "SOJANYA"],
      category: "Elegant festive wear",
      discount: null,
      maxPrice: 799,
    },
  ];

  return (
    <div className="py-16 bg-white dark:bg-gray-900 rounded-lg">
      <h2 className="text-3xl lg:text-5xl font-thin text-center  text-gray-800 dark:text-gray-200 mb-10">
        Big Brands, Big Offers
      </h2>

      <div className="w-fit lg:w-10/12 mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {bigBrandsBigOffers.map((elm, index) => (
          <div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 rounded-xs overflow-hidden cursor-pointer 
                   transition-transform transform hover:scale-105 dark:shadow-gray-300 shadow-gray-600 hover:shadow-lg duration-300"
          >
            <img
              src={elm.image}
              alt={elm.category}
              className="w-full  object-contain "
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BigBrandsBigOffers;
