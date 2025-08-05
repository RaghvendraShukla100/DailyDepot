// src/features/order/orderThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createOrderAPI,
  getUserOrdersAPI,
  getAllOrdersAPI,
  getOrderByIdAPI,
  updateOrderStatusAPI,
  cancelOrderAPI,
} from "./orderAPI";

export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData, thunkAPI) => {
    try {
      const { data } = await createOrderAPI(orderData);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getUserOrders = createAsyncThunk(
  "orders/getUserOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getUserOrdersAPI();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, thunkAPI) => {
    try {
      const { data } = await getAllOrdersAPI();
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (id, thunkAPI) => {
    try {
      const { data } = await getOrderByIdAPI(id);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateOrderStatus = createAsyncThunk(
  "orders/updateOrderStatus",
  async ({ id, status }, thunkAPI) => {
    try {
      const { data } = await updateOrderStatusAPI({ id, status });
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "orders/cancelOrder",
  async (id, thunkAPI) => {
    try {
      const { data } = await cancelOrderAPI(id);
      return data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
