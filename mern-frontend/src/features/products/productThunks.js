// src/features/products/productThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createProductAPI,
  getProductsAPI,
  getProductByIdAPI,
  updateProductAPI,
  deleteProductAPI,
} from "./productAPI";

// Create Product
export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (formData, { rejectWithValue }) => {
    try {
      return await createProductAPI(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get All Products
export const getProductsThunk = createAsyncThunk(
  "products/getProducts",
  async (query = "", { rejectWithValue }) => {
    try {
      return await getProductsAPI(query);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Get Product By ID
export const getProductByIdThunk = createAsyncThunk(
  "products/getProductById",
  async (id, { rejectWithValue }) => {
    try {
      return await getProductByIdAPI(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update Product
export const updateProductThunk = createAsyncThunk(
  "products/updateProduct",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await updateProductAPI({ id, formData });
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete Product
export const deleteProductThunk = createAsyncThunk(
  "products/deleteProduct",
  async (id, { rejectWithValue }) => {
    try {
      return await deleteProductAPI(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
