import api from './axiosInstance';

export const getDashboardToday = () => api.get('/api/dashboard/today');
export const getDashboardWeek = () => api.get('/api/dashboard/week');
export const getDashboardMonth = () => api.get('/api/dashboard/month');
export const getAdminOrders = () => api.get('/api/admin/orders');
export const getTopItems = () => api.get('/api/admin/top-items');
export const getCategoryRevenue = () => api.get('/api/admin/category-revenue');

export const getInventory = () => api.get('/api/inventory/');
export const getInventoryById = (id) => api.get(`/api/inventory/${id}`);
export const createInventoryItem = (data) => api.post('/api/inventory/', data);
export const updateInventoryItem = (id, data) => api.put(`/api/inventory/${id}`, data);
export const deleteInventoryItem = (id) => api.delete(`/api/inventory/${id}`);
export const getInventorySummary = () => api.get('/api/dashboard/inventory/summary');
