// src/components/TopSellingProducts.jsx
const products = [
  {
    img: "https://i.pinimg.com/1200x/08/75/c0/0875c0d3e07eed806a336760328fa80f.jpg",
    name: "Red Tape Sports Shoes for Men",
    sales: "12,429",
    status: "Available",
    stock: 135,
  },
  {
    img: "https://i.pinimg.com/1200x/c5/53/4c/c5534cd9e0ead53321cf17cfa8f20936.jpg",
    name: "Fastrack FS1 Pro Smartwatch",
    sales: "1,543",
    status: "Available",
    stock: 76,
  },
  {
    img: "https://i.pinimg.com/1200x/c2/83/2e/c2832e0d7e3f13c2ef96df40a936ef07.jpg",
    name: "Leriya Fashion Men's Shirt",
    sales: "7,212",
    status: "Available",
    stock: 465,
  },
];

export default function TopSellingProducts() {
  return (
    <div className="bg-white shadow rounded-lg p-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-lg">Top Selling Product</h3>
        <button className="text-sm font-medium text-gray-700 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200">
          See All Product
        </button>
      </div>

      {/* Product List */}
      <div className="space-y-4">
        {products.map((product, index) => (
          <div key={index} className="flex items-center justify-between  my-5">
            {/* Left: Image + Info */}
            <div className="flex items-center space-x-4">
              <img
                src={product.img}
                alt={product.name}
                className="w-12 h-12 rounded object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-gray-500 text-sm">{product.sales} Sales</p>
              </div>
            </div>

            {/* Right: Status + Stock */}
            <div className="text-right">
              <p className="text-green-600 text-sm font-medium">
                ● {product.status}
              </p>
              <p className="text-gray-500 text-sm">
                {product.stock} Stocks Remaining
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
