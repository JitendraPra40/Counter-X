import api from "../services/api";

export const getDashboardStats = async () => {
  const { data } = await api.get("/api/dashboard/today");
  return data;
};

export const getRecentOrders = async () => {
  const { data } = await api.get("/api/orders/today");
  return data;
};

export const getTopItems = async () => {
  const { data } = await api.get("/api/admin/top-items");
  return data;
};