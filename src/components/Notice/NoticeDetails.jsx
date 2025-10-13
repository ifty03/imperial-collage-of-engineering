import React, { useState } from "react";
import noticeImg from "../../assets/notice/banner.png";
import bg from "../../assets/notice/bg.png";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";





const NoticeDetails = () => {
    const [selectedCategory, setSelectedCategory] = useState("Event Overview");

    const categories = [
        "Event Overview",
        "Event Image",
        "Event Details",
    ];

    return (
        <>
            <Navbar></Navbar>

            <div className="relative">
                <img className="w-full" src={noticeImg} alt="notice image" />
                <img className="absolute -bottom-28 left-0 w-[25%] z-[-1]" src={bg} alt="notice image" />
                <div className="py-5 max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5">
                    <Breadcrumb items={[{ name: "Notice", path: "notice" }, { name: "Details", path: "details" }]} />
                </div>
                {/* Notice details design */}
                <div className="max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5">
                    <div className={`pb-6 `}>
                        <div className="text-sm text-gray-600 flex flex-wrap gap-2 mb-2">
                            <span>
                                Category: <span className="">Program & Event</span>
                            </span>
                            <span className="text-green-500">|</span>
                            <span>
                                Publish Date: <span className="">January 6th, 2019 - 8:45pm</span>
                            </span>
                        </div>
                        <h2
                            className={`font-medium text-2xl md:text-3xl  cursor-pointer`}
                        >
                            Farewell Ceremony for Batch 03, Dept. of CSE, Session 2019-20
                        </h2>
                    </div>

                    <div className=" flex flex-col md:flex-row gap-8">
                        {/* Sidebar */}
                        <aside className="w-full md:w-1/4 border-r border-gray-200 pr-4">
                            <ul className="space-y-3">
                                {categories.map((cat) => (
                                    <li key={cat}>
                                        <button
                                            className={`w-full  text-left px-4 py-3 ${selectedCategory === cat
                                                ? "bg-noticeGradient text-green-700 font-medium border-l-4 border-primary"
                                                : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                            onClick={() => setSelectedCategory(cat)}
                                        >
                                            {cat}
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </aside>
                        {/* Main content */}
                        <main className="flex-1">

                            {/* Notices details */}
                            <div className="space-y-8 mt-10">
                                <h2>here all data</h2>
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default NoticeDetails;