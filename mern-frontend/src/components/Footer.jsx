// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiGoogleplay, SiAppstore } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="hidden md:block bg-gray-100 dark:bg-gray-950 text-gray-700 dark:text-gray-200 px-6 py-12 text-sm transition-colors duration-300">
      <div className="max-w-7xl w-4/5 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* ONLINE SHOPPING */}
        <div>
          <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
            ONLINE SHOPPING
          </h4>
          <ul className="space-y-1">
            {[
              "Men",
              "Women",
              "Kids",
              "Home",
              "Beauty",
              "Genz",
              "Gift Cards",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* CUSTOMER POLICIES */}
        <div>
          <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
            CUSTOMER POLICIES
          </h4>
          <ul className="space-y-1">
            {[
              "Contact Us",
              "FAQ",
              "T&C",
              "Terms Of Use",
              "Track Orders",
              "Shipping",
              "Cancellation",
              "Returns",
              "Privacy policy",
              "Grievance Redressal",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* GUARANTEE & RETURNS */}
        <div className="space-y-6">
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-100">
              100% ORIGINAL
            </p>
            <p>guarantee for all products at myntra.com</p>
          </div>
          <div>
            <p className="font-bold text-gray-800 dark:text-gray-100">
              Return within 14 days
            </p>
            <p>of receiving your order</p>
          </div>
        </div>

        {/* USEFUL LINKS */}
        <div>
          <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
            USEFUL LINKS
          </h4>
          <ul className="space-y-1">
            {[
              "Blog",
              "Careers",
              "Site Map",
              "Corporate Information",
              "Whitehat",
              "Cleartrip",
            ].map((item) => (
              <li
                key={item}
                className="hover:text-gray-900 dark:hover:text-white cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* POPULAR SEARCHES */}
      <div className="border-t border-gray-300 dark:border-gray-600 w-4/5 pt-3 mt-5 mx-auto">
        <h4 className="font-bold mb-2 text-gray-800 dark:text-gray-100">
          POPULAR SEARCHES
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Adidas | Arrow | Fila | Online Shopping | Nike | Pepe Jeans | Puma |
          United Colors Of Benetton | Fastrack | Shorts | Being Human | Skirts |
          Woodland | Supra | Dresses | Clothing | Jewellery | T Shirts | Shoes |
          Bags | Watches | Caps | Shirts | Backpacks | Flip Flops | Sunglasses |
          Kurtas | Lingerie | Jackets | Skechers | Saree | Formal Trousers | Men
          Formal Trousers | Puma Tshirts | Woodland Shoes | Titan Watches |
          Fastrack Watches | Wrangler Shirts | Adidas Tshirts | Nike Shoes |
          Casual Shoes | Running Shoes | Nike Sports Shoes | Jeans | Being Human
          Tshirts
        </p>
      </div>
    </footer>
  );
};

export default Footer;
