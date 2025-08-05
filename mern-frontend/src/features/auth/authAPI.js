// src/api/authAPI.js
import axios from "axios";

const BASE_URL = "/api/auth";

export const register = async (userData) => {
  const response = await axios.post(`${BASE_URL}/register`, userData);
  return response.data;
};

export const login = async (userData) => {
  const response = await axios.post(`${BASE_URL}/login`, userData);
  return response.data;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${BASE_URL}/logout`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const requestPasswordReset = async (email) => {
  const response = await axios.post(`${BASE_URL}/request-password-reset`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (token, password) => {
  const response = await axios.post(`${BASE_URL}/reset-password/${token}`, {
    password,
  });
  return response.data;
};

export const verifyEmail = async (token) => {
  const response = await axios.get(`${BASE_URL}/verify-email/${token}`);
  return response.data;
};
