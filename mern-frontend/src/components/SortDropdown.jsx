import { useEffect, useRef, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const sortOptions = [
  "Recommended",
  "What's New",
  "Popularity",
  "Better Discount",
  "Price: High to Low",
  "Price: Low to High",
  "Customer Rating",
];

const SortDropdown = () => {
  const [selected, setSelected] = useState("Recommended");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setOpen((prev) => !prev);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-64 text-sm font-normal">
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-between border border-gray-300 px-4 py-2 bg-white cursor-pointer hover:shadow"
      >
        <span>
          <span className="text-gray-600">Sort by :</span>{" "}
          <span className="font-semibold text-black">{selected}</span>
        </span>
        <FaChevronDown className="text-gray-600 text-xs ml-2" />
      </div>

      {open && (
        <div className="absolute z-50 w-full bg-white border border-gray-300 mt-1 shadow-md">
          {sortOptions.map((option) => (
            <div
              key={option}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                selected === option
                  ? "font-semibold text-black"
                  : "text-gray-700"
              }`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SortDropdown;
