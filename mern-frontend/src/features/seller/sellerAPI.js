import axios from "../../utils/axiosInstance"; // Base URL and auth header handled

const BASE_URL = "/sellers";

export const createSellerAPI = async (formData) => {
  const res = await axios.post(`${BASE_URL}`, formData);
  return res.data;
};

export const getSellerAPI = async () => {
  const res = await axios.get(`${BASE_URL}/me`);
  return res.data;
};

export const updateSellerAPI = async (formData) => {
  const res = await axios.put(`${BASE_URL}/me`, formData);
  return res.data;
};

export const deleteSellerAPI = async () => {
  const res = await axios.delete(`${BASE_URL}/me`);
  return res.data;
};

export const getSellerOrdersAPI = async () => {
  const res = await axios.get(`${BASE_URL}/me/orders`);
  return res.data;
};

export const getSellerProductsAPI = async () => {
  const res = await axios.get(`${BASE_URL}/me/products`);
  return res.data;
};

export const getSellerAnalyticsAPI = async () => {
  const res = await axios.get(`${BASE_URL}/me/analytics`);
  return res.data;
};
