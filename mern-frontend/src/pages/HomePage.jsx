import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../features/products/productThunks";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, loading, error } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  console.log("RODUCTS : ", products?.data?.products);
  // console.log("LOADING STATUS : ", loading);
  // console.log("ERROR : ", error);

  return (
    <div className="h-52 py-10 ">
      <h1 className="text-3xl text-center uppercase font-bold">Home page</h1>
      <button
        className="uppercase text-2xl rounded-xs font-thin
        px-3 py-1 block mx-auto bg-[#E31033] text-gray-50 cursor-pointer "
        onClick={() => navigate("/product-details")}
      >
        product details page
      </button>

      {/* product section */}

      {loading && <p className="text-center">Loading products...</p>}
      {error && <p className="text-center text-red-500">Error: {error}</p>}

      {products?.data?.products?.length > 0 && (
        <ul className="mt-5 text-center">
          {products.data.products.map((product) => (
            <li key={product._id}>{product.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default HomePage;
