import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getCartItemsAPI,
  addToCartAPI,
  updateCartItemAPI,
  removeCartItemAPI,
  toggleSaveForLaterAPI,
} from "./cartAPI";

export const fetchCartItems = createAsyncThunk(
  "cart/fetchCartItems",
  async (token, thunkAPI) => {
    try {
      return await getCartItemsAPI(token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ item, token }, thunkAPI) => {
    try {
      return await addToCartAPI({ item, token });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  async ({ id, item, token }, thunkAPI) => {
    try {
      return await updateCartItemAPI({ id, item, token });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const removeCartItem = createAsyncThunk(
  "cart/removeCartItem",
  async ({ id, token }, thunkAPI) => {
    try {
      return await removeCartItemAPI({ id, token });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);

export const toggleSaveForLater = createAsyncThunk(
  "cart/toggleSaveForLater",
  async ({ id, token }, thunkAPI) => {
    try {
      return await toggleSaveForLaterAPI({ id, token });
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  }
);
