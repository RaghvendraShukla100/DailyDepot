// src/redux/thunks/userThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as userAPI from "./userAPI";

// PROFILE THUNKS
export const getUserProfileThunk = createAsyncThunk(
  "user/getProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await userAPI.getUserProfile();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateUserProfileThunk = createAsyncThunk(
  "user/updateProfile",
  async (profileData, { rejectWithValue }) => {
    try {
      return await userAPI.updateUserProfile(profileData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteUserProfileThunk = createAsyncThunk(
  "user/deleteProfile",
  async (_, { rejectWithValue }) => {
    try {
      return await userAPI.deleteUserProfile();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ADMIN THUNKS
export const getAllUsersThunk = createAsyncThunk(
  "user/getAllUsers",
  async (_, { rejectWithValue }) => {
    try {
      return await userAPI.getAllUsers();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getUserByIdThunk = createAsyncThunk(
  "user/getUserById",
  async (id, { rejectWithValue }) => {
    try {
      return await userAPI.getUserById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteUserByIdThunk = createAsyncThunk(
  "user/deleteUserById",
  async (id, { rejectWithValue }) => {
    try {
      return await userAPI.deleteUserById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
