// src/features/address/addressSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAddressesAPI,
  addAddressAPI,
  deleteAddressAPI,
} from "./addressAPI";

// Thunks
export const fetchAddresses = createAsyncThunk("addresses/fetch", async () => {
  return await fetchAddressesAPI();
});

export const addAddress = createAsyncThunk("addresses/add", async (address) => {
  return await addAddressAPI(address);
});

export const deleteAddress = createAsyncThunk(
  "addresses/delete",
  async (id) => {
    return await deleteAddressAPI(id);
  }
);

const addressSlice = createSlice({
  name: "addresses",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchAddresses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAddresses.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchAddresses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // Add
      .addCase(addAddress.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })

      // Delete
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (addr) => addr._id !== action.payload._id
        );
      });
  },
});

export default addressSlice.reducer;
