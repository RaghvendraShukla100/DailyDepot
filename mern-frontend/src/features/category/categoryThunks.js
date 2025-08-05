// src/redux/features/category/categoryThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as categoryAPI from "../../api/categoryAPI";

export const getAllCategories = createAsyncThunk(
  "category/getAll",
  async (_, thunkAPI) => {
    try {
      const res = await categoryAPI.fetchAllCategories();
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getById",
  async (id, thunkAPI) => {
    try {
      const res = await categoryAPI.fetchCategoryById(id);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "category/create",
  async (formData, thunkAPI) => {
    try {
      const res = await categoryAPI.createCategory(formData);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const updateCategory = createAsyncThunk(
  "category/update",
  async ({ id, data }, thunkAPI) => {
    try {
      const res = await categoryAPI.updateCategory(id, data);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/delete",
  async (id, thunkAPI) => {
    try {
      await categoryAPI.deleteCategory(id);
      return id;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);
