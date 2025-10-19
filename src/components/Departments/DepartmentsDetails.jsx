import React, { useState } from "react";
import departmentImg from "../../assets/departments/banner.png";
import bg from "../../assets/notice/bg.png";
import Breadcrumb from "../../components/Breadcrumb";
import Navbar from "../../shared/Navbar/Navbar";
import Footer from "../../shared/Footer/Footer";
import { useParams } from "react-router-dom";
import useGetData from "../../Hooks/useGetData";
import { server_url } from "../../Config/API";
import Loader from "../../shared/Loader";
import { format } from "date-fns";


const DepartmentsDetails = () => {
    const { id } = useParams(); // get department id from route params
    const { data, loading } = useGetData(`${server_url}/department/getDepartmentById/${id}`);
    const [selectedCategory, setSelectedCategory] = useState("Program Overview");

    const categories = [
        "Program Overview",
        "Program Highlights",
        "Department Vision & Mission",
        "Career Opportunities",
        "Course-based Program Structure",
        "Facilities and Support",
        "Lab & Infrastructure",
    ];
    if (loading) {
        return <Loader />
    }
    const dateAndTime = data?.data?.createdAt || data?.data?.updatedAt;
    console.log(data)
    return (
        <>
            <Navbar></Navbar>

            <div className="relative">
                <img className="w-full" src={departmentImg} alt="department image" />
                <img className="absolute -bottom-28 left-0 w-[25%] z-[-1]" src={bg} alt="department image" />
                <div className="py-5 max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5">
                    <Breadcrumb items={[{ name: "Department", path: "department" }, { name: "Details", path: "details" }]} />
                </div>
                {/* Department details design */}
                <div className="max-w-screen-max_screen mx-auto xl:px-20 lg:px-10 px-5">
                    <div className={`pb-6 mb-5`}>
                        <div className="text-sm text-gray-600 flex flex-wrap gap-2 mb-2">
                            <span>
                                Category: <span className="">{data?.data?.category}</span>
                            </span>
                            <span className="text-green-500">|</span>
                            {dateAndTime && <span className=""><p>{format(new Date(dateAndTime), "MMMM do, yyyy - h:mma")?.toLowerCase()}</p>
                            </span>}
                        </div>
                        <h2
                            className={`font-medium text-2xl md:text-3xl  cursor-pointer`}
                        >
                            {data?.data?.name}
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
                                                ? "bg-departmentGradient text-green-700 font-medium border-l-4 border-primary"
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

                            {/* Departments details */}
                            <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} className=" mt-10">

                            </div>

                            <div className="py-10 flex justify-start items-center gap-5">
                                {data?.data?.button1Label && <a className="px-10 py-3 border border-gray-700 font-medium hover:bg-primary/5" href={data?.data?.button1Link} target="_blank">{data?.data?.button1Label}</a>}
                                {data?.data?.button2Label && <a className="px-10 py-3 border border-gray-700 font-medium hover:bg-primary/5" href={data?.data?.button2Link} target="_blank">{data?.data?.button2Label}</a>}
                            </div>
                        </main>
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </>
    );
};

export default DepartmentsDetails;