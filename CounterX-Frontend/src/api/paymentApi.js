import api from "../services/api";

export const generateQrCode = async (orderId) => {
  const { data } = await api.get(
    `/api/payments/qr/${orderId}`
  );
  return data;
};

export const getPaymentByOrder = async (orderId) => {
  const { data } = await api.get(
    `/api/payments/order/${orderId}`
  );
  return data;
};