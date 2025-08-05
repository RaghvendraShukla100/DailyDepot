// src/features/admin/adminSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  createAdminThunk,
  getAdminsThunk,
  getAdminByIdThunk,
  updateAdminThunk,
  deleteAdminThunk,
  getSuperAdminThunk,
  updateSuperAdminThunk,
  deleteSuperAdminThunk,
} from "./adminThunks";

const initialState = {
  admins: [],
  superAdmin: null,
  currentAdmin: null,
  loading: false,
  error: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    clearAdminError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE ADMIN
      .addCase(createAdminThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(createAdminThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.admins.push(action.payload);
      })
      .addCase(createAdminThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ADMINS
      .addCase(getAdminsThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getAdminsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.admins = action.payload;
      })
      .addCase(getAdminsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ADMIN BY ID
      .addCase(getAdminByIdThunk.fulfilled, (state, action) => {
        state.currentAdmin = action.payload;
      })

      // UPDATE ADMIN
      .addCase(updateAdminThunk.fulfilled, (state, action) => {
        state.admins = state.admins.map((admin) =>
          admin._id === action.payload._id ? action.payload : admin
        );
      })

      // DELETE ADMIN
      .addCase(deleteAdminThunk.fulfilled, (state, action) => {
        state.admins = state.admins.filter(
          (admin) => admin._id !== action.payload._id
        );
      })

      // GET SUPERADMIN
      .addCase(getSuperAdminThunk.fulfilled, (state, action) => {
        state.superAdmin = action.payload;
      })

      // UPDATE SUPERADMIN
      .addCase(updateSuperAdminThunk.fulfilled, (state, action) => {
        state.superAdmin = action.payload;
      })

      // DELETE SUPERADMIN
      .addCase(deleteSuperAdminThunk.fulfilled, (state) => {
        state.superAdmin = null;
      });
  },
});

export const { clearAdminError } = adminSlice.actions;
export default adminSlice.reducer;
