// src/features/user/userSlice.js
import { createSlice } from "@reduxjs/toolkit";
import {
  getUserProfileThunk,
  updateUserProfileThunk,
  deleteUserProfileThunk,
  getAllUsersThunk,
  getUserByIdThunk,
  deleteUserByIdThunk,
} from "./userThunks";

const initialState = {
  profile: null,
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // GET PROFILE
      .addCase(getUserProfileThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserProfileThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE PROFILE
      .addCase(updateUserProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      })

      // DELETE PROFILE
      .addCase(deleteUserProfileThunk.fulfilled, (state) => {
        state.profile = null;
      })

      // ADMIN: GET ALL USERS
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.users = action.payload;
      })

      // ADMIN: GET USER BY ID
      .addCase(getUserByIdThunk.fulfilled, (state, action) => {
        state.selectedUser = action.payload;
      })

      // ADMIN: DELETE USER
      .addCase(deleteUserByIdThunk.fulfilled, (state, action) => {
        state.users = state.users.filter(
          (user) => user._id !== action.meta.arg
        );
      });
  },
});

export const { resetUserState } = userSlice.actions;
export default userSlice.reducer;
