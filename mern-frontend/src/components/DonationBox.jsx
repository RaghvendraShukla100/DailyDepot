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
    <div className="mt-4 ">
      <div className="text-xs font-semibold text-gray-500 mb-2">
        SUPPORT TRANSFORMATIVE SOCIAL WORK IN INDIA
      </div>
      <div className="flex items-center mb-4">
        <input
          type="checkbox"
          id="donate"
          className="w-5 h-5 mr-2 accent-gray-600"
          checked={checked}
          onChange={handleCheckbox}
        />
        <label
          htmlFor="donate"
          className="font-bold text-base text-gray-800 select-none cursor-pointer"
        >
          Donate and make a difference
        </label>
      </div>
      <div className="grid grid-cols-4">
        {donationOptions.map((opt) => (
          <button
            key={opt}
            className={`rounded-full border border-gray-300 w-14 h-7 flex items-center justify-center  py-1 text-base font-semibold transition
              ${
                amount === opt && checked
                  ? "bg-green-100 border-green-700"
                  : "bg-white"
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
