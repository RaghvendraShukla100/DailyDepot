// src/api/userAPI.js
import axios from "../../utils/axiosInstance";

const BASE_URL = "/users";

// Optionally attach token manually if not handled via axios interceptors
const authHeader = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

// User Profile APIs

export const getUserProfile = async () => {
  const res = await axios.get(`${BASE_URL}/profile`, authHeader());
  return res.data;
};

export const updateUserProfile = async (profileData) => {
  const res = await axios.put(`${BASE_URL}/profile`, profileData, authHeader());
  return res.data;
};

export const deleteUserProfile = async () => {
  const res = await axios.delete(`${BASE_URL}/profile`, authHeader());
  return res.data;
};

// Admin APIs

export const getAllUsers = async () => {
  const res = await axios.get(`${BASE_URL}`, authHeader());
  return res.data;
};

export const getUserById = async (id) => {
  const res = await axios.get(`${BASE_URL}/${id}`, authHeader());
  return res.data;
};

export const deleteUserById = async (id) => {
  const res = await axios.delete(`${BASE_URL}/${id}`, authHeader());
  return res.data;
};
