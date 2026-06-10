// Layout.jsx
import React, { useState, useEffect } from 'react';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';

function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Check if screen is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Calculate margin based on sidebar state
    const getContentMargin = () => {
        if (isMobile) return 'ml-0';
        return sidebarCollapsed ? 'ml-20' : 'ml-64';
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <SideBar 
                onCollapseChange={setSidebarCollapsed}
                isCollapsed={sidebarCollapsed}
            />
            
            {/* Main content with responsive margin */}
            <div className={`transition-all duration-300 ${getContentMargin()}`}>
                {/* Add padding-top for mobile menu button */}
                <div className="pt-16 md:pt-0">
                    <main className="p-4 md:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;