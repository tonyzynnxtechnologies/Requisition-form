import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  withCredentials: true,
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFToken",
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Auth ────────────────────────────────────────────────────────────────────

export const getCSRFToken = async () => {
  await api.get("/csrf/");
};

export const login = async (email, password) => {
  await getCSRFToken();
  const response = await api.post("/login/", { email, password });
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/me/");
  return response.data;
};

export const logout = async () => {
  await getCSRFToken();
  const response = await api.post("/logout/");
  return response.data;
};

// ─── Dashboard ───────────────────────────────────────────────────────────────

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats/");
  return response.data;
};

// ─── Users ───────────────────────────────────────────────────────────────────

export const getUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const createUser = async (data) => {
  await getCSRFToken();
  const response = await api.post("/register/", data);
  return response.data;
};

export const updateUser = async (id, data) => {
  await getCSRFToken();
  const response = await api.put(`/users/${id}/update`, data);
  return response.data;
};

export const resetPassword = async (id, password) => {
  await getCSRFToken();
  const response = await api.put(`/users/${id}/change-password/`, { password });
  return response.data;
};

export const deleteUser = async (id) => {
  await getCSRFToken();
  const response = await api.delete(`/users/${id}/delete/`);
  return response.data;
};

// ─── Departments ─────────────────────────────────────────────────────────────

export const getDepartments = async () => {
  const response = await api.get("/departments/");
  return response.data;
};

export const createDepartment = async (data) => {
  await getCSRFToken();
  const response = await api.post("/departments/", data);
  return response.data;
};

export const updateDepartment = async (id, data) => {
  await getCSRFToken();
  const response = await api.put(`/departments/${id}/`, data);
  return response.data;
};

export const deleteDepartment = async (id) => {
  await getCSRFToken();
  const response = await api.delete(`/departments/${id}/`);
  return response.data;
};

// ─── Clubs ───────────────────────────────────────────────────────────────────

export const getClubs = async () => {
  const response = await api.get("/clubs/");
  return response.data;
};

export const createClub = async (data) => {
  await getCSRFToken();
  const response = await api.post("/clubs/", data);
  return response.data;
};

export const updateClub = async (id, data) => {
  await getCSRFToken();
  const response = await api.put(`/clubs/${id}/`, data);
  return response.data;
};

export const deleteClub = async (id) => {
  await getCSRFToken();
  const response = await api.delete(`/clubs/${id}/`);
  return response.data;
};

// ─── Requisitions ────────────────────────────────────────────────────────────

export const getRequisitions = async (params = {}) => {
  const response = await api.get("/requisitions/", { params });
  return response.data;
};

export const getRequisitionDetail = async (id) => {
  const response = await api.get(`/requisitions/${id}/`);
  return response.data;
};

export const createRequisition = async (data) => {
  await getCSRFToken();
  const response = await api.post("/requisitions/", data);
  return response.data;
};

export const updateRequisition = async (id, data) => {
  await getCSRFToken();
  const response = await api.put(`/requisitions/${id}/`, data);
  return response.data;
};

export const deleteRequisition = async (id) => {
  await getCSRFToken();
  const response = await api.delete(`/requisitions/${id}/`);
  return response.data;
};

export const submitRequisition = async (id) => {
  await getCSRFToken();
  const response = await api.post(`/requisitions/${id}/submit/`);
  return response.data;
};

export const performRequisitionAction = async (id, action, comment = "", priority = null) => {
  await getCSRFToken();
  const response = await api.post(`/requisitions/${id}/action/`, {
    action,
    comment,
    priority,
  });
  return response.data;
};

// ─── Documents ───────────────────────────────────────────────────────────────

export const uploadDocument = async (requisitionId, file) => {
  await getCSRFToken();
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post(
    `/requisitions/${requisitionId}/documents/`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data;
};

export const deleteDocument = async (requisitionId, docId) => {
  await getCSRFToken();
  const response = await api.delete(
    `/requisitions/${requisitionId}/documents/${docId}/`
  );
  return response.data;
};

// ─── History ─────────────────────────────────────────────────────────────────

export const getRequisitionHistory = async (id) => {
  const response = await api.get(`/requisitions/${id}/history/`);
  return response.data;
};

// ─── Settings ────────────────────────────────────────────────────────────────

export const getSettings = async () => {
  const response = await api.get("/settings/");
  return response.data;
};

export const updateSettings = async (data) => {
  await getCSRFToken();
  const response = await api.post("/settings/", data);
  return response.data;
};

// ─── Profile Picture ──────────────────────────────────────────────────────────

export const uploadProfilePic = async (file) => {
  await getCSRFToken();
  const formData = new FormData();
  formData.append("profile_pic", file);
  const response = await api.post("/profile-pic/", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteProfilePic = async () => {
  await getCSRFToken();
  const response = await api.delete("/profile-pic/");
  return response.data;
};

export const getMediaUrl = (path) => {
  if (!path) return null;
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  return `http://127.0.0.1:8000${path}`;
};

export default api;