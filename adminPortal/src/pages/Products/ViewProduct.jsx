// pages/Products/ViewProduct.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MdEdit, MdDelete, MdZoomIn, MdClose, MdArrowBack, MdShoppingCart, MdCategory, MdCalendarToday, MdAttachMoney, MdLocalOffer } from 'react-icons/md';
import Button from '../../components/Button';
import { ProductRequest } from './productRequest';
import { categoryRequest } from '../Categories/categoryRequest';

function ViewProduct() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedImageForZoom, setSelectedImageForZoom] = useState(null);

    // Fetch product details and categories
    useEffect(() => {
        fetchProduct();
        fetchCategories();
    }, [id]);

    const fetchProduct = async () => {
        try {
            setLoading(true);
            const response = await ProductRequest.getById(id);
            setProduct(response);
        } catch (error) {
            console.error('Error fetching product:', error);
            alert('Failed to load product details. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await categoryRequest.getAll();
            setCategories(response || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Format date
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Format price
    const formatPrice = (price) => {
        if (!price) return 'N/A';
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'PKR'
        }).format(price);
    };

    // Get category name
    const getCategoryName = () => {
        const category = categories.find(cat => cat.id === product?.categoryId);
        return category?.name || 'N/A';
    };

    // Open image zoom modal
    const openZoomModal = (image) => {
        setSelectedImageForZoom(image);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
                    <p className="mt-4 text-gray-500">Loading product details...</p>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">Product not found</p>
                <Button
                    onClick={() => navigate('/products')}
                    variant="primary"
                    className="mt-4"
                >
                    Back to Products
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Product Details</h2>
                    <p className="text-gray-500 text-sm mt-1">View complete product information</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={() => navigate('/products')}
                        variant="outline"
                        size="md"
                        leftIcon={<MdArrowBack className="w-5 h-5" />}
                    >
                        Back to Products
                    </Button>
                    <Button
                        onClick={() => navigate(`/products/edit/${id}`)}
                        variant="primary"
                        size="md"
                        leftIcon={<MdEdit className="w-5 h-5" />}
                    >
                        Edit Product
                    </Button>
                </div>
            </div>

            {/* Main Content - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Product Images */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
                        
                        {/* Main Image Display */}
                        {product.images && product.images.length > 0 ? (
                            <div className="space-y-4">
                                <div className="relative">
                                    <img
                                        src={product.images[0]}
                                        alt={product.title}
                                        className="w-full h-96 object-contain rounded-lg border border-gray-200 bg-gray-50"
                                    />
                                    <button
                                        onClick={() => openZoomModal(product.images[0])}
                                        className="absolute bottom-4 right-4 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
                                        title="Zoom image"
                                    >
                                        <MdZoomIn className="w-5 h-5 text-gray-700" />
                                    </button>
                                </div>
                                
                                {/* Image Gallery */}
                                {product.images.length > 1 && (
                                    <div className="grid grid-cols-4 gap-3">
                                        {product.images.map((image, index) => (
                                            <div key={index} className="relative group">
                                                <img
                                                    src={image}
                                                    alt={`${product.title} - ${index + 1}`}
                                                    className="w-full h-24 object-cover rounded-lg border border-gray-200 cursor-pointer hover:border-cyan-500 transition-colors"
                                                    onClick={() => openZoomModal(image)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-gray-50 rounded-lg">
                                <p className="text-gray-400">No images available</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Product Information */}
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                        
                        <div className="space-y-4">
                            {/* Product Title */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Product Title
                                </label>
                                <p className="text-gray-900 font-medium">{product.title}</p>
                            </div>

                            {/* Price Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Regular Price
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <MdAttachMoney className="w-5 h-5 text-gray-400" />
                                        <p className="text-gray-900 font-semibold text-lg">
                                            {formatPrice(product.price)}
                                        </p>
                                    </div>
                                </div>
                                
                                {product.salePrice && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Sale Price
                                        </label>
                                        <div className="flex items-center gap-2">
                                            <MdLocalOffer className="w-5 h-5 text-green-600" />
                                            <p className="text-green-600 font-semibold text-lg">
                                                {formatPrice(product.salePrice)}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <div className="flex items-center gap-2">
                                    <MdCategory className="w-5 h-5 text-gray-400" />
                                    <p className="text-gray-900">{getCategoryName()}</p>
                                </div>
                            </div>

                            {/* Stock Status */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stock Status
                                </label>
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                    product.inStock 
                                        ? 'bg-green-100 text-green-800' 
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>

                            {/* Created Date */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Created Date
                                </label>
                                <div className="flex items-center gap-2">
                                    <MdCalendarToday className="w-5 h-5 text-gray-400" />
                                    <p className="text-gray-600">{formatDate(product.createdAt)}</p>
                                </div>
                            </div>

                            {/* Updated Date */}
                            {product.updatedAt && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Last Updated
                                    </label>
                                    <div className="flex items-center gap-2">
                                        <MdCalendarToday className="w-5 h-5 text-gray-400" />
                                        <p className="text-gray-600">{formatDate(product.updatedAt)}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Descriptions</h3>
                        
                        <div className="space-y-4">
                            {product.shortDescription && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Short Description
                                    </label>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 leading-relaxed">
                                            {product.shortDescription}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {product.longDescription && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Long Description
                                    </label>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                            {product.longDescription}
                                        </p>
                                    </div>
                                </div>
                            )}

                            {!product.shortDescription && !product.longDescription && (
                                <p className="text-gray-400 text-center py-4">No description provided</p>
                            )}
                        </div>
                    </div>

                    {/* Additional Actions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Actions</h3>
                        <div className="flex gap-3">
                            <Button
                                onClick={() => navigate(`/products/edit/${id}`)}
                                variant="primary"
                                size="md"
                                leftIcon={<MdEdit className="w-5 h-5" />}
                            >
                                Edit Product
                            </Button>
                            <Button
                                onClick={() => navigate('/products')}
                                variant="outline"
                                size="md"
                                leftIcon={<MdShoppingCart className="w-5 h-5" />}
                            >
                                View All Products
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image Zoom Modal */}
            {selectedImageForZoom && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-5xl w-full">
                        <button
                            onClick={() => setSelectedImageForZoom(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <MdClose className="w-8 h-8" />
                        </button>
                        <img
                            src={selectedImageForZoom}
                            alt="Zoomed product"
                            className="w-full h-auto rounded-lg shadow-2xl max-h-[90vh] object-contain"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default ViewProduct;