// pages/Customers/Customers.jsx
import React, { useState, useEffect } from 'react';
import { MdDelete, MdSearch, MdRefresh, MdVisibility, MdEmail, MdPhone, MdLocationOn, MdCalendarToday } from 'react-icons/md';
import Button from '../../components/Button';
import { CustomerRequest } from './CustomerRequest';

function Customers() {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [showViewModal, setShowViewModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    // Fetch all customers
    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await CustomerRequest.getAll();
            setCustomers(response || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
            alert('Failed to load customers. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, []);

    // Filter customers based on search
    const filteredCustomers = customers.filter(customer =>
        customer.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.primaryPhoneNumber?.includes(searchTerm)
    );

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Handle delete customer
    const handleDelete = async () => {
        if (!selectedCustomer) return;
        
        try {
            await CustomerRequest.delete(selectedCustomer.id);
            await fetchCustomers();
            setShowDeleteModal(false);
            setSelectedCustomer(null);
        } catch (error) {
            console.error('Error deleting customer:', error);
            alert('Failed to delete customer. Please try again.');
        }
    };

    // Open view modal
    const openViewModal = (customer) => {
        setSelectedCustomer(customer);
        setShowViewModal(true);
    };

    // Open delete modal
    const openDeleteModal = (customer) => {
        setSelectedCustomer(customer);
        setShowDeleteModal(true);
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Customers</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your customer base</p>
                </div>
                <div className="text-sm text-gray-500">
                    Total Customers: {filteredCustomers.length}
                </div>
            </div>

            {/* Search and Filter Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search customers by name, email or phone number..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                        />
                    </div>
                    <Button
                        onClick={fetchCustomers}
                        variant="outline"
                        size="md"
                        leftIcon={<MdRefresh className="w-5 h-5" />}
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Customers Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Customer Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Phone Number
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Joined Date
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
                                            <p className="mt-2 text-gray-500">Loading customers...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredCustomers.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-gray-500">No customers found</p>
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm('')}
                                                    className="mt-2 text-cyan-600 hover:text-cyan-700"
                                                >
                                                    Clear search
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredCustomers.map((customer, index) => (
                                    <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {customer.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {customer.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm text-gray-600">
                                                {customer.primaryPhoneNumber}
                                            </div>
                                            {customer.secondaryPhoneNumber && (
                                                <div className="text-xs text-gray-400">
                                                    Sec: {customer.secondaryPhoneNumber}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {formatDate(customer.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => openViewModal(customer)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View customer"
                                                >
                                                    <MdVisibility className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(customer)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete customer"
                                                >
                                                    <MdDelete className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Table Footer with stats */}
                {!loading && filteredCustomers.length > 0 && (
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <div className="text-sm text-gray-600">
                            Showing {filteredCustomers.length} of {customers.length} customers
                        </div>
                    </div>
                )}
            </div>

            {/* View Customer Modal */}
            {showViewModal && selectedCustomer && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                            <h3 className="text-xl font-bold text-gray-800">Customer Details</h3>
                            <button
                                onClick={() => setShowViewModal(false)}
                                className="text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 space-y-6">
                            {/* Basic Information */}
                            <div>
                                <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                    <span className="w-1 h-6 bg-cyan-500 rounded"></span>
                                    Basic Information
                                </h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Full Name
                                        </label>
                                        <p className="text-gray-900 font-medium">{selectedCustomer.name}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Email Address
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MdEmail className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{selectedCustomer.email}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Primary Phone
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MdPhone className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{selectedCustomer.primaryPhoneNumber}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Secondary Phone
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MdPhone className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">
                                                {selectedCustomer.secondaryPhoneNumber || '—'}
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-500 mb-1">
                                            Member Since
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MdCalendarToday className="w-4 h-4 text-gray-400" />
                                            <p className="text-gray-900">{formatDate(selectedCustomer.createdAt)}</p>
                                        </div>
                                    </div>
                                    {selectedCustomer.updatedAt && selectedCustomer.updatedAt !== selectedCustomer.createdAt && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                                Last Updated
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <MdCalendarToday className="w-4 h-4 text-gray-400" />
                                                <p className="text-gray-900">{formatDate(selectedCustomer.updatedAt)}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Addresses Section */}
                            {selectedCustomer.addresses && selectedCustomer.addresses.length > 0 && (
                                <div>
                                    <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                                        <span className="w-1 h-6 bg-cyan-500 rounded"></span>
                                        <MdLocationOn className="w-5 h-5 text-gray-600" />
                                        Saved Addresses
                                    </h4>
                                    <div className="space-y-3">
                                        {selectedCustomer.addresses.map((address, index) => (
                                            <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                                                <p className="font-medium text-gray-800 mb-1">{address.label}</p>
                                                <p className="text-gray-600 text-sm">{address.fullAddress}</p>
                                                <p className="text-gray-500 text-sm mt-1">City: {address.city}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Modal Footer */}
                        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 px-6 py-4 flex justify-end">
                            <Button
                                onClick={() => setShowViewModal(false)}
                                variant="outline"
                                size="md"
                            >
                                Close
                            </Button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedCustomer && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <MdDelete className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                                Delete Customer
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to delete customer <br />
                                <span className="font-semibold text-gray-800">"{selectedCustomer.name}"</span>?<br />
                                This action cannot be undone.
                            </p>
                            <div className="flex gap-3 justify-end">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="button"
                                    variant="danger"
                                    onClick={handleDelete}
                                >
                                    Delete Customer
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Customers;