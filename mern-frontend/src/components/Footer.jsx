// Footer.jsx
import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import { SiGoogleplay, SiAppstore } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="bg-gray-100  text-gray-700 px-6 py-12 text-sm">
      <div className="max-w-7xl  w-4/5 mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
        {/* ONLINE SHOPPING */}
        <div>
          <h4 className="font-bold mb-2">ONLINE SHOPPING</h4>
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
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* CUSTOMER POLICIES */}
        <div>
          <h4 className="font-bold mb-2">CUSTOMER POLICIES</h4>
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
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        {/* GUARANTEE & RETURNS */}
        <div className="space-y-6">
          <div>
            <p className="font-bold">100% ORIGINAL</p>
            <p>guarantee for all products at myntra.com</p>
          </div>
          <div>
            <p className="font-bold">Return within 14 days</p>
            <p>of receiving your order</p>
          </div>
        </div>
        <div>
          <h4 className="font-bold mb-2">USEFUL LINKS</h4>
          <ul className="space-y-1">
            {[
              "Blog",
              "Careers",
              "Site Map",
              "Corporate Information",
              "Whitehat",
              "Cleartrip",
            ].map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* USEFUL LINKS & POPULAR SEARCHES */}

      <div className="">
        <div className="border-t border-gray-300  w-4/5 pt-3 mt-5 mx-auto">
          <h4 className="font-bold mb-2">POPULAR SEARCHES</h4>
          <p className="text-sm text-gray-500">
            Adidas | Arrow | Fila | Online Shopping | Nike | Pepe Jeans | Puma |
            United Colors Of Benetton | Fastrack | Shorts | Being Human | Skirts
            | Woodland | Supra | Dresses | Clothing | Jewellery | T Shirts |
            Shoes | Bags | Watches | Caps | Shirts | Backpacks | Flip Flops |
            Sunglasses | Kurtas | Lingerie | Jackets | Skechers | Saree | Formal
            Trousers | Men Formal Trousers | Puma Tshirts | Woodland Shoes |
            Titan Watches | Fastrack Watches | Wrangler Shirts | Adidas Tshirts
            | Nike Shoes | Casual Shoes | Running Shoes | Nike Sports Shoes |
            Jeans | Being Human Tshirts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
