// pages/Customers/customerRequest.js
import { apiClient } from '../../api/apiClient';

export const CustomerRequest = {

    // Get all customers (admin only)
    getAll: () => {
        return apiClient.get('/customers');
    },
    
    // Get customer by ID
    getById: (id) => {
        return apiClient.get(`/customers/${id}`);
    },
    
    // Get customer by email
    getByEmail: (email) => {
        return apiClient.get(`/customers/email?value=${encodeURIComponent(email)}`);
    },
    
    // Delete customer (admin only)
    delete: (id) => {
        return apiClient.delete(`/customers/${id}`);
    }
};