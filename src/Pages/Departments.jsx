import React, { useState } from "react";
import departmentBanner from "../assets/departments/banner.png";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../shared/Footer/Footer";
import Navbar from "../shared/Navbar/Navbar";
import { MdArrowOutward } from "react-icons/md";
import useGetData from "../Hooks/useGetData";
import { server_url } from "../Config/API";
import Pagination from "../shared/Pagination/Pagination";
import Loader from "../shared/Loader";
import { Link } from "react-router-dom";



const DepartmentCardLarge = ({ dept }) => (
    <Link to={`/departments/details/${dept?._id}`} className="bg-white shadow-sm rounded-sm overflow-hidden cursor-pointer">
        <div className="relative h-56 md:h-64 lg:h-72 overflow-hidden group">
            <img
                src={dept?.thumbnail}
                alt={dept.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 group-hover:brightness-50"
            />
            {/* circular arrow badge like your design */}
            <div className="absolute left-[47%] top-[45%] w-12 h-12 bg-white/90 rounded-full  items-center justify-center shadow-md group-hover:flex hidden">
                <MdArrowOutward className="text-2xl text-green-600" />
            </div>
        </div>
        <div className="bg-[#F0FBEF] px-6 py-6">
            <h3 className="text-2xl md:text-3xl font-semibold leading-tight">{dept?.name}</h3>
            <div className="mt-4 text-sm text-gray-700 flex items-center gap-6">
                <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-0.5 bg-emerald-400 inline-block" />
                    Total Credit: <span className="font-medium">{dept?.totalCredit}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="h-4 w-0.5 bg-emerald-400 inline-block" />
                    Seat Available: <span className="font-medium">{dept?.seatsAvailable}</span>
                </span>
            </div>
        </div>
    </Link>
);

const DepartmentCardSmall = ({ dept }) => (
    <Link to={`/departments/details/${dept?._id}`} className="bg-white shadow-sm rounded-sm overflow-hidden cursor-pointer">
        <div className="relative group h-44 overflow-hidden">
            <img
                src={dept?.thumbnail}
                alt={dept?.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 group-hover:brightness-50"
            />
            <div className="absolute left-[45%] top-[41%] w-10 h-10 bg-white/90 rounded-full  items-center justify-center shadow-md group-hover:flex hidden">
                <MdArrowOutward className="text-xl text-green-600" />
            </div>
        </div>
        <div className="bg-[#F0FBEF] px-4 py-4">
            <h4 className="text-xl font-semibold">{dept?.name}</h4>
            <div className="mt-5 text-sm text-gray-700 flex items-center gap-4">
                <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-0.5 bg-emerald-400 inline-block" />
                    Total Credit: <span className="font-medium">{dept?.totalCredit}</span>
                </span>
                <span className="inline-flex items-center gap-2">
                    <span className="h-3 w-0.5 bg-emerald-400 inline-block" />
                    Seat Available: <span className="font-medium">{dept?.seatsAvailable}</span>
                </span>
            </div>
        </div>
    </Link>
);

const Departments = () => {


    const [currentPage, setCurrentPage] = useState(1);
    const [pageLimit, setPageLimit] = useState(5);
    const { data, loading } = useGetData(
        `${server_url}/department/getDepartment`,
        { params: { page: currentPage, limit: pageLimit } }
    );

    // split dataset so top row shows first two (large), rest are small cards
    const topRow = data?.data?.slice(0, 2);
    const otherRows = data?.data?.slice(2);

    if (loading) {
        return <Loader />
    }
    return (
        <>
            <Navbar />
            <div className="relative">
                <img className="w-full" src={departmentBanner} alt="department banner" />

                <div className="py-5 max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5">
                    <Breadcrumb items={[{ name: "Departments", path: "departments" }]} />

                    <section className="my-8 space-y-8">
                        {/* Top row: two large cards side-by-side */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {topRow?.map((d) => (
                                <DepartmentCardLarge key={d?._id} dept={d} />
                            ))}
                        </div>

                        {/* Second row: smaller cards in 3 columns on large screens */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {otherRows?.map((d) => (
                                <DepartmentCardSmall key={d?._id} dept={d} />
                            ))}
                        </div>
                    </section>
                    <Pagination
                        total={data?.total}
                        page={currentPage}
                        limit={pageLimit}
                        onPageChange={(newPage, newLimit) => {
                            setCurrentPage(newPage);
                            setPageLimit(newLimit);
                        }}
                    />
                </div>

            </div>


            <Footer />
        </>
    );
};

export default Departments;