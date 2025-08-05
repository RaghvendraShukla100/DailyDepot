import { createSlice } from "@reduxjs/toolkit";
import {
  fetchBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
} from "./brandThunks";

const initialState = {
  brands: [],
  brandDetails: null,
  loading: false,
  error: null,
  success: false,
};

const brandSlice = createSlice({
  name: "brands",
  initialState,
  reducers: {
    clearBrandState: (state) => {
      state.error = null;
      state.success = false;
      state.brandDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchBrands.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.loading = false;
        state.brands = action.payload;
        state.error = null;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get by ID
      .addCase(getBrandById.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBrandById.fulfilled, (state, action) => {
        state.loading = false;
        state.brandDetails = action.payload;
        state.error = null;
      })
      .addCase(getBrandById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.brands.push(action.payload);
      })
      .addCase(createBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        const index = state.brands.findIndex(
          (b) => b._id === action.payload._id
        );
        if (index !== -1) state.brands[index] = action.payload;
      })
      .addCase(updateBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteBrand.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteBrand.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.brands = state.brands.filter((b) => b._id !== action.meta.arg);
      })
      .addCase(deleteBrand.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearBrandState } = brandSlice.actions;
export default brandSlice.reducer;
