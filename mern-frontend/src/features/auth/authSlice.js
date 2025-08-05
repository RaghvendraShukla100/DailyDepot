// src/redux/slices/authSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  loginUserThunk,
  logoutUserThunk,
  registerUserThunk,
} from "./authThunks";

const userFromStorage = JSON.parse(localStorage.getItem("user"));
const tokenFromStorage = localStorage.getItem("token");

const initialState = {
  user: userFromStorage || null,
  token: tokenFromStorage || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // REGISTER
      .addCase(registerUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // LOGIN
      .addCase(loginUserThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // LOGOUT
      .addCase(logoutUserThunk.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      });
  },
});

export const { resetAuthState } = authSlice.actions;
export default authSlice.reducer;
