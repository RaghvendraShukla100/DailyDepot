import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  const wrapperRef = useRef(null); // the max-w-7xl container
  const linkRefs = useRef({}); // store refs for each nav link
  const [megaStyle, setMegaStyle] = useState({ left: 0, top: 0, width: 1000 });

  const navigate = useNavigate();
  const navLinks = Object.keys(menuData);

  // compute position of megamenu relative to wrapper container
  const computeMegaPosition = (key) => {
    const wrapper = wrapperRef.current;
    const linkEl = linkRefs.current[key];
    if (!wrapper || !linkEl) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const linkRect = linkEl.getBoundingClientRect();

    // desired menu width (clamped to wrapper width)
    const desiredWidth = Math.min(1000, wrapperRect.width);

    // center the menu on the hovered link
    let left =
      linkRect.left - wrapperRect.left + linkRect.width / 2 - desiredWidth / 2;

    // clamp left so megamenu stays inside wrapper
    left = Math.max(0, Math.min(left, wrapperRect.width - desiredWidth));

    const top = wrapperRect.height + 1; // just below the navbar container

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

  // close when mouse leaves the whole wrapper (navbar area + megamenu)
  const handleWrapperMouseLeave = () => {
    setHoveredMenu(null);
  };

  // recompute position when window resizes
  useEffect(() => {
    const onResize = () => {
      if (hoveredMenu) computeMegaPosition(hoveredMenu);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [hoveredMenu]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", mobileMenuOpen);
  }, [mobileMenuOpen]);

  const handleMenuClick = (e) => {
    navigate(`/${e.toLowerCase()}-home-page`);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white relative shadow">
      {/* HOVER WRAPPER — covers navbar row + mega menu */}
      <div
        className="max-w-7xl mx-auto relative"
        ref={wrapperRef}
        onMouseLeave={handleWrapperMouseLeave}
      >
        {/* ===== Top Navbar Row ===== */}
        <div className="flex items-center justify-between px-4 py-3 relative z-50">
          {/* Logo */}
          <Link to="/">
            <h1 className="text-2xl text-pink-600 font-light cursor-pointer select-none">
              DailyDepot
            </h1>
          </Link>

          {/* Mobile toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen((s) => !s)}
              className="text-gray-700 text-2xl"
            >
              {mobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-6 font-semibold text-sm text-gray-700 relative z-50">
            {navLinks.map((link) => (
              <div
                key={link}
                className="group uppercase font-bold text-gray-600"
                onMouseEnter={() => handleMouseEnterLink(link)}
                onClick={() => handleMenuClick(link)}
              >
                <button
                  ref={(el) => (linkRefs.current[link] = el)}
                  className="cursor-pointer hover:text-pink-600 px-1 py-1"
                >
                  {link}
                </button>
              </div>
            ))}
          </nav>

          {/* Search & Icons */}
          <div className="hidden lg:flex items-center gap-6 ">
            <div className="flex items-center bg-gray-100 px-2 py-1 rounded h-10 w-96">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search for products, brands and more"
                className="outline-none px-2 w-full text-sm bg-transparent"
              />
            </div>

            <div className="flex items-center gap-6 text-sm">
              <Link to="/profile" className="flex flex-col items-center z-50">
                <FaUser className="text-xl text-gray-700" />
                <span className="text-[12px] font-bold">Profile</span>
              </Link>
              <Link to="/wishlist" className="flex flex-col items-center z-50">
                <FaHeart className="text-xl text-gray-700" />
                <span className="text-[12px] font-bold">Wishlist</span>
              </Link>
              <Link
                to="/cart"
                className="relative flex flex-col items-center z-50"
              >
                <FaShoppingBag className="text-xl text-gray-700" />
                <span className="text-[12px] font-bold">Bag</span>
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
        <div className="absolute top-0 left-0 right-0 z-[9999] bg-white min-h-screen p-4 shadow-lg">
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-700 text-2xl"
            >
              <FaTimes />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center bg-gray-100 px-2 py-2 rounded">
              <FaSearch className="text-gray-500" />
              <input
                type="text"
                placeholder="Search..."
                className="outline-none px-2 w-full text-sm bg-transparent"
              />
            </div>

            {navLinks.map((link) => (
              <button
                key={link}
                onClick={() => handleMenuClick(link)}
                className="text-left text-sm font-bold uppercase text-gray-700 hover:text-pink-600"
              >
                {link}
              </button>
            ))}

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
}
