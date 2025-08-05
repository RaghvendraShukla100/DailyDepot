// src/api/adminAPI.js
import axios from "../../utils/axiosInstance";

const adminAPI = {
  createAdmin: (data) =>
    axios.post("/admins", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  getAdmins: () => axios.get("/admins"),

  getAdminById: (id) => axios.get(`/admins/${id}`),

  updateAdmin: (id, data) =>
    axios.put(`/admins/${id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteAdmin: (id) => axios.delete(`/admins/${id}`),

  getSuperAdmin: () => axios.get("/admins/me"),

  updateSuperAdmin: (data) =>
    axios.put("/admins/me", data, {
      headers: { "Content-Type": "multipart/form-data" },
    }),

  deleteSuperAdmin: () => axios.delete("/admins/me"),
};

export default adminAPI;
