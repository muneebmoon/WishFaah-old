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

    // Image upload endpoint (add this when backend is ready)
    uploadImage: (file) => {
        const formData = new FormData();
        formData.append('image', file);
        return apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    }
};