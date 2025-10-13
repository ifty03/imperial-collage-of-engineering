import { FaBars, FaBell } from "react-icons/fa";
import { UserButton, useUser } from "@clerk/clerk-react";

const AdminDashboardHeader = ({ setSidebarOpen }) => {
    const { user } = useUser();
    console.log(user);
    return (
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 flex items-center justify-between  py-4 px-5">
            {/* Hamburger for mobile */}
            <button
                className="md:hidden text-gray-700"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open sidebar"
            >
                <FaBars className="w-7 h-7" />
            </button>

            <div className="hidden md:block">
                <h2 className="text-xl font-semibold text-green-700">
                    Welcome, {user?.firstName}!
                </h2>
                <p className="text-sm text-gray-600">
                    ICE Academic Portal Admin Panel, Manage Everything.
                </p>
            </div>
            <div className="flex items-center space-x-8">
                {/* Notification */}
                <div className="relative hidden md:block">
                    <FaBell className="w-6 h-6 text-gray-700" />
                    <span className="absolute -top-2 -right-3 bg-green-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                        22
                    </span>
                </div>
                {/* User Info */}
                <div className="flex items-center space-x-3">
                    
                    <UserButton />
                    <div className="text-right">
                        <div className="font-medium text-gray-900">
                            {user?.firstName} • {user?.publicMetadata?.role}
                        </div>
                        <div className="text-xs text-gray-500">
                            {user?.primaryEmailAddress?.emailAddress}
                        </div>
                    </div>
                    <svg
                        className="w-4 h-4 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
                
            </div>
        </header>
    );
};

export default AdminDashboardHeader;