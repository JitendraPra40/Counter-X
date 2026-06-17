import api from './axiosInstance';

export const createCart = () => api.post('/cart', { totalAmount: 0.0 });
export const getCartById = (cartId) => api.get(`/cart/${cartId}`);
export const deleteCart = (cartId) => api.delete(`/cart/${cartId}`);

export const addCartItem = (data) => api.post('/cart-items', data);
export const getCartItems = (cartId) => api.get(`/cart-items/${cartId}`);
export const removeCartItem = (cartItemId) => api.delete(`/cart-items/${cartItemId}`);
export const clearCart = (cartId) => api.delete(`/cart-items/clear/${cartId}`);
