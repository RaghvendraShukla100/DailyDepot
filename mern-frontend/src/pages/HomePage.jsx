import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsThunk } from "../features/products/productThunks";
import { fetchBrands } from "../features/brand/brandThunks";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);

  const {
    brands,
    loading: brandsLoading,
    error: brandsError,
  } = useSelector((state) => state.brands);

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(fetchBrands());
  }, [dispatch]);

  console.log("PRODUCTS : ", products?.data?.products);
  console.log("BRANDS : ", brands.data);

  return (
    <div className=" py-10 ">
      <h1 className="text-3xl text-center uppercase font-bold">Home page</h1>
      <button
        className="uppercase text-2xl rounded-xs font-thin
        px-3 py-1 block mx-auto bg-[#E31033] text-gray-50 cursor-pointer "
        onClick={() => navigate("/product-details")}
      >
        product details page
      </button>

      {/* product section */}
      {productsLoading && <p className="text-center">Loading products...</p>}
      {productsError && (
        <p className="text-center text-red-500">Error: {error}</p>
      )}
      {products?.data?.products?.length > 0 && (
        <ul className="m-5 p-2  border w-fit">
          {products?.data?.products?.map((product) => (
            <li key={product.id} className="bg-red-100 my-1 p-1">
              {product.name}
            </li>
          ))}
        </ul>
      )}

      {/* brands section */}
      <div className="grid grid-cols-4 gap-1 border w-fit mx-auto p-3 bg-gray-800">
        {brands?.data?.map((brand) => (
          <h1
            key={brand.id}
            className=" p-1 bg-green-700 hover:bg-green-800 text-center text-gray-100 w-44 cursor-pointer"
          >
            {brand.name}
          </h1>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
