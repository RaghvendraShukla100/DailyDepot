import React from "react";

const limitedTimeOffers = [
  {
    image:
      "https://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/tshirts_558x892._CB804950563_.png",
    brands: ["U.S. Polo Assn.", "Siyaram", "Snitch"],
    category: "Trendy t-shirts",
    discount: "Min. 60% off",
    maxPrice: null,
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/denim_558x892._CB804950567_.png",
    brands: ["Levis", "Pepe Jeans"],
    category: "Fave denims",
    discount: "Min. 55% off",
    maxPrice: null,
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/polos_558x892._CB804950566_.png",
    brands: ["Allen Solly", "Van Heusen"],
    category: "Classic polos",
    discount: "Min. 55% off",
    maxPrice: null,
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/shirts_558x892._CB804950566_.png",
    brands: ["United Colors of Benetton", "Highlander"],
    category: "Casual shirts",
    discount: "55–75% off",
    maxPrice: null,
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/formalwear_558x892._CB804950566_.png",
    brands: ["Peter England", "Arrow"],
    category: "9 to 5 edit",
    discount: null,
    maxPrice: 999,
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/img22/Meghana/AugART25/limited/V2/festivewear_558x892._CB804950566_.png",
    brands: ["Vastramay", "SOJANYA"],
    category: "Elegant festive wear",
    discount: null,
    maxPrice: 799,
  },
];

const LimitedTimeOffer = () => {
  return (
    <div className="my-10">
      <h2 className="text-3xl lg:text-6xl capitalize text-gray-700 py-5 text-center font-bold mb-4">
        Limited Time Offers
      </h2>
      <div className="w-fit mx-auto  grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {limitedTimeOffers.map((offer, index) => (
          <div
            key={index}
            className="bg-white rounded-xs w-38 h-full   overflow-hidden
             cursor-pointer shadow-xs hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={offer.image}
              alt={offer.category}
              className="w-full h-auto"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LimitedTimeOffer;
