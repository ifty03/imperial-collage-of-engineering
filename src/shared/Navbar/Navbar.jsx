import React, { useState } from "react";
import { FaChevronDown, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import logo from "../../assets/Logo.png";
import { CiLock } from "react-icons/ci";
import { MdArrowOutward } from "react-icons/md";

const navItems = [
    { label: "Home" },
    { label: "Departments", icon: <FaChevronDown className="ml-1 w-3 h-3 text-green-600" /> },
    { label: "Academics", icon: <FaChevronDown className="ml-1 w-3 h-3 text-primary" /> },
    { label: "Facilities", icon: <FaChevronDown className="ml-1 w-3 h-3 text-primary" /> },
    { label: "Event & Activities", icon: <FaChevronDown className="ml-1 w-3 h-3 text-primary" /> },
    { label: "About Us", icon: <FaChevronDown className="ml-1 w-3 h-3 text-primary" /> },
];

const Navbar = () => {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <nav className="w-full border-b">
            <div className="w-full flex max-w-max_screen mx-auto md:px-10 px-5">
            <div className="md:flex justify-center items-center hidden ">
                    <img src={logo} alt="Imperial College of Engineering " className="" />
            </div>
            <div className="w-full md:border-l ">
                {/* Top bar */}

                <div className="flex items-center justify-between justify-end px-4 lg:px-8">
                        <div className="flex justify-center items-center md:hidden ">
                            <img src={logo} alt="Imperial College of Engineering " className="w-[120px] " />
                        </div>
                    {/* Top menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <a href="#" className="text-primary font-medium">Notice</a>
                        <a href="#" className="text-primaryText font-medium">Alumni</a>
                        <a href="#" className="text-primaryText font-medium">Contact</a>
                        <div className="flex items-center space-x-2">
                            <button className="bg-[#F2F1ED] px-4 py-2 rounded-full flex items-center space-x-1 text-primaryText font-medium">
                                <span>Staff</span>
                                <CiLock className="w-4 h-4 text-primary" />
                            </button>
                            <button className="bg-[#F2F1ED] px-4 py-2 rounded-full flex items-center space-x-1 text-primaryText font-medium">
                                <span>Current Student</span>
                                <FaChevronDown className="w-3 h-3 text-primary" />
                            </button>
                        </div>
                    </div>
                    {/* Search and Login */}
                    <div className="flex items-center justify-between space-x-2">
                        <div className="relative hidden md:block">
                            <input
                                type="text"
                                placeholder="Search here..."
                                className="pl-8 pr-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-200 text-sm"
                            />
                            <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                        </div>
                        <button className="bg-primary hover:bg-primary/80 text-white px-10 py-4 font-semibold flex items-center">
                            Log in
                            <MdArrowOutward className="ml-1 w-5 h-5" />
                        </button>
                        {/* Hamburger for mobile */}
                        <button
                            className="md:hidden pr-4 pl-2 py-4 border-r text-primaryText "
                            onClick={() => setMobileOpen(!mobileOpen)}
                            aria-label="Open menu"
                        >
                            {mobileOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
                {/* Main nav */}
                    <div className="w-full bg-white md:border-t md:py-1.5">
                    <div className="hidden md:flex flex-wrap items-center justify-center md:justify-start px-4 lg:px-8 py-2 space-x-4 md:space-x-8">
                        {navItems.map((item) => (
                            <a
                                key={item.label}
                                href="#"
                                className="flex items-center gap-1 text-primaryText font-medium"
                            >
                                {item.label}
                                {item.icon}
                            </a>
                        ))}
                    </div>
                    {/* Mobile menu */}
                    {mobileOpen && (
                        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-2">
                            <div className="flex flex-col space-y-2">
                                <a href="#" className="text-green-600 font-medium">Notice</a>
                                <a href="#" className="text-primaryText">Alumni</a>
                                <a href="#" className="text-primaryText">Contact</a>
                                <button className="bg-[#F2F1ED] px-4 py-2 rounded-full flex items-center space-x-1 text-primaryText w-fit">
                                    <span>Staff</span>
                                        <CiLock className="w-4 h-4 text-primary" />
                                </button>
                                <button className="bg-[#F2F1ED] px-4 py-2 rounded-full flex items-center space-x-1 text-primaryText w-fit">
                                    <span>Current Student</span>
                                    <FaChevronDown className="w-3 h-3 text-primary" />
                                </button>
                                <div className="relative mt-2">
                                    <input
                                        type="text"
                                        placeholder="Search here..."
                                        className="pl-8 pr-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-green-200 text-sm w-full"
                                    />
                                    <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-primary" />
                                </div>
                                <button className="bg-primary hover:bg-primary/80 text-white px-10 py-4 rounded font-medium text-sm flex items-center mt-2 w-fit">
                                    Log in
                                    <MdArrowOutward className="ml-1 w-5 h-5" />
                                </button>
                                <div className="flex flex-col space-y-2 mt-4">
                                    {navItems.map((item) => (
                                        <a
                                            key={item.label}
                                            href="#"
                                            className="flex items-center text-primaryText font-medium"
                                        >
                                            {item.label}
                                            {item.icon}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            </div>
        </nav>
    );
};

export default Navbar;