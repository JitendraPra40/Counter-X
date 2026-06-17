import api from "../services/api";

export const getOrders = async () => {
  const { data } = await api.get("/api/orders/today");
  return data;
};

export const getOrderById = async (id) => {
  const { data } = await api.get(`/api/orders/${id}`);
  return data;
};

export const updateOrderStatus = async (id, status) => {
  const { data } = await api.put(
    `/api/orders/${id}/status/${status}`
  );
  return data;
};