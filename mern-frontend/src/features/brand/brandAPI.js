import axios from "../../utils/axiosInstance";

// Get all brands
export const fetchBrandsAPI = async () => {
  const response = await axios.get("/brands");
  return response.data;
};

// Get brand by ID
export const getBrandByIdAPI = async (id) => {
  const response = await axios.get(`/brands/${id}`);
  return response.data;
};

// Create brand
export const createBrandAPI = async (data) => {
  const response = await axios.post("/brands", data);
  return response.data;
};

// Update brand
export const updateBrandAPI = async ({ id, updatedData }) => {
  const response = await axios.put(`/brands/${id}`, updatedData);
  return response.data;
};

// Delete brand
export const deleteBrandAPI = async (id) => {
  const response = await axios.delete(`/brands/${id}`);
  return response.data;
};
