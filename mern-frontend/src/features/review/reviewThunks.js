import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchAllReviewsAPI,
  fetchReviewByIdAPI,
  createReviewAPI,
  updateReviewAPI,
  deleteReviewAPI,
} from "./reviewAPI";

export const fetchAllReviews = createAsyncThunk(
  "reviews/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await fetchAllReviewsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchReviewById = createAsyncThunk(
  "reviews/fetchById",
  async (id, thunkAPI) => {
    try {
      return await fetchReviewByIdAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/create",
  async (reviewData, thunkAPI) => {
    try {
      return await createReviewAPI(reviewData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/update",
  async ({ id, updatedData }, thunkAPI) => {
    try {
      return await updateReviewAPI({ id, updatedData });
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const deleteReview = createAsyncThunk(
  "reviews/delete",
  async (id, thunkAPI) => {
    try {
      return await deleteReviewAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);
