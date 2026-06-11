// SideBar.jsx
import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    MdDashboard, 
    MdCategory, 
    MdProductionQuantityLimits,
    MdShoppingCart,
    MdPeople,
    MdSettings,
    MdLogout,
    MdMenu,
    MdClose
} from 'react-icons/md'

function SideBar({ onCollapseChange, isCollapsed: externalCollapsed }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [activeMenu, setActiveMenu] = useState("Dashboard");
    const [isCollapsed, setIsCollapsed] = useState(externalCollapsed || false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const menusItem = [
        {
            menuText: "Dashboard",
            path: "/dashboard",
            icon: <MdDashboard className="w-5 h-5" />
        },
        {
            menuText: "Categories",
            path: "/categories",
            icon: <MdCategory className="w-5 h-5" />
        },
        {
            menuText: "Products",
            path: "/products",
            icon: <MdProductionQuantityLimits className="w-5 h-5" />
        },
        {
            menuText: "Orders",
            path: "/orders",
            icon: <MdShoppingCart className="w-5 h-5" />
        },
        {
            menuText: "Customers",
            path: "/customers",
            icon: <MdPeople className="w-5 h-5" />
        },
        {
            menuText: "Settings",
            path: "/settings",
            icon: <MdSettings className="w-5 h-5" />
        }
    ];

    // Check if screen is mobile
    useEffect(() => {
        const checkMobile = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (mobile) {
                setIsMobileOpen(false);
            }
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Notify parent about collapse state
    useEffect(() => {
        if (onCollapseChange) {
            onCollapseChange(isCollapsed);
        }
    }, [isCollapsed, onCollapseChange]);

    // Close mobile sidebar when clicking outside
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (isMobileOpen && isMobile) {
                const sidebar = document.getElementById('sidebar');
                const menuBtn = document.getElementById('menu-btn');
                if (sidebar && !sidebar.contains(e.target) && !menuBtn?.contains(e.target)) {
                    setIsMobileOpen(false);
                }
            }
        };
        
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isMobileOpen, isMobile]);

    const handleNavigation = (path, menuText) => {
        setActiveMenu(menuText);

        if (window.location.pathname !== path) {
            navigate(path);
        }

        // Close mobile sidebar after navigation
        if (isMobile) {
            setIsMobileOpen(false);
        }
    };

    const handleLogout = ()=> {
        localStorage.removeItem("adminToken");
        navigate("/login");
    }

    const toggleSidebar = () => {
        if (isMobile) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    // Sidebar classes based on state
    const getSidebarClasses = () => {
        let classes = "fixed z-50 h-screen flex flex-col shadow-xl transition-all duration-300 ease-in-out ";
        
        if (isMobile) {
            classes += `${isMobileOpen ? 'left-0' : '-left-64'} top-0 w-64`;
        } else {
            classes += `${isCollapsed ? 'w-20' : 'w-64'} left-0 top-0`;
        }
        
        classes += " bg-gradient-to-b from-blue-300 to-cyan-700";
        return classes;
    };

    // Overlay for mobile
    const renderOverlay = () => {
        if (!isMobile || !isMobileOpen) return null;
        
        return (
            <div 
                className="fixed inset-0 bg-black/50 z-40 transition-opacity duration-300"
                onClick={() => setIsMobileOpen(false)}
            />
        );
    };

    // Mobile menu button
    const renderMenuButton = () => {
        if (!isMobile) return null;
        
        return (
            <button
                id="menu-btn"
                onClick={toggleSidebar}
                className="fixed top-4 left-4 z-50 p-2 bg-cyan-600 text-white rounded-lg shadow-lg hover:bg-cyan-700 transition-colors"
            >
                <MdMenu className="w-6 h-6" />
            </button>
        );
    };

    // Desktop toggle button
    const renderToggleButton = () => {
        if (isMobile) return null;
        
        return (
            <button
                onClick={toggleSidebar}
                className="absolute -right-3 top-20 bg-white rounded-full p-1 shadow-md z-10"
            >
                <svg className="w-4 h-4 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M13 5l7 7-7 7M5 5l7 7-7 7" : "M11 19l-7-7 7-7m8 14l-7-7 7-7"} />
                </svg>
            </button>
        );
    };

    return (
        <>
            {/* Mobile Menu Button */}
            {renderMenuButton()}
            
            {/* Mobile Overlay */}
            {renderOverlay()}
            
            {/* Sidebar */}
            <div id="sidebar" className={getSidebarClasses()}>
                {/* Close button for mobile */}
                {isMobile && isMobileOpen && (
                    <button
                        onClick={() => setIsMobileOpen(false)}
                        className="absolute top-4 right-4 text-white/70 hover:text-white"
                    >
                        <MdClose className="w-6 h-6" />
                    </button>
                )}
                
                {/* Desktop Toggle Button */}
                {renderToggleButton()}
                
                {/* Logo Container */}
                <div className={`logo-container p-6 border-b border-white/20 transition-all duration-300 ${isCollapsed && !isMobile ? 'px-2' : ''}`}>
                    <div className={`flex ${isCollapsed && !isMobile ? 'flex-col' : 'flex-col'} items-center`}>
                        <img 
                            src="/logo.webp" 
                            alt="WishFaah Logo" 
                            className={`rounded-full object-cover border-4 border-white/30 shadow-lg transition-all duration-300 ${
                                isCollapsed && !isMobile ? 'w-12 h-12' : 'w-24 h-24'
                            }`} 
                        />
                        {(!isCollapsed || isMobile) && (
                            <>
                                <h2 className="text-white text-xl font-bold mt-3">WishFaah</h2>
                                <p className="text-white/70 text-xs">Admin Portal</p>
                            </>
                        )}
                    </div>
                </div>
                
                {/* Menu Container */}
                <div className="menu-container flex-1 py-6 px-3 overflow-y-auto custom-scrollbar">
                    <div className="space-y-1">
                        {menusItem.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => handleNavigation(item.path, item.menuText)}
                                className={`
                                    flex items-center rounded-lg cursor-pointer transition-all duration-200 group relative
                                    ${isCollapsed && !isMobile ? 'justify-center' : 'space-x-3'}
                                    px-3 py-2.5
                                    ${activeMenu === item.menuText 
                                        ? 'bg-white/20 text-white shadow-md' 
                                        : 'text-white/70 hover:text-white hover:bg-white/10'
                                    }
                                `}
                                title={isCollapsed && !isMobile ? item.menuText : ''}
                            >
                                <span className={`text-lg transition-colors ${
                                    activeMenu === item.menuText ? 'text-white' : 'text-white/70 group-hover:text-white'
                                }`}>
                                    {item.icon}
                                </span>
                                
                                {(!isCollapsed || isMobile) && (
                                    <>
                                        <span className="font-medium text-sm flex-1">{item.menuText}</span>
                                        
                                        {/* Active indicator */}
                                        {activeMenu === item.menuText && (
                                            <div className="w-1 h-6 bg-white rounded-full"></div>
                                        )}
                                    </>
                                )}
                                
                                {/* Active indicator for collapsed mode */}
                                {isCollapsed && !isMobile && activeMenu === item.menuText && (
                                    <div className="absolute left-0 w-1 h-6 bg-white rounded-r-full"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 border-t border-white/20">
                    <div className={`
                        flex items-center rounded-lg cursor-pointer transition-all duration-200
                        ${isCollapsed && !isMobile ? 'justify-center' : 'space-x-3'}
                        text-white/70 hover:text-white px-3 py-2 hover:bg-white/10
                    `} onClick={handleLogout}>
                        <MdLogout className="w-5 h-5" />
                        {(!isCollapsed || isMobile) && (
                            <span className="font-medium text-sm">Logout</span>
                        )}
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                    height: 5px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.3);
                    border-radius: 10px;
                }
                
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.5);
                }
                
                .custom-scrollbar {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(255, 255, 255, 0.3) rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </>
    )
}

export default SideBar