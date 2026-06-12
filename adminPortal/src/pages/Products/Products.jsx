// pages/Products/Products.jsx
import React, { useState, useEffect } from 'react';
import { MdEdit, MdDelete, MdAdd, MdSearch, MdRefresh, MdVisibility } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { ProductRequest } from './productRequest';
import { categoryRequest } from '../Categories/categoryRequest';

function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [stockFilter, setStockFilter] = useState('all'); // 'all', 'inStock', 'outOfStock'
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pagination, setPagination] = useState({
        page: 0,
        size: 10,
        totalElements: 0,
        totalPages: 0
    });

    // Fetch all categories for filter dropdown
    const fetchCategories = async () => {
        try {
            const response = await categoryRequest.getAll();
            setCategories(response || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Fetch products with filters
    const fetchProducts = async () => {
        try {
            setLoading(true);
            
            let response;
            if (selectedCategory) {
                // Fetch by category
                response = await ProductRequest.getByCategoryId(selectedCategory);
                setProducts(response || []);
                setPagination(prev => ({ ...prev, totalElements: response?.length || 0 }));
            } else {
                // Fetch all with pagination
                response = await ProductRequest.getAll(pagination.page, pagination.size);
                // Extract content from paginated response
                setProducts(response?.content || []);
                setPagination({
                    page: response?.pageable?.pageNumber || 0,
                    size: response?.pageable?.pageSize || 10,
                    totalElements: response?.totalElements || 0,
                    totalPages: response?.totalPages || 0
                });
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            alert('Failed to load products. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [selectedCategory, pagination.page, pagination.size]);

    // Filter products based on search and stock filter
    const filteredProducts = products.filter(product => {
        const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             product.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase());
        
        const matchesStock = stockFilter === 'all' ? true :
                            stockFilter === 'inStock' ? product.inStock === true :
                            product.inStock === false;
        
        return matchesSearch && matchesStock;
    });

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

    // Format price
    const formatPrice = (price) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PKR'
        }).format(price);
    };

    // Handle delete product
    const handleDelete = async () => {
        if (!selectedProduct) return;
        
        try {
            await ProductRequest.delete(selectedProduct.id);
            await fetchProducts();
            setShowDeleteModal(false);
            setSelectedProduct(null);
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product. Please try again.');
        }
    };

    // Open delete modal
    const openDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    // Handle category filter change
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setPagination(prev => ({ ...prev, page: 0 }));
    };

    // Handle stock filter change
    const handleStockFilterChange = (e) => {
        setStockFilter(e.target.value);
    };

    // Handle page change
    const handlePageChange = (newPage) => {
        setPagination(prev => ({ ...prev, page: newPage }));
    };

    // Get category name by id
    const getCategoryName = (categoryId) => {
        const category = categories.find(cat => cat.id === categoryId);
        return category?.name || 'N/A';
    };

    // Get first image or placeholder
    const getProductImage = (images) => {
        if (images && images.length > 0) {
            return images[0];
        }
        return '/placeholder-image.jpg';
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Products</h2>
                    <p className="text-gray-500 text-sm mt-1">Manage your product inventory</p>
                </div>
                <Button
                    onClick={() => navigate('/products/addProduct')}
                    variant="primary"
                    size="md"
                    leftIcon={<MdAdd className="w-5 h-5" />}
                >
                    Add Product
                </Button>
            </div>

            {/* Filters Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Search Input */}
                    <div className="relative">
                        <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                        />
                    </div>

                    {/* Category Filter */}
                    <div className="relative">
                        <select
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white appearance-none cursor-pointer"
                        >
                            <option value="">All Categories</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Stock Filter */}
                    <div className="relative">
                        <select
                            value={stockFilter}
                            onChange={handleStockFilterChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white appearance-none cursor-pointer"
                        >
                            <option value="all">All Products</option>
                            <option value="inStock">In Stock</option>
                            <option value="outOfStock">Out of Stock</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Refresh Button */}
                    <Button
                        onClick={fetchProducts}
                        variant="outline"
                        size="md"
                        leftIcon={<MdRefresh className="w-5 h-5" />}
                        className="w-full"
                    >
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Products Table */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.No
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Image
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Product Title
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Sale Price
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Stock
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Created Date
                                </th>
                                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {loading ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                                            <p className="mt-2 text-gray-500">Loading products...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="9" className="px-6 py-12 text-center">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-gray-500">No products found</p>
                                            {searchTerm && (
                                                <button
                                                    onClick={() => setSearchTerm('')}
                                                    className="mt-2 text-blue-600 hover:text-blue-700"
                                                >
                                                    Clear search
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredProducts.map((product, index) => (
                                    <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-sm text-gray-900">
                                            {index + 1}
                                        </td>
                                        <td className="px-6 py-4">
                                            <img 
                                                src={getProductImage(product.images)} 
                                                alt={product.title}
                                                className="w-12 h-12 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-image.jpg';
                                                }}
                                            />
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900">
                                                {product.title}
                                            </div>
                                            {product.shortDescription && (
                                                <div className="text-xs text-gray-500 mt-1 max-w-xs">
                                                    {product.shortDescription.substring(0, 60)}
                                                    {product.shortDescription.length > 60 ? '...' : ''}
                                                </div>
                                            )}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {getCategoryName(product.categoryId)}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                                            {formatPrice(product.price)}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            {product.salePrice ? formatPrice(product.salePrice) : '—'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                product.inStock 
                                                    ? 'bg-green-100 text-green-800' 
                                                    : 'bg-red-100 text-red-800'
                                            }`}>
                                                {product.inStock ? 'In Stock' : 'Out of Stock'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                                            {formatDate(product.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-center whitespace-nowrap">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => navigate(`/products/viewProduct/${product.id}`)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View product"
                                                >
                                                    <MdVisibility className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/products/editProduct/${product.id}`)}
                                                    className="p-2 text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors"
                                                    title="Edit product"
                                                >
                                                    <MdEdit className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => openDeleteModal(product)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete product"
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

                {/* Table Footer with Pagination */}
                {!loading && filteredProducts.length > 0 && !selectedCategory && pagination.totalPages > 0 && (
                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-gray-600">
                            Showing {pagination.page * pagination.size + 1} to{' '}
                            {Math.min((pagination.page + 1) * pagination.size, pagination.totalElements)} of{' '}
                            {pagination.totalElements} products
                        </div>
                        <div className="flex items-center gap-2">
                            <Button
                                onClick={() => handlePageChange(pagination.page - 1)}
                                disabled={pagination.page === 0}
                                variant="outline"
                                size="sm"
                            >
                                Previous
                            </Button>
                            <span className="text-sm text-gray-600">
                                Page {pagination.page + 1} of {pagination.totalPages}
                            </span>
                            <Button
                                onClick={() => handlePageChange(pagination.page + 1)}
                                disabled={pagination.page + 1 >= pagination.totalPages}
                                variant="outline"
                                size="sm"
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                        <div className="p-6">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                                    <MdDelete className="w-6 h-6 text-red-600" />
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                                Delete Product
                            </h3>
                            <p className="text-gray-600 text-center mb-6">
                                Are you sure you want to delete product "{selectedProduct?.title}"?<br />
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
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;