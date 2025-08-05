// src/features/products/productAPI.js
import axiosInstance from "../../utils/axiosInstance";

export const createProductAPI = async (formData) => {
  const res = await axiosInstance.post("/products", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const getProductsAPI = async (query = "") => {
  const res = await axiosInstance.get(`/products${query}`);
  return res.data;
};

export const getProductByIdAPI = async (id) => {
  const res = await axiosInstance.get(`/products/${id}`);
  return res.data;
};

export const updateProductAPI = async ({ id, formData }) => {
  const res = await axiosInstance.put(`/products/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
};

export const deleteProductAPI = async (id) => {
  const res = await axiosInstance.delete(`/products/${id}`);
  return res.data;
};
