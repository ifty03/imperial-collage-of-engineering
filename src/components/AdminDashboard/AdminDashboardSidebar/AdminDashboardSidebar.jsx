import { useState } from "react";
import { MdOutlineSchool, MdOutlineBookmarkBorder } from "react-icons/md";
import { HiOutlineAcademicCap } from "react-icons/hi";
import { BiUserCircle } from "react-icons/bi";
import logo from "../../../assets/Logo.png";
import { FaBell, FaCog, FaSignOutAlt, FaTimes, FaPlus, FaList } from "react-icons/fa";
import { PiHouseLineBold } from "react-icons/pi";

const sidebarItems = [
    { label: "Dashboard", icon: <MdOutlineBookmarkBorder className="w-5 h-5" />, active: false },
    { label: "Departments", icon: <MdOutlineSchool className="w-5 h-5" />, dropdown: true, active: true },
    { label: "Academics", icon: <HiOutlineAcademicCap className="w-5 h-5" />, dropdown: true, active: false },
    { label: "About Us", icon: <MdOutlineBookmarkBorder className="w-5 h-5" />, dropdown: true, active: false },
    { label: "Notice", icon: <FaBell className="w-5 h-5" />, active: false },
    { label: "Alumni", icon: <BiUserCircle className="w-5 h-5" />, active: false },
];

const bottomItems = [
    { label: "Settings", icon: <FaCog className="w-5 h-5" /> },
    { label: "Logout", icon: <FaSignOutAlt className="w-5 h-5" /> },
];

const departmentDropdown = [
    {
        label: "Add Department",
        icon: <FaPlus className="w-4 h-4" />,
        active: true,
    },
    {
        label: "Department List",
        icon: <FaList className="w-5 h-5" />,
        active: false,
    },
    {
        label: "Lab & Infrastructure",
        icon: <PiHouseLineBold className="w-5 h-5" />,
        active: false,
    },
];

const AdminDashboardSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const [openDropdown, setOpenDropdown] = useState("Departments");

    return (
        <div>
            {/* Sidebar for desktop */}
            <aside className="hidden md:flex w-72 h-screen sticky top-0 bg-white border-r border-gray-200 flex-col justify-between py-6 px-4">
                <div>
                    {/* Logo */}
                    <div className="flex items-center justify-center mb-8">
                        <img src={logo} alt="Imperial Logo" className="h-9  mr-2" />
                    </div>
                    {/* Sidebar Items */}
                    <ul className="space-y-2">
                        {sidebarItems.map((item) => (
                            <li key={item.label} className="relative">
                                <button
                                    className={`flex items-center w-full px-4 py-2 rounded transition text-gray-700 hover:bg-gray-50 focus:bg-[#F0FBEF] focus:text-primary group font-semibold`}
                                    onClick={() => {
                                        if (item.dropdown) {
                                            setOpenDropdown(openDropdown === item.label ? null : item.label);
                                        }
                                    }}
                                >
                                    {item.icon}
                                    <span className="ml-3 ">{item.label}</span>
                                    {item.dropdown && (
                                        <svg
                                            className="ml-auto w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </button>
                                {/* Dropdown for Departments */}
                                {item.dropdown && item.label === openDropdown && item.active && (
                                    <div className="pl-6 pt-2">
                                        <div className="border-l-2 border-gray-300 ml-2">
                                            <ul className="space-y-2 mt-2">
                                                {departmentDropdown.map((d, idx) => (
                                                    <li key={d.label}>
                                                        <button
                                                            className={`flex items-center w-full px-4 py-2 rounded transition focus:text-primary`}
                                                        >
                                                            {d.icon}
                                                            <span className="ml-3 whitespace-nowrap">{d.label}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                {/* Bottom Items */}
                <div className="space-y-1">
                    {bottomItems.map((item) => (
                        <button
                            key={item.label}
                            className="flex items-center w-full px-4 py-2 rounded text-gray-700 hover:bg-gray-50 focus:bg-[#F0FBEF] focus:text-primary"
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                </div>
            </aside>

            {/* Sidebar Drawer for mobile */}
            <div
                className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity duration-300 ${sidebarOpen ? "block md:hidden" : "hidden"
                    }`}
                onClick={() => setSidebarOpen(false)}
            ></div>
            <aside
                className={`fixed top-0 right-0 z-50 h-screen w-64 bg-white border-l border-gray-200 flex flex-col justify-between py-6 px-4 transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "translate-x-full"
                    } md:hidden`}
            >
                <div>
                    <div className="flex items-center mb-8 justify-between">
                        <img src={logo} alt="Imperial Logo" className="h-9 mr-2" />
                        <button
                            className="text-gray-700"
                            onClick={() => setSidebarOpen(false)}
                            aria-label="Close sidebar"
                        >
                            <FaTimes className="w-6 h-6" />
                        </button>
                    </div>
                    <ul className="space-y-1">
                        {sidebarItems.map((item) => (
                            <li key={item.label} className="relative">
                                <button
                                    className={`flex items-center w-full px-4 py-2 rounded transition ${item.active
                                        ? "bg-green-50 text-green-700 font-semibold"
                                        : "text-gray-700 hover:bg-gray-50"
                                        }`}
                                    onClick={() => {
                                        if (item.dropdown) {
                                            setOpenDropdown(openDropdown === item.label ? null : item.label);
                                        }
                                    }}
                                >
                                    {item.icon}
                                    <span className="ml-3">{item.label}</span>
                                    {item.dropdown && (
                                        <svg
                                            className="ml-auto w-4 h-4 text-green-600"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M19 9l-7 7-7-7" />
                                        </svg>
                                    )}
                                </button>
                                {/* Dropdown for Departments */}
                                {item.dropdown && item.label === openDropdown && item.active && (
                                    <div className="pl-6 pt-2">
                                        <div className="border-l-2 border-gray-300 ml-2">
                                            <ul className="space-y-2 mt-2">
                                                {departmentDropdown.map((d, idx) => (
                                                    <li key={d.label}>
                                                        <button
                                                            className={`flex items-center w-full px-4 py-2 rounded transition ${d.active
                                                                ? "bg-green-50 text-green-700 font-semibold"
                                                                : "text-gray-700 hover:bg-gray-50"
                                                                }`}
                                                        >
                                                            {d.icon}
                                                            <span className="ml-3">{d.label}</span>
                                                        </button>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="space-y-1">
                    {bottomItems.map((item) => (
                        <button
                            key={item.label}
                            className="flex items-center w-full px-4 py-2 rounded text-gray-700 hover:bg-gray-50"
                        >
                            {item.icon}
                            <span className="ml-3">{item.label}</span>
                        </button>
                    ))}
                </div>
            </aside>
        </div>
    );
};

export default AdminDashboardSidebar;