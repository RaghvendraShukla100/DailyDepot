// src/features/address/addressAPI.js
import axios from "../../utils/axiosInstance"; // use pre-configured axiosInstance

const BASE_URL = "/addresses"; // relative to /api

export const fetchAddressesAPI = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addAddressAPI = async (newAddress) => {
  const response = await axios.post(BASE_URL, newAddress);
  return response.data;
};

export const deleteAddressAPI = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
