import axiosInstance from "../../utils/axiosInstance";

const BASE_URL = "/reviews";

export const fetchAllReviewsAPI = async () => {
  const response = await axiosInstance.get(BASE_URL);
  return response.data;
};

export const fetchReviewByIdAPI = async (id) => {
  const response = await axiosInstance.get(`${BASE_URL}/${id}`);
  return response.data;
};

export const createReviewAPI = async (reviewData) => {
  const response = await axiosInstance.post(BASE_URL, reviewData);
  return response.data;
};

export const updateReviewAPI = async ({ id, updatedData }) => {
  const response = await axiosInstance.put(`${BASE_URL}/${id}`, updatedData);
  return response.data;
};

export const deleteReviewAPI = async (id) => {
  const response = await axiosInstance.delete(`${BASE_URL}/${id}`);
  return response.data;
};
