// pages/NotFound/NotFound.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import { MdErrorOutline, MdHome, MdArrowBack } from 'react-icons/md';

function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="text-center max-w-md">
                {/* Animated 404 Icon */}
                <div className="mb-8 animate-bounce">
                    <div className="inline-block p-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full shadow-2xl">
                        <MdErrorOutline className="w-24 h-24 text-white" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-8xl font-bold text-gray-800 mb-4">404</h1>
                <h2 className="text-3xl font-bold text-gray-700 mb-4">Page Not Found</h2>
                
                {/* Description */}
                <p className="text-gray-600 mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        onClick={() => navigate(-1)}
                        variant="outline"
                        size="lg"
                        leftIcon={<MdArrowBack className="w-5 h-5" />}
                    >
                        Go Back
                    </Button>
                    <Button
                        onClick={() => navigate('/dashboard')}
                        variant="primary"
                        size="lg"
                        leftIcon={<MdHome className="w-5 h-5" />}
                    >
                        Go to Dashboard
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default NotFound;