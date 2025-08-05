// src/features/admin/adminThunks.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "./adminAPI";

// CREATE ADMIN
export const createAdminThunk = createAsyncThunk(
  "admin/create",
  async (adminData, thunkAPI) => {
    try {
      return await adminAPI.createAdmin(adminData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// GET ALL ADMINS
export const getAdminsThunk = createAsyncThunk(
  "admin/getAll",
  async (_, thunkAPI) => {
    try {
      return await adminAPI.getAdmins();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// GET ADMIN BY ID
export const getAdminByIdThunk = createAsyncThunk(
  "admin/getById",
  async (id, thunkAPI) => {
    try {
      return await adminAPI.getAdminById(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE ADMIN
export const updateAdminThunk = createAsyncThunk(
  "admin/update",
  async ({ id, adminData }, thunkAPI) => {
    try {
      return await adminAPI.updateAdmin(id, adminData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// DELETE ADMIN
export const deleteAdminThunk = createAsyncThunk(
  "admin/delete",
  async (id, thunkAPI) => {
    try {
      return await adminAPI.deleteAdmin(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// GET SUPERADMIN PROFILE
export const getSuperAdminThunk = createAsyncThunk(
  "admin/getSuperAdmin",
  async (_, thunkAPI) => {
    try {
      return await adminAPI.getSuperAdmin();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// UPDATE SUPERADMIN PROFILE
export const updateSuperAdminThunk = createAsyncThunk(
  "admin/updateSuperAdmin",
  async (data, thunkAPI) => {
    try {
      return await adminAPI.updateSuperAdmin(data);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

// DELETE SUPERADMIN PROFILE
export const deleteSuperAdminThunk = createAsyncThunk(
  "admin/deleteSuperAdmin",
  async (_, thunkAPI) => {
    try {
      return await adminAPI.deleteSuperAdmin();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);
