// src/features/coupon/couponThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "./couponAPI";

export const createCouponThunk = createAsyncThunk(
  "coupons/create",
  async (data, thunkAPI) => {
    try {
      return await api.createCoupon(data);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getAllCouponsThunk = createAsyncThunk(
  "coupons/getAll",
  async (_, thunkAPI) => {
    try {
      return await api.getAllCoupons();
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getCouponByIdThunk = createAsyncThunk(
  "coupons/getById",
  async (id, thunkAPI) => {
    try {
      return await api.getCouponById(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateCouponThunk = createAsyncThunk(
  "coupons/update",
  async ({ id, data }, thunkAPI) => {
    try {
      return await api.updateCoupon({ id, data });
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteCouponThunk = createAsyncThunk(
  "coupons/delete",
  async (id, thunkAPI) => {
    try {
      return await api.deleteCoupon(id);
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
