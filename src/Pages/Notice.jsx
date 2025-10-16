import React, { useState } from "react";
import noticeImg from "../assets/notice/banner.png";
import bg from "../assets/notice/bg.png";
import Breadcrumb from "../components/Breadcrumb";
import { Link } from "react-router-dom";
import Navbar from "../shared/Navbar/Navbar";
import Footer from "../shared/Footer/Footer";
import Pagination from "../shared/Pagination/Pagination";
import useGetData from "../Hooks/useGetData";
import { server_url } from "../Config/API";
import Loader from "../shared/Loader";
import { format } from "date-fns";

const categories = [
    "All Notices",
    "Announcements",
    "Notices",
    "Results",
    "Program & Events",
    "Departments",
];

const notices = [
    {
        category: "Program & Event",
        title: "Farewell Ceremony for Batch 03, Dept. of CSE, Session...",
        date: "January 6th, 2019 - 8:45pm",
        type: "Program & Event",
        publish: "January 6th, 2019 - 8:45pm",
        highlight: true,
    },
    {
        category: "Workshop",
        title: "Introduction to Machine Learning, Dept. of CSE, Spring 2020",
        date: "February 15th, 2020 - 10:00am",
        type: "Workshop",
        publish: "February 15th, 2020 - 10:00am",
    },
    {
        category: "Seminar",
        title: "Sustainable Energy Solutions, Dept. of EEE, Spring 2021",
        date: "March 22nd, 2021 - 2:30pm",
        type: "Seminar",
        publish: "March 22nd, 2021 - 2:30pm",
    },
    {
        category: "Conference",
        title: "Annual Tech Innovations Conference, All Departments, Fall 2022",
        date: "April 10th, 2022 - 9:00am",
        type: "Conference",
        publish: "April 10th, 2022 - 9:00am",
    },
    {
        category: "Guest Lecture",
        title: "The Future of AI in Healthcare, Dept. of CSE, Summer 2023",
        date: "May 5th, 2023 - 1:00pm",
        type: "Guest Lecture",
        publish: "May 5th, 2023 - 1:00pm",
    },
];


const Notice = () => {
    const [selectedCategory, setSelectedCategory] = useState("All Notices");
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const { data, loading } = useGetData(
        `${server_url}/notice/getNotice`,
        { params: { page: currentPage, limit: pageLimit } }
    );

    const filterNotices = (cat) => {
        if (cat === "All Notices") {
            return data?.data || []
        }else{
            const filtered = data?.data?.filter(n=>n.category===cat);
            return filtered || [];
        }

    };

    const filteredNotices = filterNotices(selectedCategory);

    if (loading) {
        return <Loader />
    }

    return (
        <>
        <Navbar/>
        <div className="relative">
            <img className="w-full" src={noticeImg} alt="notice image" />
            <img className="absolute -bottom-28 left-0 w-[25%] z-[-1]" src={bg} alt="notice image" />
            <div className="py-5 max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5">
                <Breadcrumb items={[{ name: "Notice", path: "notice" }]} />
            </div>
            {/* Notice design */}
            <div className="max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5 flex flex-col md:flex-row gap-8">
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
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center">
                        <select className="border border-gray-300 rounded px-4 py-2 text-gray-700 w-full md:w-48">
                            <option>- Any -</option>
                        </select>
                        <select className="border border-gray-300 rounded px-4 py-2 text-gray-700 w-full md:w-48">
                            <option>- Year -</option>
                        </select>
                        <button className="border border-gray-700 rounded px-6 py-2 text-gray-700 font-medium w-full md:w-auto">
                            Search Archives
                        </button>
                    </div>
                    {/* Notices */}
                    <div className="space-y-8 mt-10">
                        {filteredNotices?.map((notice, idx) => (
                            <Link to={`/notice/details/${notice?._id}`} key={notice?._id}>
                                <div key={idx} className={`mt-5 pb-6 ${filterNotices?.length > idx ? "" : "border-b border-gray-200"}`}>
                                    <div className="text-sm text-gray-600 flex flex-wrap gap-2 mb-1">
                                        <span>
                                            Category: <span className="">{notice.category}</span>
                                        </span>
                                        <span className="text-green-500">|</span>
                                        <span className="flex items-center gap-2">
                                            Publish Date: <span className=""><p>{format(new Date(notice.createdAt), "MMMM do, yyyy - h:mma").toLowerCase()}</p>
</span>
                                        </span>
                                    </div>
                                    <h2
                                        className={`font-medium text-2xl md:text-3xl hover:text-primary cursor-pointer`}
                                    >
                                        {notice.title}
                                    </h2>
                                </div>
                            </Link>
                           
                        ))}
                    </div>
                        <Pagination
                            total={data?.total}
                            page={currentPage}
                            limit={pageLimit}
                            onPageChange={(newPage, newLimit) => {
                                setCurrentPage(newPage);
                                setPageLimit(newLimit);
                            }}
                        />
                </main>
            </div>
        </div>
        <Footer/>
        </>
    );
};

export default Notice;