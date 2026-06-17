import api from './axiosInstance';

export const placeOrder = (data) => api.post('/api/orders/', data);
export const getAllOrders = () => api.get('/api/orders/');
export const getTodayOrders = () => api.get('/api/orders/today');
export const getOrderById = (id) => api.get(`/api/orders/${id}`);
export const updateOrderStatus = (orderId, status) => api.put(`/api/orders/${orderId}/status/${status}`);
export const updateOrderType = (orderId, orderType) => api.put(`/api/orders/${orderId}/type/${orderType}`);

export const addOrderItem = (data) => api.post('/order-items', data);

export const processPayment = (data) => api.post('/api/payments/', data);
export const generateQR = (orderId) => api.get(`/api/payments/qr/${orderId}`, { responseType: 'blob' });

export const getBillByOrderId = (orderId) => api.get(`/api/bills/order/${orderId}`);

export const getKitchenOrders = () => api.get('/api/kitchen/orders');
export const updateKitchenOrderStatus = (id, status) => api.put(`/api/kitchen/orders/${id}/status?status=${status}`);
