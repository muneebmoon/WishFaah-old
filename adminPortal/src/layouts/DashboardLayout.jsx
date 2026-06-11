// Layout.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SideBar from '../components/SideBar';
import { Outlet } from 'react-router-dom';
import { MdHome, MdChevronRight } from 'react-icons/md';

function DashboardLayout() {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const location = useLocation();

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

    // Get current page name from path
    const getPageTitle = () => {
        const path = location.pathname;
        const pageName = path.split('/').pop();
        
        const pageTitles = {
            'dashboard': 'Dashboard',
            'categories': 'Categories',
            'products': 'Products',
            'orders': 'Orders',
            'users': 'Customers',
            'settings': 'Settings',
            'profile': 'Profile',
            'reports': 'Reports'
        };
        
        return pageTitles[pageName] || pageName.charAt(0).toUpperCase() + pageName.slice(1);
    };

    // Generate breadcrumb items
    const getBreadcrumbs = () => {
        const paths = location.pathname.split('/').filter(path => path);
        
        const breadcrumbs = paths.map((path, index) => {
            const url = `/${paths.slice(0, index + 1).join('/')}`;
            const isLast = index === paths.length - 1;
            
            // Format the path name
            let label = path.charAt(0).toUpperCase() + path.slice(1);
            const pageTitles = {
                'dashboard': 'Dashboard',
                'categories': 'Categories',
                'products': 'Products',
                'orders': 'Orders',
                'users': 'Customers',
                'settings': 'Settings'
            };
            label = pageTitles[path] || label;
            
            return { label, url, isLast };
        });
        
        return breadcrumbs;
    };

    const breadcrumbs = getBreadcrumbs();
    const pageTitle = getPageTitle();

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
                    {/* Page Header / Breadcrumb Container */}
                    <div className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-10">
                        <div className="p-4 md:p-6">
                            {/* Breadcrumb Navigation */}
                            <div className="flex items-center text-sm text-gray-500 mb-2">
                                <Link to="/dashboard" className="hover:text-blue-600 transition-colors">
                                    <MdHome className="w-4 h-4" />
                                </Link>
                                {breadcrumbs.map((crumb, index) => (
                                    <div key={index} className="flex items-center">
                                        <MdChevronRight className="w-4 h-4 mx-1 text-gray-400" />
                                        {crumb.isLast ? (
                                            <span className="text-gray-700 font-medium">
                                                {crumb.label}
                                            </span>
                                        ) : (
                                            <Link 
                                                to={crumb.url} 
                                                className="hover:text-blue-600 transition-colors"
                                            >
                                                {crumb.label}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                            </div>
                            
                            {/* Page Title */}
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                                    {pageTitle}
                                </h1>
                            </div>
                        </div>
                    </div>
                    
                    {/* Main Content Area */}
                    <main className="p-4 md:p-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}

export default DashboardLayout;