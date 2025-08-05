// src/features/products/productSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createProductThunk,
  getProductsThunk,
  getProductByIdThunk,
  updateProductThunk,
  deleteProductThunk,
} from "./productThunks";

const initialState = {
  products: [],
  product: null,
  loading: false,
  error: null,
  success: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearProductState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Product
      .addCase(createProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products.push(action.payload);
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Products
      .addCase(getProductsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Get Product By ID
      .addCase(getProductByIdThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByIdThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(getProductByIdThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Product
      .addCase(updateProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.map((prod) =>
          prod._id === action.payload._id ? action.payload : prod
        );
      })
      .addCase(updateProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Product
      .addCase(deleteProductThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProductThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.products = state.products.filter(
          (prod) => prod._id !== action.meta.arg
        );
      })
      .addCase(deleteProductThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearProductState } = productSlice.actions;
export default productSlice.reducer;
