// src/redux/api/categoryAPI.js
import axiosInstance from "../../utils/axiosInstance";

export const fetchAllCategories = () => axiosInstance.get("/categories");
export const fetchCategoryById = (id) => axiosInstance.get(`/categories/${id}`);
export const createCategory = (data) => axiosInstance.post("/categories", data);
export const updateCategory = (id, data) =>
  axiosInstance.put(`/categories/${id}`, data);
export const deleteCategory = (id) => axiosInstance.delete(`/categories/${id}`);
