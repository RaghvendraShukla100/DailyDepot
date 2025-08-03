// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import ProductDetailesPage from "./pages/ProductDetailesPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product-details" element={<ProductDetailesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {/* <Footer / > */}
    </>
  );
}

export default App;
