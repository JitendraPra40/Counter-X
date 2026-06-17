import api from "../services/api";

export const getSalesToday = async () => {
  const { data } = await api.get("/api/sales/today");
  return data;
};

export const getSalesMonth = async () => {
  const { data } = await api.get("/api/sales/month");
  return data;
};

export const getTopItems = async () => {
  const { data } = await api.get("/api/sales/top-items");
  return data;
};