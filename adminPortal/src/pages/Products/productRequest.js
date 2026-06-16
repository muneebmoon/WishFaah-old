// pages/Products/productRequest.js
import { apiClient } from '../../api/apiClient';

export const ProductRequest = {
    getAll: (page = 0, size = 10, sortBy = 'id', direction = 'DESC') => {
        return apiClient.get(`/products?page=${page}&size=${size}&sortBy=${sortBy}&direction=${direction}`);
    },
    
    getById: (id) => {
        return apiClient.get(`/products/${id}`);
    },

    getByCategoryId: (id) => {
        return apiClient.get(`/products/category/${id}`);
    },

    create: (productData) => {
        return apiClient.post('/products', productData);
    },

    update: (id, productData) => {
        return apiClient.put(`/products/${id}`, productData);
    },

    delete: (id) => {
        return apiClient.delete(`/products/${id}`);
    },

    // New: Extract product details using AI
    extractProductDetails: (rawText) => {
        return apiClient.post('/products/extract-product', { rawText });
    }
};