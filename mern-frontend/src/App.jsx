// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailesPage from "./pages/ProductDetailesPage";
import CartPage from "./pages/CartPage";
import WishList from "./components/WishList";
import NotFoundPage from "./pages/NotFoundPage";
import AddressList from "./components/AddressList";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product-details" element={<ProductDetailesPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/address" element={<AddressList />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
