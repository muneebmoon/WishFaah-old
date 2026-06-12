// pages/Products/AddProduct.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdCloudUpload, MdDelete, MdZoomIn, MdClose, MdSave, MdCancel } from 'react-icons/md';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import { ProductRequest } from './productRequest';
import { categoryRequest } from '../Categories/categoryRequest';

function AddProduct() {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploadingImages, setUploadingImages] = useState(false);
    const [selectedImageForZoom, setSelectedImageForZoom] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        salePrice: '',
        shortDescription: '',
        longDescription: '',
        inStock: true,
        categoryId: ''
    });
    const [formErrors, setFormErrors] = useState({});
    const [images, setImages] = useState([]); // Store image URLs after upload
    const [imageFiles, setImageFiles] = useState([]); // Store files for upload

    // Fetch categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await categoryRequest.getAll();
            setCategories(response || []);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    // Handle form input changes
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        // Clear error when user types
        if (formErrors[name]) {
            setFormErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Handle image upload
    const handleImageUpload = async (e) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        // Validate file size (max 5MB per file)
        const invalidFiles = files.filter(file => file.size > 5 * 1024 * 1024);
        if (invalidFiles.length > 0) {
            alert('Some images exceed 5MB limit. Please choose smaller images.');
            return;
        }

        // Validate file types
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
        const invalidTypes = files.filter(file => !validTypes.includes(file.type));
        if (invalidTypes.length > 0) {
            alert('Only JPEG, PNG, WEBP images are allowed.');
            return;
        }

        setUploadingImages(true);

        // Simulate image upload to /public/product_images
        // In production, this would be an API call to your backend
        const uploadedImages = [];
        const uploadedFiles = [];

        for (const file of files) {
            try {
                // Create a local URL for preview
                const localUrl = URL.createObjectURL(file);
                uploadedImages.push(localUrl);
                uploadedFiles.push(file);
                
                // Here you would upload to your server
                // const formData = new FormData();
                // formData.append('image', file);
                // const response = await apiClient.post('/upload', formData);
                // uploadedImages.push(response.data.url);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }

        setImages(prev => [...prev, ...uploadedImages]);
        setImageFiles(prev => [...prev, ...uploadedFiles]);
        setUploadingImages(false);
    };

    // Remove image
    const removeImage = (index) => {
        setImages(prev => prev.filter((_, i) => i !== index));
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    // Open image zoom modal
    const openZoomModal = (image) => {
        setSelectedImageForZoom(image);
    };

    // Validate form
    const validateForm = () => {
        const errors = {};
        
        if (!formData.title.trim()) {
            errors.title = 'Product title is required';
        } else if (formData.title.length > 150) {
            errors.title = 'Title cannot exceed 150 characters';
        }
        
        if (!formData.price) {
            errors.price = 'Price is required';
        } else if (parseFloat(formData.price) <= 0) {
            errors.price = 'Price must be greater than zero';
        }
        
        if (formData.salePrice && parseFloat(formData.salePrice) <= 0) {
            errors.salePrice = 'Sale price must be greater than zero';
        }
        
        if (formData.salePrice && parseFloat(formData.salePrice) >= parseFloat(formData.price)) {
            errors.salePrice = 'Sale price must be less than regular price';
        }
        
        if (formData.shortDescription && formData.shortDescription.length > 500) {
            errors.shortDescription = 'Short description cannot exceed 500 characters';
        }
        
        if (!formData.categoryId) {
            errors.categoryId = 'Please select a category';
        }
        
        if (images.length === 0) {
            errors.images = 'At least one product image is required';
        }
        
        return errors;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }
        
        setLoading(true);
        
        // Prepare data for API
        const productData = {
            title: formData.title,
            price: parseFloat(formData.price),
            salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
            shortDescription: formData.shortDescription || null,
            longDescription: formData.longDescription || null,
            inStock: formData.inStock,
            categoryId: parseInt(formData.categoryId),
            images: images // In production, these would be URLs from server upload
        };
        
        try {
            const response = await ProductRequest.create(productData);
            console.log('Product created:', response);
            navigate('/products');
        } catch (error) {
            console.error('Error creating product:', error);
            alert('Failed to create product. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Add New Product</h2>
                    <p className="text-gray-500 text-sm mt-1">Create a new product listing</p>
                </div>
                <div className="flex gap-3">
                    <Button
                        onClick={() => navigate('/products')}
                        variant="outline"
                        size="md"
                        leftIcon={<MdCancel className="w-5 h-5" />}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSubmit}
                        variant="primary"
                        size="md"
                        loading={loading}
                        leftIcon={<MdSave className="w-5 h-5" />}
                    >
                        Save Product
                    </Button>
                </div>
            </div>

            {/* Main Content - Two Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Form */}
                <div className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Basic Information</h3>
                        
                        <div className="space-y-4">
                            <TextField
                                name="title"
                                label="Product Title"
                                placeholder="Enter product title"
                                value={formData.title}
                                onChange={handleChange}
                                error={formErrors.title}
                                required
                                fullWidth
                            />

                            <div className="grid grid-cols-2 gap-4">
                                <TextField
                                    name="price"
                                    type="number"
                                    label="Price"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleChange}
                                    error={formErrors.price}
                                    required
                                    fullWidth
                                />

                                <TextField
                                    name="salePrice"
                                    type="number"
                                    label="Sale Price"
                                    placeholder="0.00"
                                    value={formData.salePrice}
                                    onChange={handleChange}
                                    error={formErrors.salePrice}
                                    fullWidth
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Category
                                </label>
                                <select
                                    name="categoryId"
                                    value={formData.categoryId}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition bg-white ${
                                        formErrors.categoryId ? 'border-red-500' : 'border-gray-300'
                                    }`}
                                >
                                    <option value="">Select Category</option>
                                    {categories.map(category => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {formErrors.categoryId && (
                                    <p className="mt-1 text-sm text-red-600">{formErrors.categoryId}</p>
                                )}
                            </div>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="inStock"
                                    id="inStock"
                                    checked={formData.inStock}
                                    onChange={handleChange}
                                    className="w-4 h-4 text-cyan-600 border-gray-300 rounded focus:ring-cyan-500"
                                />
                                <label htmlFor="inStock" className="ml-2 text-sm text-gray-700">
                                    In Stock
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Descriptions</h3>
                        
                        <div className="space-y-4">
                            <TextField
                                name="shortDescription"
                                label="Short Description"
                                placeholder="Brief description of the product (max 500 chars)"
                                value={formData.shortDescription}
                                onChange={handleChange}
                                error={formErrors.shortDescription}
                                multiline
                                rows={3}
                                fullWidth
                            />

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Long Description
                                </label>
                                <textarea
                                    name="longDescription"
                                    value={formData.longDescription}
                                    onChange={handleChange}
                                    rows={6}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition"
                                    placeholder="Detailed description of the product"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Image Upload */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Product Images</h3>
                    
                    {/* Image Upload Area */}
                    <div className="mb-6">
                        <label className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-cyan-500 transition-colors block ${
                            formErrors.images ? 'border-red-500' : 'border-gray-300'
                        }`}>
                            <input
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/jpg,image/webp"
                                onChange={handleImageUpload}
                                className="hidden"
                                disabled={uploadingImages}
                            />
                            <MdCloudUpload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                            <p className="text-gray-600">Click or drag images to upload</p>
                            <p className="text-sm text-gray-400 mt-1">JPEG, PNG, WEBP up to 5MB each</p>
                        </label>
                        {formErrors.images && (
                            <p className="mt-2 text-sm text-red-600">{formErrors.images}</p>
                        )}
                    </div>

                    {/* Image Gallery */}
                    {uploadingImages && (
                        <div className="text-center py-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600 mx-auto"></div>
                            <p className="text-sm text-gray-500 mt-2">Uploading images...</p>
                        </div>
                    )}

                    {images.length > 0 && (
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {images.map((image, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={image}
                                        alt={`Product ${index + 1}`}
                                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center gap-2">
                                        <button
                                            onClick={() => openZoomModal(image)}
                                            className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
                                            title="Zoom"
                                        >
                                            <MdZoomIn className="w-5 h-5 text-gray-700" />
                                        </button>
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="p-2 bg-white rounded-full hover:bg-red-50 transition-colors"
                                            title="Remove"
                                        >
                                            <MdDelete className="w-5 h-5 text-red-600" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {images.length === 0 && !uploadingImages && (
                        <div className="text-center py-8">
                            <p className="text-gray-400">No images uploaded yet</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Zoom Modal */}
            {selectedImageForZoom && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="relative max-w-4xl w-full">
                        <button
                            onClick={() => setSelectedImageForZoom(null)}
                            className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
                        >
                            <MdClose className="w-8 h-8" />
                        </button>
                        <img
                            src={selectedImageForZoom}
                            alt="Zoomed product"
                            className="w-full h-auto rounded-lg shadow-2xl"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddProduct;