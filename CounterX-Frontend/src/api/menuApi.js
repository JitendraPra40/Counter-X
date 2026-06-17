import api from "../services/api";

export const getMenuItems = async () => {
  const { data } = await api.get("/api/menu/available");
  return data;
};

export const getMenuItemById = async (id) => {
  const { data } = await api.get(`/api/menu/${id}`);
  return data;
};

export const getMenuByCategory = async (category) => {
  const { data } = await api.get(
    `/api/menu/available/category/${category}`
  );
  return data;
};