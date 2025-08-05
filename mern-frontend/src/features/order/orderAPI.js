// src/features/order/orderAPI.js
import axiosInstance from "../../utils/axiosInstance";

export const createOrderAPI = (orderData) =>
  axiosInstance.post("/orders", orderData);

export const getUserOrdersAPI = () => axiosInstance.get("/orders");

export const getAllOrdersAPI = () => axiosInstance.get("/orders/all");

export const getOrderByIdAPI = (id) => axiosInstance.get(`/orders/${id}`);

export const updateOrderStatusAPI = ({ id, status }) =>
  axiosInstance.put(`/orders/${id}`, { status });

export const cancelOrderAPI = (id) => axiosInstance.delete(`/orders/${id}`);
