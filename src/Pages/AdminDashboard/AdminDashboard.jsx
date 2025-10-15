import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboardSidebar from "../../components/AdminDashboard/AdminDashboardSidebar/AdminDashboardSidebar";
import AdminDashboardHeader from "../../components/AdminDashboard/AdminDashboardHeader/AdminDashboardHeader";


const AdminDashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F0FBEF] flex">

            <AdminDashboardSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Sticky Header */}
                <AdminDashboardHeader setSidebarOpen={setSidebarOpen} />
                {/* Breadcrumb & Content */}
                <main className="flex-1 p-5 max-w-screen-max_screen mx-auto  w-full">
                    
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;