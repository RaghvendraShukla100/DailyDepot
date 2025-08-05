// src/features/support/supportSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createSupportThunk,
  getSupportsThunk,
  getSupportByIdThunk,
  updateSupportByIdThunk,
  deleteSupportByIdThunk,
  getSupportMeThunk,
  updateSupportMeThunk,
} from "./supportThunks";

const initialState = {
  supports: [],
  currentSupport: null,
  supportMe: null,
  loading: false,
  error: null,
};

const supportSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    resetSupportState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createSupportThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createSupportThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.supports.push(action.payload);
      })
      .addCase(createSupportThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getSupportsThunk.fulfilled, (state, action) => {
        state.supports = action.payload;
      })

      .addCase(getSupportByIdThunk.fulfilled, (state, action) => {
        state.currentSupport = action.payload;
      })

      .addCase(updateSupportByIdThunk.fulfilled, (state, action) => {
        state.supports = state.supports.map((s) =>
          s._id === action.payload._id ? action.payload : s
        );
      })

      .addCase(deleteSupportByIdThunk.fulfilled, (state, action) => {
        state.supports = state.supports.filter(
          (s) => s._id !== action.meta.arg
        );
      })

      .addCase(getSupportMeThunk.fulfilled, (state, action) => {
        state.supportMe = action.payload;
      })

      .addCase(updateSupportMeThunk.fulfilled, (state, action) => {
        state.supportMe = action.payload;
      });
  },
});

export const { resetSupportState } = supportSlice.actions;
export default supportSlice.reducer;
