// src/redux/thunks/supportThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as supportAPI from "./supportAPI";

// CRUD THUNKS
export const createSupportThunk = createAsyncThunk(
  "support/create",
  async (formData, { rejectWithValue }) => {
    try {
      return await supportAPI.createSupport(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getSupportsThunk = createAsyncThunk(
  "support/getAll",
  async (_, { rejectWithValue }) => {
    try {
      return await supportAPI.getSupports();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const getSupportByIdThunk = createAsyncThunk(
  "support/getById",
  async (id, { rejectWithValue }) => {
    try {
      return await supportAPI.getSupportById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateSupportByIdThunk = createAsyncThunk(
  "support/updateById",
  async ({ id, formData }, { rejectWithValue }) => {
    try {
      return await supportAPI.updateSupportById(id, formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteSupportByIdThunk = createAsyncThunk(
  "support/deleteById",
  async (id, { rejectWithValue }) => {
    try {
      return await supportAPI.deleteSupportById(id);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ME THUNKS
export const getSupportMeThunk = createAsyncThunk(
  "support/getMe",
  async (_, { rejectWithValue }) => {
    try {
      return await supportAPI.getSupportMe();
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateSupportMeThunk = createAsyncThunk(
  "support/updateMe",
  async (formData, { rejectWithValue }) => {
    try {
      return await supportAPI.updateSupportMe(formData);
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
