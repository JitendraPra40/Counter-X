import api from "../services/api";

/**
 * Simulate QR / UPI payment.
 * In a real integration this would verify with a payment gateway.
 */
export const processQrPayment = (total) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, method: "qr", amount: total }), 1200);
  });
};

/**
 * Simulate card payment validation & processing.
 */
export const processCardPayment = (card, total) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ success: true, method: "card", amount: total }), 1500);
  });
};

/** Generate QR code image bytes for an order */
export const generateQrCode = async (orderId) => {
  const { data } = await api.get(`/api/payments/qr/${orderId}`);
  return data;
};

/** Get all payments for an order */
export const getPaymentByOrder = async (orderId) => {
  const { data } = await api.get(`/api/payments/order/${orderId}`);
  return data;
};

/** Process payment through backend */
export const processPayment = async (paymentData) => {
  const { data } = await api.post("/api/payments", paymentData);
  return data;
};