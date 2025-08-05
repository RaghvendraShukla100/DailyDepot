import React, { useState, useEffect } from "react";
import WishlistCard from "./WishlistCard";

// Simulated API call (replace with real API later)
const fetchWishlistItems = async () => {
  return [
    {
      _id: "123",
      image:
        "https://i.pinimg.com/736x/bb/5c/0f/bb5c0f0e1febd5115af530e4fcce93af.jpg",
      title: "Park Avenue Checked Formal Shirt",
      price: 827,
      originalPrice: 1799,
      discount: 54,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
    {
      _id: "124",
      image:
        "https://i.pinimg.com/736x/3f/9d/3c/3f9d3c3a87f9d8e9f3c5a5d8c5c6b5d4.jpg",
      title: "Allen Solly Slim Fit Shirt",
      price: 999,
      originalPrice: 1999,
      discount: 50,
    },
  ];
};

function WishList() {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch wishlist data (simulate API)
  useEffect(() => {
    const getData = async () => {
      const data = await fetchWishlistItems();
      setWishlist(data);
      setLoading(false);
    };
    getData();
  }, []);

  // Remove item from wishlist
  const handleRemove = (id) => {
    setWishlist((prev) => prev.filter((item) => item._id !== id));
    console.log("Removed item with ID:", id);
  };

  // Move item to bag
  const handleMoveToBag = (id) => {
    // TODO: Add to bag logic here
    console.log("Moved item to bag with ID:", id);
    handleRemove(id);
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-gray-500 text-lg">Loading...</div>
    );
  }

  return (
    <div className="md:px-6 py-8  bg-gray-50 min-h-screen">
      {/* Heading */}
      <h1 className="text-xl text-gray-700 ml-2 uppercase font-bold  md:ml-8 mb-6 ">
        You have {wishlist.length} in your wishlist.
      </h1>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <div className="text-gray-500 text-center py-10 text-base">
          Your wishlist is empty 😕
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-5 mx-auto   w-fit ">
          {wishlist.map((product) => (
            <WishlistCard
              key={product._id}
              product={product}
              onRemove={handleRemove}
              onMoveToBag={handleMoveToBag}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default WishList;
