// src/features/seller/sellerSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createSeller,
  getSeller,
  updateSeller,
  deleteSeller,
  getSellerOrders,
  getSellerProducts,
  getSellerAnalytics,
} from "./sellerThunks";

const initialState = {
  sellerProfile: null,
  orders: [],
  products: [],
  analytics: null,
  status: "idle",
  error: null,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    resetSellerState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSeller.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSeller.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sellerProfile = action.payload;
      })
      .addCase(getSeller.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createSeller.fulfilled, (state, action) => {
        state.sellerProfile = action.payload;
      })
      .addCase(updateSeller.fulfilled, (state, action) => {
        state.sellerProfile = action.payload;
      })
      .addCase(deleteSeller.fulfilled, () => initialState)
      .addCase(getSellerOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(getSellerProducts.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(getSellerAnalytics.fulfilled, (state, action) => {
        state.analytics = action.payload;
      });
  },
});

export const { resetSellerState } = sellerSlice.actions;
export default sellerSlice.reducer;
