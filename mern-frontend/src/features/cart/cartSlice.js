import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCartItems,
  addToCart,
  updateCartItem,
  removeCartItem,
  toggleSaveForLater,
} from "./cartThunks";

const initialState = {
  cartItems: [],
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // GET CART ITEMS
      .addCase(fetchCartItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems = action.payload;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // ADD TO CART
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.cartItems.push(action.payload);
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE CART ITEM
      .addCase(updateCartItem.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      })

      // REMOVE CART ITEM
      .addCase(removeCartItem.fulfilled, (state, action) => {
        state.cartItems = state.cartItems.filter(
          (item) => item._id !== action.payload._id
        );
      })

      // TOGGLE SAVE FOR LATER
      .addCase(toggleSaveForLater.fulfilled, (state, action) => {
        const index = state.cartItems.findIndex(
          (item) => item._id === action.payload._id
        );
        if (index !== -1) {
          state.cartItems[index] = action.payload;
        }
      });
  },
});

export const { resetCart } = cartSlice.actions;

export default cartSlice.reducer;
