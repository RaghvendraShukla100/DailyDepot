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
import MenHomePage from "./pages/MenHomePage";
import WomenHomePage from "./pages/WomenHomePage";
import ElecronicsHomePage from "./pages/ElectronicsHomePage";
import DecoreHomePage from "./pages/DecoreHomePage";
import BeautyHomePage from "./pages/BeautyHomePage";
import GenzHomePage from "./pages/GenzHomePage";
import Dashboard from "./pages/Dashboard";

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
        <Route path="/men-home-page" element={<MenHomePage />} />
        <Route path="/women-home-page" element={<WomenHomePage />} />
        <Route path="/electronics-home-page" element={<ElecronicsHomePage />} />
        <Route path="/decore-home-page" element={<DecoreHomePage />} />
        <Route path="/beauty-home-page" element={<BeautyHomePage />} />
        <Route path="/genz-home-page" element={<GenzHomePage />} />
        <Route path="/seller-dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
