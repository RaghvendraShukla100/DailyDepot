import React from "react";

function BestOffers() {
  return (
    <div>
      <div className="border-t border-gray-300 pt-6">
        <h3 className="font-bold mb-2">BEST OFFERS</h3>
        <p className="text-sm text-gray-600 mb-4">
          This product is already at its best price
        </p>

        <ul className="space-y-4">
          {[
            {
              title: "10% Discount on IDFC FIRST SWYP Credit Card.",
              details: "Min Spend ₹850, Max Discount ₹350.",
            },
            {
              title: "10% Discount on HSBC Credit Cards.",
              details: "Min Spend ₹5000, Max Discount ₹1500.",
            },
            {
              title: "10% Discount on HDFC Bank Credit & Debit Cards EMI.",
              details: "Min Spend ₹3500, Max Discount ₹1000.",
            },
            {
              title: "7.5% Discount on Myntra Kotak Credit Card.",
              details: "Max Discount up to ₹750 on every spends.",
            },
          ].map((offer, index) => (
            <li key={index}>
              <p className="font-semibold">{offer.title}</p>
              <ul className="list-disc list-inside ml-2 text-gray-600 text-sm">
                <li>{offer.details}</li>
              </ul>
              <button className="text-pink-600 font-semibold text-sm mt-1">
                Terms & Condition
              </button>
            </li>
          ))}

          {/* EMI Option */}
          <li>
            <p className="font-semibold">EMI option available</p>
            <ul className="list-disc list-inside ml-2 text-gray-600 text-sm">
              <li>EMI starting from Rs.273/month</li>
            </ul>
            <button className="text-pink-600 font-semibold text-sm mt-1">
              View Plan
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BestOffers;
