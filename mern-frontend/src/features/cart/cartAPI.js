import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/cart`;

export const getCartItemsAPI = async (token) => {
  const { data } = await axios.get(`${BASE_URL}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const addToCartAPI = async ({ item, token }) => {
  const { data } = await axios.post(`${BASE_URL}/add`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const updateCartItemAPI = async ({ id, item, token }) => {
  const { data } = await axios.put(`${BASE_URL}/update/${id}`, item, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const removeCartItemAPI = async ({ id, token }) => {
  const { data } = await axios.delete(`${BASE_URL}/remove/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const toggleSaveForLaterAPI = async ({ id, token }) => {
  const { data } = await axios.post(`${BASE_URL}/save-for-later/${id}`, null, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
