import React from "react";
import { Link } from "react-router-dom";

// Breadcrumb items as per your screenshot
const breadcrumbItems = [
  { label: "Home", path: "/" },
  { label: "Clothing", path: "/clothing" },
  { label: "Women Clothing", path: "/women-clothing" },
  { label: "Sarees", path: "/sarees" },
  { label: "Kasee Sarees", path: null, bold: true },
  { label: "More By Kasee", path: null, bold: true, darkBlue: true },
];

const DetailedPageHeading = () => {
  return (
    <nav className="text-sm text-[#1a1a1a] px-4 py-2 font-sans">
      <ol className="flex flex-wrap items-center">
        {breadcrumbItems.map((item, index) => {
          const isLast = index === breadcrumbItems.length - 1;
          const isSecondLast = index === breadcrumbItems.length - 2;

          return (
            <React.Fragment key={index}>
              <li>
                {item.path ? (
                  <Link
                    to={item.path}
                    className="text-[#1a1a1a] hover:underline"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span
                    className={`${item.bold ? "font-semibold" : ""} ${
                      item.darkBlue ? "text-[#002b5b]" : "text-[#1a1a1a]"
                    }`}
                  >
                    {item.label}
                  </span>
                )}
              </li>

              {/* Separator */}
              {!isLast && (
                <li className="mx-1">
                  {isSecondLast ? (
                    <span className="text-[#1a1a1a] font-semibold">&gt;</span>
                  ) : (
                    "/"
                  )}
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default DetailedPageHeading;
