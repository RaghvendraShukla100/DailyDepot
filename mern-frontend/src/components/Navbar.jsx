import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const Navbar = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navLinks = ["MEN", "WOMEN", "electronics", "Decore", "BEAUTY", "GENZ"];

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

  const handleMenuClick = (e) => {
    navigate(`/${e.toLowerCase()}-home-page`);
    setMobileMenuOpen(false); // Close menu on mobile
  };

  // Lock/unlock body scroll when mobile menu toggles
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [mobileMenuOpen]);

  return (
    <header className="bg-white shadow-md z-50 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-2xl text-pink-600 font-light cursor-pointer select-none">
            DailyDepot
          </h1>
        </Link>

        {/* Hamburger (Mobile Only) */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-gray-700 text-2xl focus:outline-none cursor-pointer"
          >
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 font-semibold text-sm text-gray-700 relative">
          {navLinks.map((link) => (
            <div
              key={link}
              className="relative group uppercase font-bold text-gray-600"
              onMouseEnter={() => setHoveredMenu(link)}
              onMouseLeave={() => setHoveredMenu(null)}
              onClick={() => handleMenuClick(link)}
            >
              <span className="cursor-pointer hover:text-pink-600">{link}</span>

              {/* Mega Menu - Desktop Only */}
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

        {/* Search + Icons (Desktop Only) */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="flex items-center bg-gray-100 px-2 py-1 rounded h-10 w-96">
            <FaSearch className="text-gray-500" />
            <input
              type="text"
              placeholder="Search for products, brands and more"
              className="outline-none px-2 w-full text-sm bg-transparent"
            />
          </div>

          <div className="flex items-center gap-6 text-sm">
            <Link to="/profile" className="flex flex-col items-center">
              <FaUser className="text-xl text-gray-700" />
              <span className="text-[12px] font-bold">Profile</span>
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center">
              <FaHeart className="text-xl text-gray-700" />
              <span className="text-[12px] font-bold">Wishlist</span>
            </Link>
            <Link to="/cart" className="relative flex flex-col items-center">
              <FaShoppingBag className="text-xl text-gray-700" />
              <span className="text-[12px] font-bold">Bag</span>
              <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                3
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 right-0 z-[9999] bg-white min-h-screen p-4 shadow-lg">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Mobile Search */}
            <div className="flex items-center bg-gray-100 px-2 py-2 rounded">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none px-2 w-full text-sm bg-transparent"
              />
            </div>

            {/* Nav Links */}
            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleMenuClick(link)}
                className="text-left text-sm font-bold uppercase text-gray-700 hover:text-pink-600"
              >
                {link}
              </button>
            ))}

            {/* Icons */}
            <div className="flex justify-around text-sm mt-6">
              <Link to="/profile" className="flex flex-col items-center">
                <FaUser className="text-xl text-gray-700" />
                <span className="text-[12px] font-bold">Profile</span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center">
                <FaHeart className="text-xl text-gray-700" />
                <span className="text-[12px] font-bold">Wishlist</span>
              </Link>
              <Link to="/cart" className="relative flex flex-col items-center">
                <FaShoppingBag className="text-xl text-gray-700" />
                <span className="text-[12px] font-bold">Bag</span>
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
