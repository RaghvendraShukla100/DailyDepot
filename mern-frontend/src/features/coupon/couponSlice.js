// src/features/coupon/couponSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createCouponThunk,
  getAllCouponsThunk,
  getCouponByIdThunk,
  updateCouponThunk,
  deleteCouponThunk,
} from "./couponThunks";

const initialState = {
  coupons: [],
  selectedCoupon: null,
  loading: false,
  error: null,
  success: false,
};

const couponSlice = createSlice({
  name: "coupons",
  initialState,
  reducers: {
    resetCouponState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createCouponThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCouponThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.coupons.push(action.payload);
      })
      .addCase(createCouponThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get All
      .addCase(getAllCouponsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAllCouponsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(getAllCouponsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getCouponByIdThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCouponByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCoupon = action.payload;
      })
      .addCase(getCouponByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateCouponThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCouponThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.coupons.findIndex(
          (c) => c._id === action.payload._id
        );
        if (index !== -1) state.coupons[index] = action.payload;
      })
      .addCase(updateCouponThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteCouponThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCouponThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.coupons = state.coupons.filter((c) => c._id !== action.meta.arg);
      })
      .addCase(deleteCouponThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetCouponState } = couponSlice.actions;
export default couponSlice.reducer;
