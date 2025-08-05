import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBrandsAPI,
  getBrandByIdAPI,
  createBrandAPI,
  updateBrandAPI,
  deleteBrandAPI,
} from "./brandAPI";

export const fetchBrands = createAsyncThunk(
  "brands/fetchBrands",
  async (_, thunkAPI) => {
    try {
      return await fetchBrandsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const getBrandById = createAsyncThunk(
  "brands/getBrandById",
  async (id, thunkAPI) => {
    try {
      return await getBrandByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const createBrand = createAsyncThunk(
  "brands/createBrand",
  async (data, thunkAPI) => {
    try {
      return await createBrandAPI(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateBrand = createAsyncThunk(
  "brands/updateBrand",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      return await updateBrandAPI({ id, updatedData });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteBrand = createAsyncThunk(
  "brands/deleteBrand",
  async (id, thunkAPI) => {
    try {
      return await deleteBrandAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
