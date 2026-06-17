import api from './axiosInstance';

export const loginAdmin = (data) => api.post('/api/auth/login', data);
export const registerAdmin = (data) => api.post('/api/auth/register', data);
export const getAllAdmins = () => api.get('/api/auth/');
export const getAdminById = (id) => api.get(`/api/auth/${id}`);
export const updateAdmin = (id, data) => api.put(`/api/auth/${id}`, data);
export const deleteAdmin = (id) => api.delete(`/api/auth/${id}`);
