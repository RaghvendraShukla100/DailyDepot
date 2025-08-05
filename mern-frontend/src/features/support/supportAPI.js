// src/api/supportAPI.js
import axios from "../../utils/axiosInstance"; // centralized axios instance

const BASE_URL = "/supports"; // relative to /api

export const createSupport = async (formData) => {
  const res = await axios.post(BASE_URL, formData);
  return res.data;
};

export const getSupports = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
};

export const getSupportById = async (supportId) => {
  const res = await axios.get(`${BASE_URL}/${supportId}`);
  return res.data;
};

export const updateSupportById = async (supportId, formData) => {
  const res = await axios.put(`${BASE_URL}/${supportId}`, formData);
  return res.data;
};

export const deleteSupportById = async (supportId) => {
  const res = await axios.delete(`${BASE_URL}/${supportId}`);
  return res.data;
};

export const getSupportMe = async () => {
  const res = await axios.get(`${BASE_URL}/me`);
  return res.data;
};

export const updateSupportMe = async (formData) => {
  const res = await axios.put(`${BASE_URL}/me`, formData);
  return res.data;
};
