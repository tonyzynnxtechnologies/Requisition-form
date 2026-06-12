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

export const getCSRFToken = async () => {
  await api.get("/csrf/");
}

export const login = async (email, password) => {
  const response = await api.post("/login/", {
    email,
    password,
  });

  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/me/");
  return response.data;
};

export const logout = async () => {
  const response = await api.post("/logout/");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await api.get("/dashboard/stats/");
  return response.data;
};

export const getRequisitions = async () => {
    const response = await api.get("/requisitions/");
    return response.data.data;
};

export const getUsers = async () => {
  const response = await api.get("/users/");
  return response.data;
};

export const createUser = async (data) => {
  const response = await api.post("/register/", data);
  return response.data;
};

export const updateUser = async (id, data) => {
  const response = await api.put(`/users/${id}/update`, data);
  return response.data;
};

export const resetPassword = async (id, password) => {
  const response = await api.put(
    `/users/${id}/change-password/`,
    { password }
  );
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(
    `/users/${id}/delete/`
  );
  return response.data;
};

export const getDepartments = async () => {
  const response = await api.get("/departments/");
  return response.data;
};

export const createDepartment = async (data) => {
  const response = await api.post(
    "/departments/",
    data
  );
  return response.data;
};

export const updateDepartment = async (
  id,
  data
) => {
  const response = await api.put(
    `/departments/${id}/`,
    data
  );
  return response.data;
};

export const deleteDepartment = async (
  id
) => {
  const response = await api.delete(
    `/departments/${id}/`
  );
  return response.data;
};

export default api;