import { apiClient } from "../../api/apiClient";

export const categoryRequest = {
    getAll: () => {
        return apiClient.get('/categories');
    },
   
    getById: (id) => {
        return apiClient.get(`/categories/${id}`);
    },

    create: (categoryData) => {
        return apiClient.post('/categories', categoryData);
    },

  
    update: (id, categoryData) => {
        return apiClient.put(`/categories/${id}`, categoryData);
    },


    delete: (id) => {
        return apiClient.delete(`/categories/${id}`);
    }
};