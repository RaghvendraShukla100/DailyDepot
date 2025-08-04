import React from "react";

function PriceDetails({
  cartItems,
  totalMRP,
  totalDiscount,
  platformFee,
  finalAmount,
}) {
  return (
    <div className="bg-white p-4 border-t border-gray-200 rounded-xs text-sm space-y-2">
      <strong className="text-gray-700 uppercase">
        PRICE DETAILS ({cartItems.length} Items)
      </strong>
      <div className="flex justify-between mt-2">
        <span>Total MRP</span>
        <span>₹{totalMRP}</span>
      </div>
      <div className="flex justify-between">
        <span>Discount on MRP</span>
        <span className="text-green-600">- ₹{totalDiscount}</span>
      </div>
      <div className="flex justify-between">
        <span>Coupon Discount</span>
        <button className="text-[#ff3f6c] text-xs">Apply Coupon</button>
      </div>
      <div className="flex justify-between">
        <span>
          Platform Fee{" "}
          <button className="text-[#ff3f6c] font-bold text-xs ml-1">
            Know More
          </button>
        </span>
        <span>₹{platformFee}</span>
      </div>

      <div className="flex justify-between font-semibold border-t border-gray-300 mt-2 py-2">
        <span>Total Amount</span>
        <span>₹{finalAmount}</span>
      </div>
    </div>
  );
}

export default PriceDetails;
