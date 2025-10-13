import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardSidebar from "../../components/AdminDashboard/AdminDashboardSidebar/AdminDashboardSidebar";
import AdminDashboardHeader from "../../components/AdminDashboard/AdminDashboardHeader/AdminDashboardHeader";


const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#f2faef] flex">
           
<AdminDashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Sticky Header */}
                <AdminDashboardHeader setSidebarOpen={setSidebarOpen} />
                {/* Breadcrumb & Content */}
                <main className="flex-1 px-8 py-6">
                    <div className="mb-4 flex items-center space-x-2 text-gray-600">
                        <span>Home</span>
                        <svg
                            className="w-4 h-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-400">Dashboard</span>
                    </div>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;