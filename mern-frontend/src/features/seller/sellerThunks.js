// src/features/seller/sellerThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createSellerAPI,
  getSellerAPI,
  updateSellerAPI,
  deleteSellerAPI,
  getSellerOrdersAPI,
  getSellerProductsAPI,
  getSellerAnalyticsAPI,
} from "./sellerAPI";

export const createSeller = createAsyncThunk("seller/create", createSellerAPI);
export const getSeller = createAsyncThunk("seller/get", getSellerAPI);
export const updateSeller = createAsyncThunk("seller/update", updateSellerAPI);
export const deleteSeller = createAsyncThunk("seller/delete", deleteSellerAPI);
export const getSellerOrders = createAsyncThunk(
  "seller/orders",
  getSellerOrdersAPI
);
export const getSellerProducts = createAsyncThunk(
  "seller/products",
  getSellerProductsAPI
);
export const getSellerAnalytics = createAsyncThunk(
  "seller/analytics",
  getSellerAnalyticsAPI
);
