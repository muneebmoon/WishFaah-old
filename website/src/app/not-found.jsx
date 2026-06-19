import React from 'react';
import Link from 'next/link';
import { 
  FiHome, 
  FiArrowLeft, 
  FiSearch, 
  FiShoppingBag, 
  FiCompass 
} from 'react-icons/fi';

// This is a Server Component - no "use client" needed
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F0D7] relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">

        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#C5D89D] opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-[#9CAB84] opacity-10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border-4 border-[#C5D89D] opacity-5"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full border-4 border-[#9CAB84] opacity-5"></div>
        
        <div 
          className="absolute top-20 left-10 w-16 h-16 bg-[#89986D] opacity-5 rotate-12"
          style={{ 
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-20 right-10 w-12 h-12 bg-[#9CAB84] opacity-5 rotate-45"
          style={{ 
            animation: 'float-delayed 7s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute top-1/3 right-1/4 w-8 h-8 bg-[#C5D89D] opacity-10 rounded-full"
          style={{ 
            animation: 'float 6s ease-in-out infinite'
          }}
        ></div>
        <div 
          className="absolute bottom-1/3 left-1/4 w-10 h-10 bg-[#89986D] opacity-5 rounded-full"
          style={{ 
            animation: 'float-delayed 7s ease-in-out infinite'
          }}
        ></div>
        
        {/* Decorative Dots Pattern */}
        <div className="absolute top-10 right-20 grid grid-cols-5 gap-3 opacity-20">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#89986D]"></div>
          ))}
        </div>
        <div className="absolute bottom-10 left-20 grid grid-cols-5 gap-3 opacity-20">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#89986D]"></div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          {/* 404 Number with Creative Design */}
          <div className="relative mb-8">
            <div className="text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none tracking-tighter select-none" 
                 style={{ color: '#89986D' }}>
              4
              <span className="relative inline-block mx-2" style={{ color: '#9CAB84' }}>
                0
                <div className="absolute inset-0 flex items-center justify-center">
                  <div 
                    className="w-8 h-8 sm:w-12 sm:h-12 rounded-full border-4 border-[#C5D89D] opacity-30"
                    style={{ animation: 'spin-slow 8s linear infinite' }}
                  ></div>
                </div>
              </span>
              4
            </div>
            
            {/* Decorative Line Under 404 */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#89986D] to-transparent opacity-30"></div>
          </div>

          {/* Error Message */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4" style={{ color: '#4A5A3A' }}>
            Oops! Page Not Found
          </h1>
          <p className="text-base sm:text-lg mb-8 max-w-md mx-auto" style={{ color: '#4A5A3A' }}>
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl"
              style={{ backgroundColor: '#89986D' }}
            >
              <FiHome size={18} className="group-hover:rotate-[-5deg] transition-transform duration-200" />
              <span>Back to Home</span>
            </Link>
            
            <Link 
              href="/"
              className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-lg font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ 
                backgroundColor: '#C5D89D',
                color: '#4A5A3A'
              }}
            >
              <FiArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
              <span>Go Back</span>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            <Link 
              href="/shop"
              className="group p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: 'rgba(197, 216, 157, 0.2)' }}
            >
              <FiShoppingBag size={24} className="mx-auto mb-2" style={{ color: '#89986D' }} />
              <span className="text-sm font-medium block" style={{ color: '#4A5A3A' }}>Shop Now</span>
            </Link>
            
            <Link 
              href="/collections"
              className="group p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: 'rgba(197, 216, 157, 0.2)' }}
            >
              <FiCompass size={24} className="mx-auto mb-2" style={{ color: '#89986D' }} />
              <span className="text-sm font-medium block" style={{ color: '#4A5A3A' }}>Collections</span>
            </Link>
            
            <Link 
              href="/search"
              className="group p-4 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ backgroundColor: 'rgba(197, 216, 157, 0.2)' }}
            >
              <FiSearch size={24} className="mx-auto mb-2" style={{ color: '#89986D' }} />
              <span className="text-sm font-medium block" style={{ color: '#4A5A3A' }}>Search</span>
            </Link>
          </div>

          {/* Fun Element - Decorative Text */}
          <div className="mt-12 flex items-center justify-center gap-4">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5D89D] to-transparent"></div>
            <span className="text-xs font-medium px-4" style={{ color: '#9CAB84' }}>
              ✦ Lost? We'll find your way ✦
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#C5D89D] to-transparent"></div>
          </div>
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes float {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-delayed {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(-5deg); }
          }
          @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `
      }} />
    </div>
  );
}