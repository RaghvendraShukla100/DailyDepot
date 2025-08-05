import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaHeart, FaShoppingBag, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  const navLinks = ["MEN", "WOMEN", "KIDS", "HOME", "BEAUTY", "GENZ"];

  const megaMenuItems = {
    MEN: [
      {
        title: "Topwear",
        items: [
          "T-Shirts",
          "Casual Shirts",
          "Formal Shirts",
          "Sweatshirts",
          "Sweaters",
          "Jackets",
          "Blazers & Coats",
          "Suits",
          "Rain Jackets",
        ],
      },
      {
        title: "Bottomwear",
        items: [
          "Jeans",
          "Casual Trousers",
          "Formal Trousers",
          "Shorts",
          "Track Pants & Joggers",
        ],
      },
      {
        title: "Footwear",
        items: [
          "Casual Shoes",
          "Sports Shoes",
          "Formal Shoes",
          "Sneakers",
          "Sandals & Floaters",
          "Flip Flops",
          "Socks",
        ],
      },
      {
        title: "Sports & Active Wear",
        items: [
          "Sports Shoes",
          "Sports Sandals",
          "Active T-Shirts",
          "Track Pants & Shorts",
          "Tracksuits",
          "Jackets & Sweatshirts",
          "Accessories",
          "Swimwear",
        ],
      },
    ],
  };

  return (
    <header className="bg-white shadow-md z-50 relative ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="w-8 h-8 text-2xl text-pink-600 font-light cursor-pointer select-none">
            DailyDepot
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 font-semibold text-sm text-gray-700 relative">
          {navLinks.map((link) => (
            <div
              key={link}
              className="relative group"
              onMouseEnter={() => setHoveredMenu(link)}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <span className="cursor-pointer hover:text-pink-600">{link}</span>

              {/* Mega Menu Dropdown */}
              {hoveredMenu === link && megaMenuItems[link] && (
                <div className="absolute top-full left-0 w-[1000px] bg-white shadow-xl p-6 flex justify-between text-xs text-gray-700 z-40 border-t border-gray-100">
                  {megaMenuItems[link].map((col, idx) => (
                    <div key={idx} className="w-1/4 space-y-2">
                      <h4 className="text-sm font-bold text-pink-600">
                        {col.title}
                      </h4>
                      <ul className="space-y-1">
                        {col.items.map((item, i) => (
                          <li
                            key={i}
                            className="hover:underline cursor-pointer"
                          >
                            {/* You can turn this into a <Link> if you want to route */}
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Search and Icons */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded h-10 w-96 ">
            <FaSearch className="text-gray-500 font-extralight" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className=" outline-none px-2 w-64 text-sm"
            />
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link
              to="/profile"
              className="flex flex-col items-center cursor-pointer"
            >
              <FaUser className="text-xl text-gray-700 " />
              <span className="text-[12px] font-bold">Profile</span>
            </Link>
            <Link
              to="/wishlist"
              className="flex flex-col items-center cursor-pointer"
            >
              <FaHeart className="text-xl text-gray-700 " />
              <span className="text-[12px] font-bold">Wishlist</span>
            </Link>
            <Link
              to="/cart"
              className="relative flex flex-col items-center cursor-pointer"
            >
              <FaShoppingBag className="text-xl text-gray-700 " />
              <span className="text-[12px] font-bold">Bag</span>
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
