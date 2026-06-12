import React from "react";
import { createBrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/DashBoard";
import Categories from "../pages/Categories/Categroies";
import Products from "../pages/Products/Products";
import Orders from "../pages/Orders/Orders";
import Customers from "../pages/Customers/Customers";
import Settings from "../pages/Settings/Settings";
import NotFound from "../pages/NotFound/NotFound";
import AddProduct from "../pages/Products/AddProduct";
import ViewProduct from "../pages/Products/ViewProduct";
import EditProduct from "../pages/Products/EditProduct";

const ProtectedRoutes = ({ children }) => {
    const isAuthenticated = localStorage.getItem("adminToken");

    if(!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children;
}

const PublicRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("adminToken");
    
    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }
    
    return children;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: (
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        ),
        children: [
            {index: true, element: <Login />}
        ],
    },

    {
        path: "/",
        element: (
            <ProtectedRoutes>
                <DashboardLayout />
            </ProtectedRoutes>
        ),
        children: [
            {index: true, element: <Navigate to="/dashboard" replace/> },
            { path: "dashboard", element: <Dashboard /> },
            { path: "categories", element: <Categories /> },
            { path: "products", element: <Products /> },
            { path: "orders", element: <Orders /> },
            { path: "customers", element: <Customers /> },
            { path: "settings", element: <Settings /> },
        ]
    },

    {
        path: "/products",
        element: (
            <ProtectedRoutes>
                <DashboardLayout />
            </ProtectedRoutes>
        ),
        children: [
            { path: "addProduct", element: <AddProduct /> },
            { path: "viewProduct/:id", element: <ViewProduct /> },
            { path: "editProduct/:id", element: <EditProduct /> }
        ]
    },

    // 404 Route - This catches all unmatched routes
    {
        path: "*",
        element: <NotFound />
    }
]);

export default router;