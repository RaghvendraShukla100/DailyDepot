import React, { useState } from "react";

const DonationBox = () => {
  const [checked, setChecked] = useState(false);
  const [amount, setAmount] = useState(null);
  const donationOptions = [10, 20, 50, 100];

  const handleCheckbox = () => {
    if (!checked) {
      setChecked(true);
      setAmount(10); // Set default to ₹10 when checked
    } else {
      setChecked(false);
      setAmount(null); // Deselect amount when unchecked
    }
  };

  return (
    <div className="bg-green-100 border border-b border-gray-300 lg:border-x-0 lg:border-t-0 rounded-xs p-4 sm:p-5">
      <div className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
        SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
      </div>

      <div className="flex items-center flex-wrap mb-4 gap-2">
        <input
          type="checkbox"
          id="donate"
          className="w-5 h-5 accent-gray-600"
          checked={checked}
          onChange={handleCheckbox}
        />
        <label
          htmlFor="donate"
          className="font-bold text-sm sm:text-base text-gray-800 select-none cursor-pointer"
        >
          Donate and make a difference
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {donationOptions.map((opt) => (
          <button
            key={opt}
            className={`rounded-full border w-full h-8 sm:h-9 flex items-center justify-center text-sm sm:text-base font-semibold transition
              ${
                amount === opt && checked
                  ? "bg-green-100 border-green-700"
                  : "bg-white border-gray-300"
              }
              ${!checked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}
            `}
            disabled={!checked}
            onClick={() => checked && setAmount(opt)}
            type="button"
          >
            ₹{opt}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DonationBox;
