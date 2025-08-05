// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import addressReducer from "../features/address/addressSlice";
import supportReducer from "../features/support/supportSlice";
import reviewReducer from "../features/review/reviewSlice";
import orderReducer from "../features/order/orderSlice";
import couponReducer from "../features/coupon/couponSlice";
import adminReducer from "../features/admin/adminSlice";
import productReducer from "../features/products/productSlice";
import brandReducer from "../features/brand/brandSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    addresses: addressReducer,
    supports: supportReducer,
    reviews: reviewReducer,
    orders: orderReducer,
    coupons: couponReducer,
    admins: adminReducer,
    products: productReducer,
    brands: brandReducer,
  },
});
