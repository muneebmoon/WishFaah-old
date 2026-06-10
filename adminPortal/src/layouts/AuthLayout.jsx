// layouts/AuthLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

function AuthLayout() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-white-500 to-cyan-600 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Logo or Brand */}
                <div className="text-center mb-8">
                    <img 
                        src="/logo.webp" 
                        alt="WishFaah" 
                        className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                    />
                    <h1 className="text-white text-2xl font-bold mt-4">WishFaah</h1>
                    <p className="text-white/80 text-sm">Admin Portal</p>
                </div>
                
                {/* Auth Form Container */}
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
                    <Outlet /> {/* This will render Login or Register component */}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;