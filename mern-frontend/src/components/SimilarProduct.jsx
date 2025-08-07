import React from "react";
import SecondaryCard from "./cards/SecondaryCard";
function SimilarProduct() {
  const similarProducts = [
    {
      image:
        "https://i.pinimg.com/736x/bb/5c/0f/bb5c0f0e1febd5115af530e4fcce93af.jpg",
      rating: "4.2",
      title: "RARE RABBIT",
      subtitle: "Slim Fit Casual Shirt",
      price: "1999",
      originalPrice: "3999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/b8/cb/2a/b8cb2aa46ac085820da87e09502401c6.jpg",
      rating: "4.0",
      title: "ALLEN SOLLY",
      subtitle: "Men Solid Formal Shirt",
      price: "1899",
      originalPrice: "3799",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/2f/c5/b0/2fc5b0c518dcc8e3d47a166768a081ee.jpg",
      rating: "4.5",
      title: "LEVIS",
      subtitle: "Men Regular Fit Shirt",
      price: "2199",
      originalPrice: "4399",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/50/3c/fa/503cfa5986e44b11d4242db1caeb4228.jpg",
      rating: "4.1",
      title: "ZARA",
      subtitle: "Cotton Striped Shirt",
      price: "2499",
      originalPrice: "4999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/59/82/6a/59826a67a0b7b6a014bd440879bb6f29.jpg",
      rating: "4.3",
      title: "H&M",
      subtitle: "Slim Fit Denim Shirt",
      price: "1599",
      originalPrice: "3199",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/a5/54/a0/a554a05a828f2b8948a8a0234d7d4413.jpg",
      rating: "4.6",
      title: "U.S. POLO",
      subtitle: "Checked Casual Shirt",
      price: "2099",
      originalPrice: "4199",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/e5/f1/51/e5f1512a3e48217ddd1bb0485b552c85.jpg",
      rating: "4.2",
      title: "MANGO MAN",
      subtitle: "Linen Blend Shirt",
      price: "2299",
      originalPrice: "4599",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/44/ff/71/44ff713d438b34844f27b9a147346e52.jpg",
      rating: "4.0",
      title: "JACK & JONES",
      subtitle: "Casual Striped Shirt",
      price: "1799",
      originalPrice: "3599",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/a9/70/09/a970098b7b51980b4fa5bb1b5f759e3b.jpg",
      rating: "4.4",
      title: "NETPLAY",
      subtitle: "Formal Slim Shirt",
      price: "1399",
      originalPrice: "2799",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/86/86/5d/86865d2285000cb64b2f41a934563b68.jpg",
      rating: "4.7",
      title: "PETER ENGLAND",
      subtitle: "Printed Cotton Shirt",
      price: "1699",
      originalPrice: "3399",
      discountPercent: "50",
    },
  ];
  const customerMayLikeProducts = [
    {
      image:
        "https://i.pinimg.com/736x/d5/fb/d3/d5fbd3e5e6890992084cc0a4b7d994f2.jpg",
      rating: "4.2",
      title: "RARE RABBIT",
      subtitle: "Slim Fit Casual Shirt",
      price: "1999",
      originalPrice: "3999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/d5/fb/d3/d5fbd3e5e6890992084cc0a4b7d994f2.jpg",
      rating: "4.3",
      title: "ALLEN SOLLY",
      subtitle: "Formal White Shirt",
      price: "1799",
      originalPrice: "3599",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/6a/c7/03/6ac7034c11495c0f078526b7e9ec67f3.jpg",
      rating: "4.5",
      title: "LEVI’S",
      subtitle: "Straight Fit Jeans",
      price: "2499",
      originalPrice: "4999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/1b/f0/cf/1bf0cf689e0fa53e3eaac67bdb13f7d4.jpg",
      rating: "4.6",
      title: "ZARA",
      subtitle: "Black Bomber Jacket",
      price: "3499",
      originalPrice: "6999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/0f/ef/a4/0fefa409b3890eba7ee8bc2b321fc187.jpg",
      rating: "4.0",
      title: "H&M",
      subtitle: "Crew Neck T-Shirt",
      price: "799",
      originalPrice: "1599",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/5e/c1/34/5ec1341f016368b7050958faafdd146b.jpg",
      rating: "4.4",
      title: "PETER ENGLAND",
      subtitle: "Slim Fit Trousers",
      price: "1399",
      originalPrice: "2799",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/23/e5/04/23e504c0340715dedd9ee503a55246f7.jpg",
      rating: "4.1",
      title: "U.S. POLO",
      subtitle: "Printed Polo T-Shirt",
      price: "1199",
      originalPrice: "2399",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/ec/e0/ee/ece0eebf2d2e0ed6787839414a6fa0f4.jpg",
      rating: "4.3",
      title: "WROGN",
      subtitle: "Denim Shirt",
      price: "2099",
      originalPrice: "4199",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/c9/f8/1e/c9f81e605a349d60b06d22504d105477.jpg",
      rating: "4.2",
      title: "FRENCH CONNECTION",
      subtitle: "Checkered Shirt",
      price: "1899",
      originalPrice: "3799",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/8e/48/96/8e4896b96e905373bc89eb303c4732a8.jpg",
      rating: "4.0",
      title: "INDIAN TERRAIN",
      subtitle: "Linen Blend Shirt",
      price: "2299",
      originalPrice: "4599",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/7d/36/24/7d3624b4694e997da3db97d217155d3e.jpg",
      rating: "4.1",
      title: "SNITCH",
      subtitle: "Oversized Cotton Tee",
      price: "999",
      originalPrice: "1999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/d5/5a/6c/d55a6ccc84f2b775dcd3cc3df26c00cb.jpg",
      rating: "4.5",
      title: "VAN HEUSEN",
      subtitle: "Formal Suit Blazer",
      price: "3999",
      originalPrice: "7999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/7b/f3/ee/7bf3eeeef31c35be1b16a2b43f5c2abf.jpg",
      rating: "4.2",
      title: "MANYAVAR",
      subtitle: "Silk Blend Kurta",
      price: "2999",
      originalPrice: "5999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/2a/47/a0/2a47a088fbb2ace806ac1f6f9f9b9ddd.jpg",
      rating: "4.7",
      title: "JOCKEY",
      subtitle: "Cotton Boxer Shorts (Pack of 2)",
      price: "599",
      originalPrice: "999",
      discountPercent: "40",
    },
    {
      image:
        "https://i.pinimg.com/1200x/65/c9/01/65c901a4b2b840c6338bb1a39411be24.jpg",
      rating: "4.3",
      title: "ADIDAS",
      subtitle: "Training Tracksuit",
      price: "3499",
      originalPrice: "6999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/10/a2/ff/10a2fff9179f6b91138647c096c42478.jpg",
      rating: "4.1",
      title: "HRX",
      subtitle: "Activewear Joggers",
      price: "1399",
      originalPrice: "2799",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/e0/29/2e/e0292e84065e9a8ab7fae2d7bb94f54c.jpg",
      rating: "4.0",
      title: "TOMMY HILFIGER",
      subtitle: "Puffer Jacket",
      price: "4999",
      originalPrice: "9999",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/736x/cc/94/3f/cc943f85bf1257e01c048318796db3fb.jpg",
      rating: "4.4",
      title: "THE BEAR HOUSE",
      subtitle: "Short-Sleeve Printed Shirt",
      price: "1299",
      originalPrice: "2599",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/6a/4d/3a/6a4d3ac346f03a1d0cddb0f2b089fb6e.jpg",
      rating: "4.6",
      title: "ROADSTER",
      subtitle: "Cargo Pants",
      price: "1899",
      originalPrice: "3799",
      discountPercent: "50",
    },
    {
      image:
        "https://i.pinimg.com/1200x/73/0f/aa/730faaaa7bf55d15e84cb46b72839f79.jpg",
      rating: "4.5",
      title: "NETPLAY",
      subtitle: "Sleeveless Sweater Vest",
      price: "1099",
      originalPrice: "2199",
      discountPercent: "50",
    },
  ];

  return (
    <div className="w-fit  mx-auto mt-10">
      <h1 className="uppercase  mb-3 font-bold text-gray-800">
        similar products
      </h1>
      <div
        className="
      grid gap-y-5 gap-x-3    grid-cols-2 md:grid-cols-3 lg:grid-cols-5"
      >
        {similarProducts.map((item, index) => (
          <SecondaryCard
            key={index}
            image={item.image}
            rating={item.rating}
            title={item.title}
            subtitle={item.subtitle}
            price={item.price}
            originalPrice={item.originalPrice}
            discountPercent={item.discountPercent}
          />
        ))}
      </div>
    </div>
  );
}

export default SimilarProduct;
