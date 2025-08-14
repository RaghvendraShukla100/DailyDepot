import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo2.png";
import {
  FaUser,
  FaHeart,
  FaShoppingBag,
  FaSearch,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import MegaMenu from "./MegaMenu";
import { menuData } from "../data/menuData";

export default function Navbar() {
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const wrapperRef = useRef(null);
  const linkRefs = useRef({});
  const [megaStyle, setMegaStyle] = useState({ left: 0, top: 0, width: 1000 });

  const navigate = useNavigate();
  const navLinks = Object.keys(menuData);

  const computeMegaPosition = (key) => {
    const wrapper = wrapperRef.current;
    const linkEl = linkRefs.current[key];
    if (!wrapper || !linkEl) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();
    const desiredWidth = Math.min(1000, wrapperRect.width);

    let left =
      linkRect.left - wrapperRect.left + linkRect.width / 2 - desiredWidth / 2;
    left = Math.max(0, Math.min(left, wrapperRect.width - desiredWidth));

    const top = wrapperRect.height + 1;
    setMegaStyle({
      left: Math.round(left),
      top: Math.round(top),
      width: Math.round(desiredWidth),
    });
  };

  const handleMouseEnterLink = (key) => {
    computeMegaPosition(key);
    setHoveredMenu(key);
  };

  const handleWrapperMouseLeave = () => {
    setHoveredMenu(null);
  };

  useEffect(() => {
    const onResize = () => {
      if (hoveredMenu) computeMegaPosition(hoveredMenu);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoveredMenu]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleMenuClick = (e) => {
    navigate(`/${e.toLowerCase()}-home-page`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 relative shadow dark:shadow-gray-800 transition-colors duration-300">
      <div
        className="max-w-7xl mx-auto relative"
        ref={wrapperRef}
        onMouseLeave={handleWrapperMouseLeave}
      >
        {/* ===== Top Navbar Row ===== */}
        <div className="flex items-center justify-between px-4 py-3 relative z-50">
          {/* Logo */}
          <Link
            to="/"
            className=" h-12 w-fit flex items-center justify-center  overflow-hidden  "
          >
            <img src={logo} alt="logo" className="h-24  object-cover" />
          </Link>

          {/* Mobile toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="text-gray-700 dark:text-gray-300 text-2xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 font-semibold text-sm text-gray-700 dark:text-gray-300 relative z-50">
            {navLinks.map((link) => (
              <div
                key={link}
                className="group uppercase font-bold text-gray-600 dark:text-gray-300"
                onMouseEnter={() => handleMouseEnterLink(link)}
                onClick={() => handleMenuClick(link)}
              >
                <button
                  ref={(el) => (linkRefs.current[link] = el)}
                  className="cursor-pointer hover:text-pink-600 dark:hover:text-pink-500 px-1 py-1"
                >
                  {link}
                </button>
              </div>
            ))}
          </nav>

          {/* Search & Icons */}
          <div className="hidden lg:flex items-center gap-6 ">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded h-10 w-96 transition-colors duration-300">
              <FaSearch className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="outline-none px-2 w-full text-sm bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link to="/profile" className="flex flex-col items-center z-50">
                <FaUser className="text-xl text-gray-700 dark:text-gray-300" />
                <span className="text-[12px] dark:text-gray-300 font-bold">
                  Profile
                </span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center z-50">
                <FaHeart className="text-xl text-gray-700 dark:text-gray-300" />
                <span className="text-[12px] dark:text-gray-300 font-bold">
                  Wishlist
                </span>
              </Link>
              <Link
                to="/cart"
                className="relative flex flex-col items-center z-50"
              >
                <FaShoppingBag className="text-xl text-gray-700 dark:text-gray-300" />
                <span className="text-[12px] dark:text-gray-300 font-bold">
                  Bag
                </span>
                <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white text-[10px] px-1 rounded-full">
                  3
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* ===== Mega Menu ===== */}
        {hoveredMenu && menuData[hoveredMenu] && (
          <MegaMenu
            columns={menuData[hoveredMenu]}
            style={megaStyle}
            className="mx-0"
          />
        )}
      </div>

      {/* ===== Mobile Overlay ===== */}
      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 right-0 z-[9999] bg-white dark:bg-gray-900 min-h-screen p-4 shadow-lg dark:shadow-gray-800 transition-colors duration-300">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 dark:text-gray-300 text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col gap-4  ">
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 px-2 py-2 rounded transition-colors duration-300">
              <FaSearch className="text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none px-2 w-full text-sm bg-transparent text-gray-800 dark:text-gray-200 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleMenuClick(link)}
                className="text-left text-sm font-bold uppercase text-gray-700 dark:text-gray-300 hover:text-pink-600 dark:hover:text-pink-500"
              >
                {link}
              </button>
            ))}

            <div className="flex justify-around text-sm mt-6">
              <Link to="/profile" className="flex flex-col items-center">
                <FaUser className="text-xl text-gray-700 dark:text-gray-300" />
                <span className="text-[12px] dark:text-gray-300 font-bold">
                  Profile
                </span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center">
                <FaHeart className="text-xl text-gray-700 dark:text-gray-300" />
                <span className="text-[12px] dark:text-gray-300 font-bold">
                  Wishlist
                </span>
              </Link>
              <Link to="/cart" className="relative flex flex-col items-center">
                <FaShoppingBag className="text-xl text-gray-700 dark:text-gray-300" />
                <span className="text-[12px] dark:text-gray-300 font-bold">
                  Bag
                </span>
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
}
