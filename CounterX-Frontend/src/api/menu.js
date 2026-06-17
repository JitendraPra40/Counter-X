import api from './axiosInstance';

export const getAllMenuItems = () => api.get('/api/menu/');
export const getAvailableMenuItems = () => api.get('/api/menu/available');
export const getMenuByCategory = (category) => api.get(`/api/menu/available/category/${category}`);
export const searchMenu = (name) => api.get(`/api/menu/search/${name}`);
export const getMenuItemById = (id) => api.get(`/api/menu/${id}`);
export const addMenuItem = (data) => api.post('/api/menu/', data);
export const updateMenuItem = (id, data) => api.put(`/api/menu/${id}`, data);
export const toggleMenuAvailability = (itemName, available) => api.put(`/api/menu/availability/${itemName}/${available}`);
export const deleteMenuItem = (id) => api.delete(`/api/menu/${id}`);
