// src/redux/thunks/authThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authAPI from "./authAPI";

// REGISTER
export const registerUserThunk = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authAPI.register(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// LOGIN
export const loginUserThunk = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const data = await authAPI.login(userData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// LOGOUT
export const logoutUserThunk = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await authAPI.logout();
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);
